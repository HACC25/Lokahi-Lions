from dotenv import load_dotenv
from google import genai
import os
from pathlib import Path
import json
import csv
import argparse

load_dotenv() # Load variables from .env

class ChatBot:
    def __init__(self, load_data=True, data_dir: str | None = None, model: str = "gemini-2.5-flash", allow_no_api: bool = False):
        """Initialize the ChatBot.

        Args:
            load_data (bool): whether to load course data from the repository (default True)
            data_dir (str|None): optional explicit path to `models/course-data` folder
            model (str): Gemini model name
            allow_no_api (bool): if True, allow running locally without GEMINI_API_KEY (useful for testing/demo)
        """
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not self.gemini_api_key and not allow_no_api:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        self.client = genai.Client(api_key=self.gemini_api_key) if self.gemini_api_key else None
        self.model = model
        self.course_data: dict[str, object] = {}

        if load_data:
            self.load_course_data(data_dir)
    def get_career_suggestions(self, interests):
        """Get career suggestions based on user interests."""
        interests_text = ", ".join(interests)
        prompt = f"Suggest career options for a person who likes {interests_text}"
        if not self.client:
            return f"[mock] Would send prompt to model {self.model}: {prompt}"
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )
        return response.text
    
    def ask_question(self, question, context=None):
        """
        Answer a user's question, optionally with additional context.
        
        Args:
            question (str): The user's question
            context (dict, optional): Additional context like user profile, courses, etc.
        
        Returns:
            str: The AI-generated response
        """
        # Build the prompt with any available context
        prompt = question
        if context:
            context_str = "\nContext:\n"
            for key, value in context.items():
                context_str += f"{key}: {value}\n"
            prompt = context_str + "\nQuestion: " + question

        if not self.client:
            return f"[mock] Would send prompt to model {self.model}:\n{prompt}"

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt
            )
            return response.text
        except Exception as e:
            return f"Sorry, I encountered an error: {str(e)}"

    # ---- Course-data helpers and course-aware question -----------------
    def load_course_data(self, data_dir: str | None = None):
        """Load all JSON and CSV course-data files from the models/course-data folder.

        Files are placed into `self.course_data` with keys equal to the filename (without suffix).
        """
        if data_dir:
            base = Path(data_dir)
        else:
            # chatbot.py lives in backend/apps/services -> go up two levels to backend
            base = Path(__file__).resolve().parents[2] / "models" / "course-data"

        if not base.exists():
            # nothing to load
            return

        for p in sorted(base.iterdir()):
            if p.suffix.lower() == ".json":
                try:
                    self.course_data[p.stem] = json.loads(p.read_text(encoding="utf-8"))
                except Exception as e:
                    self.course_data[p.stem] = {"_load_error": str(e)}
            elif p.suffix.lower() == ".csv":
                try:
                    with p.open(encoding="utf-8") as fh:
                        reader = csv.DictReader(fh)
                        self.course_data[p.stem] = list(reader)
                except Exception as e:
                    self.course_data[p.stem] = {"_load_error": str(e)}

    def summarize_for_prompt(self, school_key: str, max_courses: int = 12) -> str:
        """Create a compact textual summary of the given school's course-data suitable for inclusion in a prompt.

        This function is defensive about file structure because the repository JSONs may vary.
        """
        data = self.course_data.get(school_key)
        if data is None:
            return f"No data found for {school_key}."

        lines: list[str] = []
        # If dict with course codes as keys
        if isinstance(data, dict):
            # prefer to skip metadata keys if present
            keys = [k for k in data.keys() if not k.startswith("_")][:max_courses]
            for k in keys:
                v = data.get(k)
                if isinstance(v, dict):
                    title = v.get("title") or v.get("name") or v.get("Course Title")
                    desc = v.get("description") or v.get("desc")
                    line = k
                    if title:
                        line += f" - {title}"
                    if desc:
                        line += f": {desc[:200]}"  # keep short
                    lines.append(line)
                else:
                    lines.append(f"{k}: {str(v)[:200]}")

        # If list of courses (csv parsed or json array)
        elif isinstance(data, list):
            for item in data[:max_courses]:
                if isinstance(item, dict):
                    code = item.get("course") or item.get("code") or item.get("Course") or item.get("COURSE") or ""
                    title = item.get("title") or item.get("Course Title") or ""
                    desc = item.get("description") or item.get("Description") or ""
                    line = code or title or str(item)[:100]
                    if title:
                        line += f" - {title}"
                    if desc:
                        line += f": {desc[:180]}"
                    lines.append(line)
                else:
                    lines.append(str(item)[:200])

        else:
            # fallback
            lines.append(str(data)[:800])

        return "\n".join(lines)

    def ask_course_question(self, question: str, school: str | None = None, context: dict | None = None):
        """Answer a question using course data. If `school` is provided and we have data for it,
        include a concise summary of that school's data in the prompt.
        """
        prompt_parts: list[str] = []
        if school:
            # normalize school key (user may pass 'manoa' or 'manoa_courses')
            key = school
            if key not in self.course_data:
                # try to match by substring
                matches = [k for k in self.course_data.keys() if key.lower() in k.lower()]
                key = matches[0] if matches else school

            if key in self.course_data:
                prompt_parts.append(f"Course data summary for {key}:\n{self.summarize_for_prompt(key)}")
            else:
                prompt_parts.append(f"No course-data found for '{school}'. Available keys: {', '.join(sorted(self.course_data.keys()))}")
        else:
            prompt_parts.append(f"Available course-data sources: {', '.join(sorted(self.course_data.keys()))}")

        if context:
            prompt_parts.append("Context:")
            for k, v in context.items():
                prompt_parts.append(f"{k}: {v}")

        prompt_parts.append("Question: " + question)
        prompt = "\n\n".join(prompt_parts)

        # If no client (no API key), return the prompt for inspection rather than calling the API
        if not self.client:
            return f"[mock] Prepared prompt (no GEMINI_API_KEY set):\n\n{prompt}"

        try:
            response = self.client.models.generate_content(model=self.model, contents=prompt)
            return response.text
        except Exception as e:
            return f"Sorry, I encountered an error when calling the model: {str(e)}"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ChatBot demo for course-data prompts")
    parser.add_argument("--question", "-q", required=False, default="Give me course recommendations for a student interested in programming.", help="Question to ask the chatbot")
    parser.add_argument("--school", "-s", required=False, help="Optional school key (e.g. manoa, kapiolani)")
    parser.add_argument("--data-dir", required=False, help="Optional path to models/course-data folder")
    parser.add_argument("--allow-no-api", action="store_true", help="Allow running without GEMINI_API_KEY (prints prompt instead of calling API)")
    args = parser.parse_args()

    cb = ChatBot(load_data=True, data_dir=args.data_dir, allow_no_api=args.allow_no_api)
    out = cb.ask_course_question(args.question, school=args.school)
    print(out)