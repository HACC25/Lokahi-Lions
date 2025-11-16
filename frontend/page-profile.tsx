import { useState, KeyboardEvent } from "react";
import { Button } from "./src/components/ui/button";
import { Input } from "./src/components/ui/input";
import { Label } from "./src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./src/components/ui/select";
import { UserCircle, Clock, FileText, X } from "lucide-react";
import { ScrollArea } from "./src/components/ui/scroll-area";
import React from "react";

type CareerInterest = {
  id: string;
  label: string;
  color: string;
};

type SavedCareer = {
  id: string;
  title: string;
  savedDate: string;
};

const availableInterests: CareerInterest[] = [
  { id: "software-engineer", label: "Software Engineer", color: "bg-blue-100 border-blue-300" },
  { id: "data-scientist", label: "Data Scientist", color: "bg-green-100 border-green-300" },
  { id: "ux-designer", label: "UX Designer", color: "bg-purple-100 border-purple-300" },
];

// New suggestions based on saved careers
const suggestedInterests: CareerInterest[] = [
  { id: "ai-specialist", label: "AI Specialist", color: "bg-indigo-100 border-indigo-300" },
  { id: "web-developer", label: "Web Developer", color: "bg-teal-100 border-teal-300" },
  { id: "product-manager", label: "Product Manager", color: "bg-orange-100 border-orange-300" },
];

export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [showMoreInterests, setShowMoreInterests] = useState(false);
  const [customInterestInput, setCustomInterestInput] = useState("");
  const [showAllCareers, setShowAllCareers] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    studentStatus: "sophomore",
    campus: "uh-manoa",
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "software-engineer",
    "data-scientist",
    "ux-designer",
  ]);

  const [savedCareers] = useState<SavedCareer[]>([
    { id: "1", title: "Software Engineer", savedDate: "Nov 12, 2025" },
    { id: "2", title: "AI Specialist", savedDate: "Nov 14, 2025" },
    { id: "3", title: "Data Analyst", savedDate: "Nov 10, 2025" },
    { id: "4", title: "Web Developer", savedDate: "Nov 08, 2025" },
    { id: "5", title: "UX Designer", savedDate: "Nov 05, 2025" },
    { id: "6", title: "Product Manager", savedDate: "Nov 03, 2025" },
    { id: "7", title: "Business Analyst", savedDate: "Nov 01, 2025" },
    { id: "8", title: "Marketing Manager", savedDate: "Oct 28, 2025" },
  ]);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedInterests((prev) => [...prev, id]);
    }
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
        }
      }
    }
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    console.log("Saving profile:", profileData);
  };

  const handleSaveInterests = () => {
    setIsEditingInterests(false);
    setShowMoreInterests(false);
    console.log("Saving interests:", selectedInterests);
  };

  const displayedCareers = showAllCareers ? savedCareers : savedCareers.slice(0, 2);

  const getInterestColor = (interestId: string) => {
    const allInterests = [...availableInterests, ...suggestedInterests];
    const found = allInterests.find((i) => i.id === interestId);
    if (found) return found.color;
    
    // For custom interests, always use blue
    return "bg-blue-100 border-blue-300";
  };

  const getInterestLabel = (interestId: string) => {
    const allInterests = [...availableInterests, ...suggestedInterests];
    const found = allInterests.find((i) => i.id === interestId);
    return found ? found.label : interestId;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-13">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-gray-700" />
                </div>
                </div>
                <h2>PROFILE DETAILS</h2>
              </div>
              {!isEditingProfile && (
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              )}
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="studentStatus">Student Status</Label>
                  <Select
                    value={profileData.studentStatus}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, studentStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incoming-student">Incoming Student</SelectItem>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="graduate-student">Graduate Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="campus">UH Campus</Label>
                  <Select
                    value={profileData.campus}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, campus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uh-manoa">UH Mānoa</SelectItem>
                      <SelectItem value="uh-hilo">UH Hilo</SelectItem>
                      <SelectItem value="uh-west-oahu">UH West Oʻahu</SelectItem>
                      <SelectItem value="honolulu-cc">Honolulu Community College</SelectItem>
                      <SelectItem value="kapiolani-cc">Kapiʻolani Community College</SelectItem>
                      <SelectItem value="leeward-cc">Leeward Community College</SelectItem>
                      <SelectItem value="windward-cc">Windward Community College</SelectItem>
                      <SelectItem value="hawaii-cc">Hawaiʻi Community College</SelectItem>
                      <SelectItem value="maui-college">Maui College</SelectItem>
                      <SelectItem value="kauai-cc">Kauaʻi Community College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => setIsEditingProfile(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Name: </span>
                  {profileData.firstName} {profileData.lastName}
                </p>
                <p>
                  <span className="text-gray-600">Student Status: </span>
                  {profileData.studentStatus.charAt(0).toUpperCase() +
                    profileData.studentStatus.slice(1).replace("-", " ")}
                </p>
                <p>
                  <span className="text-gray-600">UH Campus: </span>
                  {profileData.campus === "uh-manoa"
                    ? "UH Mānoa"
                    : profileData.campus.toUpperCase()}
                </p>
              </div>
            )}
          </div>

          {/* Career Interests */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Career Interests</h3>
              {!isEditingInterests && (
                <Button
                  onClick={() => setIsEditingInterests(true)}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              )}
            </div>

            {/* Display selected interests at top */}
            {isEditingInterests && selectedInterests.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedInterests.map((interestId) => (
                  <span
                    key={interestId}
                    className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${getInterestColor(interestId)}`}
                  >
                    {getInterestLabel(interestId)}
                    <button
                      onClick={() => removeInterest(interestId)}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {isEditingInterests ? (
              <div>
                {!showMoreInterests ? (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {suggestedInterests.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedInterests.includes(interest.id)
                            ? interest.color
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {interest.label}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowMoreInterests(true)}
                      className="p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all text-left text-gray-500"
                    >
                      More interests +
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
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
                        className="border-0 p-0 h-auto focus-visible:ring-0 mb-2"
                      />
                      <p className="text-xs text-gray-400">
                        Press Enter or comma to add
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => {
                      setIsEditingInterests(false);
                      setShowMoreInterests(false);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveInterests}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interestId) => (
                  <span
                    key={interestId}
                    className={`px-4 py-2 rounded-lg border-2 ${getInterestColor(interestId)}`}
                  >
                    {getInterestLabel(interestId)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Saved Careers Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-700" />
            </div>
            <h2>SAVED CAREERS</h2>
          </div>

          {!showAllCareers ? (
            <div className="space-y-3 mb-6">
              {displayedCareers.map((career) => (
                <div
                  key={career.id}
                  className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <span>{career.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1 bg-white border border-gray-300 rounded-full">
                      Saved {career.savedDate}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700"
                    >
                      OPEN
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[400px] mb-6">
              <div className="space-y-3 pr-4">
                {savedCareers.map((career) => (
                  <div
                    key={career.id}
                    className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-700" />
                      <span>{career.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1 bg-white border border-gray-300 rounded-full">
                        Saved {career.savedDate}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700"
                      >
                        OPEN
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <Button
            variant="outline"
            className="w-full border-gray-300"
            onClick={() => setShowAllCareers(!showAllCareers)}
          >
            {showAllCareers ? "Show Less" : "Open Saved Results"}
          </Button>
        </div>
      </div>
    </div>
  );
}
function Page() {
  throw new Error("Function not implemented.");
}

