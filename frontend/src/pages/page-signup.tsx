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
  { id: "club-projects", label: "Club Projects", color: "bg-red-100 border-red-300" },
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
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

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

  const colorOptions = [
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-purple-100 border-purple-300",
    "bg-yellow-100 border-yellow-300",
    "bg-pink-100 border-pink-300",
    "bg-indigo-100 border-indigo-300",
    "bg-teal-100 border-teal-300",
    "bg-orange-100 border-orange-300",
    "bg-red-100 border-red-300",
    "bg-cyan-100 border-cyan-300",
  ];

  const getInterestColor = (interestId: string) => {
    const found = presetInterests.find((i) => i.id === interestId);
    if (found) return found.color;
    
    // For custom interests, always use blue
    return "bg-blue-100 border-blue-300";
  };

  const getInterestLabel = (interestId: string) => {
    const found = presetInterests.find((i) => i.id === interestId);
    return found ? found.label : interestId;
  };

  const getSkillColor = (skillId: string) => {
    const found = presetSkills.find((i) => i.id === skillId);
    if (found) return found.color;
    return "bg-blue-100 border-blue-300";
  };

  const getSkillLabel = (skillId: string) => {
    const found = presetSkills.find((i) => i.id === skillId);
    return found ? found.label : skillId;
  };

  const getExperienceColor = (experienceId: string) => {
    const found = presetExperience.find((i) => i.id === experienceId);
    if (found) return found.color;
    return "bg-blue-100 border-blue-300";
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
      if (selectedExperience.length < 2) {
        setErrorMessage("Required: Please select at least 2 experiences");
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
            We’ll ask about your interests, strengths, and campus goals so your AI advisor can curate the right pathways. This takes about two minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-left text-sm text-slate-600">
            <div className="px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
              Tailored degree and campus matches
            </div>
            <div className="px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
              Advisor-ready notes & reminders
            </div>
            <div className="px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
              AI nudges to keep you on track
            </div>
          </div>
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
    <div className="h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-12 left-8 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-24 right-16 w-80 h-80 bg-lime-200 rounded-full blur-3xl opacity-35 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "140px 140px"
          }}
        ></div>
      </div>
      <div className="relative z-10 h-full px-4 py-12 flex items-center justify-center">
        <div
          className={`w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl border border-emerald-100 backdrop-blur-xl p-8 transition-all duration-700 ease-out max-h-[90vh] overflow-y-auto ${
            questionnaireReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">
              Question {step} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="w-full bg-emerald-50 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Career Interests */}
        {step === 1 && (
          <div>
            <h2 className="mb-2">What are your interests?</h2>
            <p className="text-slate-500 mb-6">
              Select one or more options, or type your own
            </p>

            {/* Display all selected interests */}
            {selectedInterests.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedInterests.map((interestId) => (
                  <span
                    key={interestId}
                    className={`px-3 py-1 border-2 rounded-lg flex items-center gap-2 ${getInterestColor(interestId)}`}
                  >
                    {getInterestLabel(interestId)}
                    <button
                      onClick={() => removeInterest(interestId)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetInterests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedInterests.includes(interest.id)
                      ? interest.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {interest.label}
                </button>
              ))}
              
              <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                <Input
                  placeholder="Enter your interests..."
                  value={customInterestInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalizedValue = capitalizeWords(value);
                    setCustomInterestInput(capitalizedValue);
                  }}
                  onKeyDown={handleCustomInterestKeyDown}
                  className="border-0 p-0 h-auto focus-visible:ring-0"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Press Enter or comma to add
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-end">
              <Button onClick={handleNext} className={primaryButtonClasses}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {step === 2 && (
          <div>
            <h2 className="mb-2">What skills do you have?</h2>
            <p className="text-slate-500 mb-6">
              Select one or more skills. Choose at least two to continue.
            </p>

            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSkills.map((skillId) => (
                  <span
                    key={skillId}
                    className={`px-3 py-1 border-2 rounded-lg flex items-center gap-2 ${getSkillColor(skillId)}`}
                  >
                    {getSkillLabel(skillId)}
                    <button
                      onClick={() => removeSkill(skillId)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetSkills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedSkills.includes(skill.id)
                      ? skill.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {skill.label}
                </button>
              ))}

              <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                <Input
                  placeholder="Enter your skills..."
                  value={customSkillInput}
                  onChange={(e) => {
                    const value = capitalizeWords(e.target.value);
                    setCustomSkillInput(value);
                  }}
                  onKeyDown={handleCustomSkillKeyDown}
                  className="border-0 p-0 h-auto focus-visible:ring-0"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Press Enter or comma to add
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button onClick={handleNext} className={primaryButtonClasses}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div>
            <h2 className="mb-2">What experience do you have?</h2>
            <p className="text-slate-500 mb-6">
              Select one or more experiences. Choose at least two to continue.
            </p>

            {selectedExperience.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedExperience.map((experienceId) => (
                  <span
                    key={experienceId}
                    className={`px-3 py-1 border-2 rounded-lg flex items-center gap-2 ${getExperienceColor(experienceId)}`}
                  >
                    {getExperienceLabel(experienceId)}
                    <button
                      onClick={() => removeExperience(experienceId)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetExperience.map((experience) => (
                <button
                  key={experience.id}
                  onClick={() => toggleExperience(experience.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedExperience.includes(experience.id)
                      ? experience.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {experience.label}
                </button>
              ))}

              <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                <Input
                  placeholder="Enter your experiences..."
                  value={customExperienceInput}
                  onChange={(e) => {
                    const value = capitalizeWords(e.target.value);
                    setCustomExperienceInput(value);
                  }}
                  onKeyDown={handleCustomExperienceKeyDown}
                  className="border-0 p-0 h-auto focus-visible:ring-0"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Press Enter or comma to add
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button onClick={handleNext} className={primaryButtonClasses}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Student Status */}
        {step === 4 && !showUndergraduateOptions && (
          <div>
            <h2 className="mb-2">What type of student are you?</h2>
            <p className="text-slate-500 mb-6">
              Select one. You can change this later.
            </p>

            {/* Display selected status at top */}
            {studentStatus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getStudentStatusLabel()}
                  <button
                    onClick={removeStudentStatus}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { id: "incoming-student", label: "Incoming Student", color: "bg-red-100 border-red-300" },
                { id: "undergraduate", label: "Undergraduate", color: "bg-blue-100 border-blue-300" },
                { id: "graduate-student", label: "Graduate Student", color: "bg-purple-100 border-purple-300" },
                { id: "graduated", label: "Graduated", color: "bg-green-100 border-green-300" },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() => handleStudentStatus(status.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isStudentStatusActive(status.id)
                      ? status.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>{status.label}</div>
                  {status.id === "undergraduate" && (
                    <div className="text-sm text-slate-500 mt-1">Click to see options &rarr;</div>
                  )}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className={primaryButtonClasses}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4b: Undergraduate Year Selection */}
        {step === 4 && showUndergraduateOptions && (
          <div>
            <h2 className="mb-2">Which year are you in?</h2>
            <p className="text-slate-500 mb-6">
              Select your current year. You can change this later.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { id: "freshman", label: "Freshman", color: "bg-orange-100 border-orange-300" },
                { id: "sophomore", label: "Sophomore", color: "bg-yellow-100 border-yellow-300" },
                { id: "junior", label: "Junior", color: "bg-pink-100 border-pink-300" },
                { id: "senior", label: "Senior", color: "bg-teal-100 border-teal-300" },
              ].map((year) => (
                <button
                  key={year.id}
                  onClick={() => handleUndergraduateYear(year.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    undergraduateYear === year.id
                      ? year.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {year.label}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className={primaryButtonClasses}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: UH Campus */}
        {step === 5 && !showCommunityColleges && (
          <div>
            <h2 className="mb-2">Which UH campus do you attend?</h2>
            <p className="text-slate-500 mb-6">
              Select the option that best describes you
            </p>

            {/* Display selected campus at top */}
            {selectedCampus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getCampusLabel()}
                  <button
                    onClick={removeCampus}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { id: "uh-manoa", label: "UH Mānoa", color: "bg-emerald-100 border-emerald-300" },
                { id: "uh-hilo", label: "UH Hilo", color: "bg-orange-100 border-orange-300" },
                { id: "uh-west-oahu", label: "UH West Oʻahu", color: "bg-blue-100 border-blue-300" },
                { id: "uh-cc", label: "UH Community College", color: "bg-purple-100 border-purple-300" },
              ].map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => handleCampusSelection(campus.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isCampusButtonActive(campus.id)
                      ? campus.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>{campus.label}</div>
                  {campus.id === "uh-cc" && (
                    <div className="text-sm text-slate-500 mt-1">Click to see options &rarr;</div>
                  )}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className={primaryButtonClasses}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 5b: Community College Selection */}
        {step === 5 && showCommunityColleges && (
          <div>
            <h2 className="mb-2">Which UH Community College?</h2>
            <p className="text-slate-500 mb-6">
              Select your community college
            </p>

            {/* Display selected campus at top */}
            {selectedCampus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getCampusLabel()}
                  <button
                    onClick={removeCampus}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              {communityColleges.map((college) => (
                <button
                  key={college.id}
                  onClick={() => {
                    setSelectedCampus(college.id);
                    setShowCommunityColleges(false);
                    setErrorMessage("");
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCampus === college.id
                      ? college.color
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {college.label}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-rose-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline" className={outlineButtonClasses}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className={primaryButtonClasses}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Create Account */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold mb-2">Final step</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
              <p className="text-sm text-slate-600">
                We’ll securely save your info so you can return, continue exploring UH pathways, and prepare for advising with everything synced.
              </p>
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
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-rose-600">{passwordError}</p>
              )}

              {errorMessage && (
                <p className="text-rose-600">{errorMessage}</p>
              )}

              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="outline" type="button" className={outlineButtonClasses}>
                  Back
                </Button>
                <Button type="submit" className={primaryButtonClasses}>
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
