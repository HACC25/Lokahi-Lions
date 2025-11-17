import { useState, KeyboardEvent, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";
import React from "react";

const TOTAL_STEPS = 6;

type CareerInterest = {
  id: string;
  label: string;
  color: string;
};

const presetInterests: CareerInterest[] = [
  { id: "healthcare", label: "Health & Medicine", color: "bg-red-100 border-red-300" },
  { id: "software-engineer", label: "Software Engineer", color: "bg-blue-100 border-blue-300" },
  { id: "business", label: "Business & Management", color: "bg-blue-100 border-blue-300" },
  { id: "education", label: "Teaching & Education", color: "bg-yellow-100 border-yellow-300" },
  { id: "creative-arts", label: "Creative Arts & Design", color: "bg-pink-100 border-pink-300" },
];

const presetSkills: CareerInterest[] = [
  { id: "communication", label: "Communication", color: "bg-green-100 border-green-300" },
  { id: "leadership", label: "Leadership", color: "bg-purple-100 border-purple-300" },
  { id: "problem-solving", label: "Problem Solving", color: "bg-yellow-100 border-yellow-300" },
  { id: "technical", label: "Technical Skills", color: "bg-blue-100 border-blue-300" },
  { id: "teamwork", label: "Collaboration & Teamwork", color: "bg-orange-100 border-orange-300" },
];

const presetExperience: CareerInterest[] = [
  { id: "internship", label: "Internships", color: "bg-teal-100 border-teal-300" },
  { id: "part-time", label: "Part-time Work", color: "bg-pink-100 border-pink-300" },
  { id: "volunteering", label: "Volunteering", color: "bg-indigo-100 border-indigo-300" },
  { id: "research", label: "Research Projects", color: "bg-cyan-100 border-cyan-300" },
  { id: "none", label: "None", color: "bg-red-100 border-red-300" },
];

const communityColleges = [
  { id: "honolulu-cc", label: "Honolulu Community College", color: "bg-purple-100 border-purple-300" },
  { id: "kapiolani-cc", label: "Kapiʻolani Community College", color: "bg-yellow-100 border-yellow-300" },
  { id: "leeward-cc", label: "Leeward Community College", color: "bg-pink-100 border-pink-300" },
  { id: "windward-cc", label: "Windward Community College", color: "bg-teal-100 border-teal-300" },
  { id: "hawaii-cc", label: "Hawaiʻi Community College", color: "bg-red-100 border-red-300" },
  { id: "maui-college", label: "Maui College", color: "bg-indigo-100 border-indigo-300" },
  { id: "kauai-cc", label: "Kauaʻi Community College", color: "bg-cyan-100 border-cyan-300" },
];

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterestInput, setCustomInterestInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [customExperienceInput, setCustomExperienceInput] = useState("");
  const [studentStatus, setStudentStatus] = useState<string>("");
  const [undergraduateYear, setUndergraduateYear] = useState<string>("");
  const [selectedCampus, setSelectedCampus] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showUndergraduateOptions, setShowUndergraduateOptions] = useState(false);
  const [showCommunityColleges, setShowCommunityColleges] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [questionnaireReady, setQuestionnaireReady] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const selectedOptionClasses =
    "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-md";
  const unselectedOptionClasses = "bg-white border-slate-200 hover:border-emerald-200";
  const primaryButtonClasses =
    "rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-emerald-200 shadow-lg hover:shadow-xl";
  const outlineButtonClasses =
    "rounded-2xl border border-emerald-100 text-emerald-700 hover:bg-emerald-50";

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setQuestionnaireReady(true), 60);
      return () => clearTimeout(timer);
    }
    setQuestionnaireReady(false);
  }, [showIntro]);

  const handleBegin = () => {
    setShowIntro(false);
  };
  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setErrorMessage("");
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setErrorMessage("");
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((i) => i !== skill));
  };

  const toggleExperience = (id: string) => {
    setSelectedExperience((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setErrorMessage("");
  };

  const removeExperience = (experience: string) => {
    setSelectedExperience((prev) => prev.filter((i) => i !== experience));
  };

  const getHighlightColor = () => "bg-emerald-50 border-emerald-200";

  const getInterestLabel = (interestId: string) => {
    const found = presetInterests.find((i) => i.id === interestId);
    return found ? found.label : interestId;
  };

  const getSkillLabel = (skillId: string) => {
    const found = presetSkills.find((i) => i.id === skillId);
    return found ? found.label : skillId;
  };

  const getExperienceLabel = (experienceId: string) => {
    const found = presetExperience.find((i) => i.id === experienceId);
    return found ? found.label : experienceId;
  };

  const capitalizeWords = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleCustomInterestKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = customInterestInput.trim();
      if (value) {
        const capitalizedValue = capitalizeWords(value);
        if (!selectedInterests.includes(capitalizedValue)) {
          setSelectedInterests((prev) => [...prev, capitalizedValue]);
          setCustomInterestInput("");
          setErrorMessage("");
        }
      }
    }
  };
  
  const handleCustomSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = customSkillInput.trim();
      if (value) {
        const capitalizedValue = capitalizeWords(value);
        if (!selectedSkills.includes(capitalizedValue)) {
          setSelectedSkills((prev) => [...prev, capitalizedValue]);
          setCustomSkillInput("");
          setErrorMessage("");
        }
      }
    }
  };

  const handleCustomExperienceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = customExperienceInput.trim();
      if (value) {
        const capitalizedValue = capitalizeWords(value);
        if (!selectedExperience.includes(capitalizedValue)) {
          setSelectedExperience((prev) => [...prev, capitalizedValue]);
          setCustomExperienceInput("");
          setErrorMessage("");
        }
      }
    }
  };
  
  const handleStudentStatus = (status: string) => {
    if (status === "undergraduate") {
      setShowUndergraduateOptions(true);
      setStudentStatus("");
    } else {
      setStudentStatus(status);
      setUndergraduateYear("");
      setShowUndergraduateOptions(false);
    }
    setErrorMessage("");
  };

  const handleUndergraduateYear = (year: string) => {
    setUndergraduateYear(year);
    setStudentStatus(year);
    setShowUndergraduateOptions(false);
    setErrorMessage("");
  };

  const handleCampusSelection = (id: string) => {
    if (id === "uh-cc") {
      setShowCommunityColleges(true);
    } else {
      setSelectedCampus(id);
      setShowCommunityColleges(false);
    }
    setErrorMessage("");
  };

  const handleNext = () => {
    // Step 1: Validate interests
    if (step === 1) {
      if (selectedInterests.length < 3) {
        setErrorMessage("Required: Please select at least 3 interests");
        return;
      }
      setErrorMessage("");
      setStep(2);
      return;
    }

    // Step 2: Validate skills
    if (step === 2) {
      if (selectedSkills.length < 2) {
        setErrorMessage("Required: Please select at least 2 skills");
        return;
      }
      setErrorMessage("");
      setStep(3);
      return;
    }

    // Step 3: Validate experience
    if (step === 3) {
      if (selectedExperience.length < 1) {
        setErrorMessage("Required: Please select at least 1 experience or none");
        return;
      }
      setErrorMessage("");
      setStep(4);
      return;
    }

    // Step 4: Validate student status
    if (step === 4) {
      if (showUndergraduateOptions) {
        if (!undergraduateYear) {
          setErrorMessage("Required: Please select your year");
          return;
        }
      } else if (!studentStatus) {
        setErrorMessage("Required: Please select your student status");
        return;
      }
      setErrorMessage("");
      setStep(5);
      return;
    }

    // Step 5: Validate campus
    if (step === 5) {
      if (!selectedCampus) {
        setErrorMessage("Required: Please select your campus");
        return;
      }
      setErrorMessage("");
      setStep(6);
      return;
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    if (showCommunityColleges && step === 5) {
      setShowCommunityColleges(false);
      // Don't clear selectedCampus - keep the selection
    } else if (showUndergraduateOptions && step === 4) {
      setShowUndergraduateOptions(false);
      // Don't clear undergraduateYear or studentStatus - keep the selection
    } else {
      setStep((prev) => Math.max(1, prev - 1));
    }
  };

  const removeStudentStatus = () => {
    setStudentStatus("");
    setUndergraduateYear("");
    setShowUndergraduateOptions(false);
    setErrorMessage("");
  };

  const removeCampus = () => {
    setSelectedCampus("");
    setShowCommunityColleges(false);
    setErrorMessage("");
  };

  const getStudentStatusLabel = () => {
    if (undergraduateYear) {
      const year = undergraduateYear.charAt(0).toUpperCase() + undergraduateYear.slice(1);
      return year;
    }
    const statusLabels: { [key: string]: string } = {
      "incoming-student": "Incoming Student",
      "graduate-student": "Graduate Student",
      "graduated": "Graduated",
    };
    return statusLabels[studentStatus] || studentStatus;
  };

  const getCampusLabel = () => {
    const campusLabels: { [key: string]: string } = {
      "uh-manoa": "UH Mānoa",
      "uh-hilo": "UH Hilo",
      "uh-west-oahu": "UH West Oʻahu",
      "honolulu-cc": "Honolulu Community College",
      "kapiolani-cc": "Kapiʻolani Community College",
      "leeward-cc": "Leeward Community College",
      "windward-cc": "Windward Community College",
      "hawaii-cc": "Hawaiʻi Community College",
      "maui-college": "Maui College",
      "kauai-cc": "Kauaʻi Community College",
    };
    return campusLabels[selectedCampus] || selectedCampus;
  };

  const isCommunityCollegeSelection = () =>
    communityColleges.some((college) => college.id === selectedCampus);

  const isCampusButtonActive = (campusId: string) => {
    if (campusId === "uh-cc") {
      return isCommunityCollegeSelection();
    }
    return selectedCampus === campusId;
  };

  const isStudentStatusActive = (statusId: string) => {
    if (statusId === "undergraduate") {
      return Boolean(undergraduateYear);
    }
    return studentStatus === statusId;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setPasswordError("");

    // Validate all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Required: Please fill in all fields");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Handle form submission
    console.log({
      ...formData,
      selectedInterests,
      selectedSkills,
      selectedExperience,
      studentStatus,
      undergraduateYear,
      selectedCampus,
    });
  };

  const onboardingTimeline = [
    { id: 1, label: "Curate interests" },
    { id: 2, label: "Highlight skills" },
    { id: 3, label: "Showcase experience" },
    { id: 4, label: "Student status" },
    { id: 5, label: "Preferred campus" },
    { id: 6, label: "Create account" },
  ];

  const progressPercentage = Math.round((step / TOTAL_STEPS) * 100);

  if (showIntro) {
    return (
      <div className="h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9] flex items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-16 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-20 right-12 w-72 h-72 bg-lime-200 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
        </div>
        <div className="relative z-10 max-w-3xl text-center space-y-6 bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Pathfinder onboarding</p>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Build your personalized UH journey in a few guided steps
          </h1>
          <p className="text-base text-slate-600">
            We’ll ask about your interests, skills, and experiences so your AI assistant can curate the right careers and pathways. This can take about three minutes.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleBegin}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-emerald-200 shadow-lg hover:shadow-xl"
            >
              Let’s start
            </Button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-12 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-35"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-lime-200 rounded-full blur-3xl opacity-30"></div>
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "140px 140px",
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Pathfinder onboarding</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mt-2">Tell us about your goals</h1>
              <p className="text-base text-slate-600 mt-3">
                Answer six quick prompts so your UH Pathfinder AI advisor can personalize degrees, campuses, and action plans just for you.
              </p>
            </div>
          </div>

          <div
            className={`bg-white/90 border border-emerald-100 rounded-3xl shadow-2xl p-8 space-y-6 backdrop-blur-xl transition-all duration-700 ${
              questionnaireReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 1 · Curate interests</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">What are your interests?</h2>
                  <p className="text-sm text-slate-600">Select at least three focus areas or add your own to tailor suggestions.</p>
                </div>

                {selectedInterests.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.map((interestId) => (
                      <span
                        key={interestId}
                        className={`px-4 py-2 border-2 rounded-2xl flex items-center gap-2 text-sm font-semibold text-slate-700 shadow-sm ${getHighlightColor(interestId)}`}
                      >
                        {getInterestLabel(interestId)}
                        <button onClick={() => removeInterest(interestId)} className="text-slate-500 hover:text-slate-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {presetInterests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        selectedInterests.includes(interest.id)
                          ? selectedOptionClasses
                          : unselectedOptionClasses
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                  <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white">
                    <Input
                      placeholder="Enter your interests..."
                      value={customInterestInput}
                      onChange={(e) => {
                        const capitalizedValue = capitalizeWords(e.target.value);
                        setCustomInterestInput(capitalizedValue);
                      }}
                      onKeyDown={handleCustomInterestKeyDown}
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                    <p className="text-xs text-slate-400 mt-2">Press Enter or comma to add</p>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 2 · Highlight skills</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">What skills do you have?</h2>
                  <p className="text-sm text-slate-600">Choose at least two skill areas you want UH to notice.</p>
                </div>

                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skillId) => (
                      <span
                        key={skillId}
                        className={`px-4 py-2 border-2 rounded-2xl flex items-center gap-2 text-sm font-semibold text-slate-700 shadow-sm ${getHighlightColor(skillId)}`}
                      >
                        {getSkillLabel(skillId)}
                        <button onClick={() => removeSkill(skillId)} className="text-slate-500 hover:text-slate-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {presetSkills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        selectedSkills.includes(skill.id)
                          ? selectedOptionClasses
                          : unselectedOptionClasses
                      }`}
                    >
                      {skill.label}
                    </button>
                  ))}
                  <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white">
                    <Input
                      placeholder="Enter your skills..."
                      value={customSkillInput}
                      onChange={(e) => {
                        const capitalizedValue = capitalizeWords(e.target.value);
                        setCustomSkillInput(capitalizedValue);
                      }}
                      onKeyDown={handleCustomSkillKeyDown}
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                    <p className="text-xs text-slate-400 mt-2">Press Enter or comma to add</p>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 3 · Showcase experience</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">What experience do you have?</h2>
                  <p className="text-sm text-slate-600">Highlight how you’ve been involved so far. Choose at least one experiences or none.</p>
                </div>

                {selectedExperience.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.map((experienceId) => (
                      <span
                        key={experienceId}
                        className={`px-4 py-2 border-2 rounded-2xl flex items-center gap-2 text-sm font-semibold text-slate-700 shadow-sm ${getHighlightColor(experienceId)}`}
                      >
                        {getExperienceLabel(experienceId)}
                        <button onClick={() => removeExperience(experienceId)} className="text-slate-500 hover:text-slate-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {presetExperience.map((experience) => (
                    <button
                      key={experience.id}
                      onClick={() => toggleExperience(experience.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        selectedExperience.includes(experience.id)
                          ? selectedOptionClasses
                          : unselectedOptionClasses
                      }`}
                    >
                      {experience.label}
                    </button>
                  ))}
                  <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white">
                    <Input
                      placeholder="Enter your experience..."
                      value={customExperienceInput}
                      onChange={(e) => {
                        const capitalizedValue = capitalizeWords(e.target.value);
                        setCustomExperienceInput(capitalizedValue);
                      }}
                      onKeyDown={handleCustomExperienceKeyDown}
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                    <p className="text-xs text-slate-400 mt-2">Press Enter or comma to add</p>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 4 · Student status</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">Where are you in your journey?</h2>
                  <p className="text-sm text-slate-600">Tell us your current status so we can surface the right resources.</p>
                </div>

                {(studentStatus || undergraduateYear) && (
                  <div>
                    <span className="px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center gap-2 text-sm font-semibold text-emerald-700 w-fit">
                      {getStudentStatusLabel()}
                      <button onClick={removeStudentStatus} className="text-slate-500 hover:text-slate-800">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'incoming-student', label: 'Incoming Student' },
                    { id: 'undergraduate', label: 'Undergraduate Student' },
                    { id: 'graduate-student', label: 'Graduate Student' },
                    { id: 'graduated', label: 'Graduated' },
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStudentStatus(status.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        isStudentStatusActive(status.id)
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>

                {showUndergraduateOptions && (
                  <div>
                    <p className="text-sm text-slate-600 mb-3">Select your year:</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['freshman', 'sophomore', 'junior', 'senior'].map((year) => (
                        <button
                          key={year}
                          onClick={() => handleUndergraduateYear(year)}
                          className={`p-4 rounded-2xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                            undergraduateYear === year
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-md'
                              : 'bg-white border-slate-200 hover:border-emerald-200'
                          }`}
                        >
                          {year.charAt(0).toUpperCase() + year.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && !showCommunityColleges && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 5 · Preferred campus</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">Which UH campus are you exploring?</h2>
                  <p className="text-sm text-slate-600">Select your primary campus preference to unlock localized resources.</p>
                </div>

                {selectedCampus && (
                  <div>
                    <span className="px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center gap-2 text-sm font-semibold text-emerald-700 w-fit">
                      {getCampusLabel()}
                      <button onClick={removeCampus} className="text-slate-500 hover:text-slate-800">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'uh-manoa', label: 'UH Mānoa' },
                    { id: 'uh-hilo', label: 'UH Hilo' },
                    { id: 'uh-west-oahu', label: 'UH West Oʻahu' },
                    { id: 'uh-cc', label: 'UH Community Colleges' },
                  ].map((campus) => (
                    <button
                      key={campus.id}
                      onClick={() => handleCampusSelection(campus.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        isCampusButtonActive(campus.id)
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{campus.label}</div>
                      {campus.id === 'uh-cc' && <p className="text-sm text-slate-500 mt-1">Tap to choose a community college →</p>}
                    </button>
                  ))}
                </div>

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && showCommunityColleges && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 5 · Community colleges</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">Which UH Community College?</h2>
                  <p className="text-sm text-slate-600">Pick the location closest to you to surface local programs.</p>
                </div>

                {selectedCampus && (
                  <div>
                    <span className="px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center gap-2 text-sm font-semibold text-emerald-700 w-fit">
                      {getCampusLabel()}
                      <button onClick={removeCampus} className="text-slate-500 hover:text-slate-800">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {communityColleges.map((college) => (
                    <button
                      key={college.id}
                      onClick={() => {
                        setSelectedCampus(college.id);
                        setShowCommunityColleges(false);
                        setErrorMessage("");
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 ${
                        selectedCampus === college.id
                          ? selectedOptionClasses
                          : unselectedOptionClasses
                      }`}
                    >
                      {college.label}
                    </button>
                  ))}
                </div>

                {errorMessage && (
                  <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                )}

                <div className="flex justify-between">
                  <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                    Back
                  </Button>
                  <Button onClick={handleNext} className={primaryButtonClasses}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Step 6 · Create account</p>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">Save your UH Pathfinder journey</h2>
                  <p className="text-sm text-slate-600">Add your details so you can sync interests, AI chats, and saved careers on any device.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => {
                        const value = capitalizeWords(e.target.value);
                        setFormData({ ...formData, firstName: value });
                      }}
                      className="rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => {
                        const value = capitalizeWords(e.target.value);
                        setFormData({ ...formData, lastName: value });
                      }}
                      className="rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="rounded-2xl border border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-100 focus-visible:border-emerald-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {passwordError && (
                    <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{passwordError}</p>
                  )}

                  {errorMessage && (
                    <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2">{errorMessage}</p>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button onClick={handleBack} variant="outline" type="button" className={outlineButtonClasses}>
                      Back
                    </Button>
                    <Button type="submit" className={primaryButtonClasses}>
                      Create account
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
