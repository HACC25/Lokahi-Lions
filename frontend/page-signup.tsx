import { useState, KeyboardEvent } from "react";
import { Button } from "./src/components/ui/button";
import { Input } from "./src/components/ui/input";
import { Label } from "./src/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";
import React from "react";

type CareerInterest = {
  id: string;
  label: string;
  color: string;
};

const presetInterests: CareerInterest[] = [
  { id: "software-engineer", label: "Software Engineer", color: "bg-blue-100 border-blue-300" },
  { id: "data-scientist", label: "Data Scientist", color: "bg-green-100 border-green-300" },
  { id: "ux-designer", label: "UX Designer", color: "bg-purple-100 border-purple-300" },
  { id: "business-management", label: "Business Management", color: "bg-yellow-100 border-yellow-300" },
  { id: "graphic-designer", label: "Graphic Designer", color: "bg-pink-100 border-pink-300" },
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
  const [studentStatus, setStudentStatus] = useState<string>("");
  const [undergraduateYear, setUndergraduateYear] = useState<string>("");
  const [selectedCampus, setSelectedCampus] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showUndergraduateOptions, setShowUndergraduateOptions] = useState(false);
  const [showCommunityColleges, setShowCommunityColleges] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setErrorMessage("");
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
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

    // Step 2: Validate student status
    if (step === 2) {
      if (showUndergraduateOptions) {
        if (!undergraduateYear) {
          setErrorMessage("Required: Please select your year");
          return;
        }
      } else {
        if (!studentStatus) {
          setErrorMessage("Required: Please select your student status");
          return;
        }
      }
      setErrorMessage("");
      setStep(3);
      return;
    }

    // Step 3: Validate campus
    if (step === 3) {
      if (!selectedCampus) {
        setErrorMessage("Required: Please select your campus");
        return;
      }
      setErrorMessage("");
      setStep(4);
      return;
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    if (showCommunityColleges) {
      setShowCommunityColleges(false);
      // Don't clear selectedCampus - keep the selection
    } else if (showUndergraduateOptions && step === 2) {
      setShowUndergraduateOptions(false);
      // Don't clear undergraduateYear or studentStatus - keep the selection
    } else {
      setStep((prev) => prev - 1);
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
      studentStatus,
      undergraduateYear,
      selectedCampus,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Question {step} of 4
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Career Interests */}
        {step === 1 && (
          <div>
            <h2 className="mb-2">What are your interests?</h2>
            <p className="text-gray-500 mb-6">
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
                      className="text-gray-500 hover:text-gray-700"
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
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {interest.label}
                </button>
              ))}
              
              <div className="p-4 rounded-lg border-2 border-gray-200 bg-white">
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
                <p className="text-xs text-gray-400 mt-2">
                  Press Enter or comma to add
                </p>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-end">
              <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Student Status */}
        {step === 2 && !showUndergraduateOptions && (
          <div>
            <h2 className="mb-2">What type of student are you?</h2>
            <p className="text-gray-500 mb-6">
              Select one. You can change this later.
            </p>

            {/* Display selected status at top */}
            {studentStatus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getStudentStatusLabel()}
                  <button
                    onClick={removeStudentStatus}
                    className="text-gray-500 hover:text-gray-700"
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
                    studentStatus === status.id
                      ? status.color
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>{status.label}</div>
                  {status.id === "undergraduate" && (
                    <div className="text-sm text-gray-500 mt-1">Click to see options &rarr;</div>
                  )}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2b: Undergraduate Year Selection */}
        {step === 2 && showUndergraduateOptions && (
          <div>
            <h2 className="mb-2">Which year are you in?</h2>
            <p className="text-gray-500 mb-6">
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
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {year.label}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: UH Campus */}
        {step === 3 && !showCommunityColleges && (
          <div>
            <h2 className="mb-2">Which UH campus do you attend?</h2>
            <p className="text-gray-500 mb-6">
              Select the option that best describes you
            </p>

            {/* Display selected campus at top */}
            {selectedCampus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getCampusLabel()}
                  <button
                    onClick={removeCampus}
                    className="text-gray-500 hover:text-gray-700"
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
                    selectedCampus === campus.id
                      ? campus.color
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>{campus.label}</div>
                  {campus.id === "uh-cc" && (
                    <div className="text-sm text-gray-500 mt-1">Click to see options &rarr;</div>
                  )}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3b: Community College Selection */}
        {step === 3 && showCommunityColleges && (
          <div>
            <h2 className="mb-2">Which UH Community College?</h2>
            <p className="text-gray-500 mb-6">
              Select your community college
            </p>

            {/* Display selected campus at top */}
            {selectedCampus && (
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center gap-2 w-fit">
                  {getCampusLabel()}
                  <button
                    onClick={removeCampus}
                    className="text-gray-500 hover:text-gray-700"
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
                    setErrorMessage("");
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCampus === college.id
                      ? college.color
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {college.label}
                </button>
              ))}
            </div>

            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}

            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Create Account */}
        {step === 4 && (
          <div>
            <h2 className="mb-6">Create your account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="text-red-600">{passwordError}</p>
              )}

              {errorMessage && (
                <p className="text-red-600">{errorMessage}</p>
              )}

              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="outline" type="button">
                  Back
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
