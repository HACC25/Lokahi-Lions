import { useState, KeyboardEvent, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { UserCircle, FileText, X } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
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

const INTEREST_STORAGE_KEY = "uh-pathfinder-selected-interests";
const PROFILE_STORAGE_KEY = "uh-pathfinder-profile-data";

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
  
  const [profileData, setProfileData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (
            parsed &&
            typeof parsed === "object" &&
            "firstName" in parsed &&
            "lastName" in parsed &&
            "studentStatus" in parsed &&
            "campus" in parsed
          ) {
            return parsed;
          }
        } catch (error) {
          console.warn("Failed to parse stored profile:", error);
        }
      }
    }
    return {
      firstName: "John",
      lastName: "Doe",
      studentStatus: "sophomore",
      campus: "uh-manoa",
    };
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(INTEREST_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        } catch (error) {
          console.warn("Failed to parse saved interests:", error);
        }
      }
    }
    return ["software-engineer", "data-scientist", "ux-designer"];
  });

  const [profileErrors, setProfileErrors] = useState({
    firstName: "",
    lastName: "",
  });

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
    const trimmedFirst = profileData.firstName.trim();
    const trimmedLast = profileData.lastName.trim();

    const newErrors = {
      firstName: trimmedFirst ? "" : "Required: Please enter your first name",
      lastName: trimmedLast ? "" : "Required: Please enter your last name",
    };
    setProfileErrors(newErrors);

    if (!trimmedFirst || !trimmedLast) {
      return;
    }

    setProfileErrors({ firstName: "", lastName: "" });
    setIsEditingProfile(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    }
    console.log("Saving profile:", profileData);
  };

  const handleSaveInterests = () => {
    setIsEditingInterests(false);
    setShowMoreInterests(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(selectedInterests));
    }
    console.log("Saving interests:", selectedInterests);
  };

  const sortedCareers = useMemo(
    () =>
      [...savedCareers].sort(
        (a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
      ),
    [savedCareers]
  );

  const displayedCareers = showAllCareers ? sortedCareers : sortedCareers.slice(0, 2);

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
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-gradient-to-br from-[#e9fbf2] via-[#f0fff5] to-[#f7fff9]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-32 right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-lime-200 rounded-full blur-3xl opacity-35" style={{ animationDelay: '2s' }}></div>
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '140px 140px'
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen pt-10 pb-4 px-5">
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Header */}
          <div className="text-center md:text-left space-y-1.5">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Profile & journey</p>
            <h1 className="text-3xl font-bold text-slate-900">Stay on top of your UH journey!</h1>
            <p className="text-sm text-slate-600 max-w-3xl">Update your interests, review your saved paths, and get ready for advising in one place.</p>
          </div>

          {/* Profile Details Section */}
          <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-emerald-600 uppercase tracking-[0.35em]">
                <UserCircle className="w-5 h-5" />
                Profile details
              </div>
              {!isEditingProfile && (
                <Button
                  onClick={() => {
                    setProfileErrors({ firstName: "", lastName: "" });
                    setIsEditingProfile(true);
                  }}
                  className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold shadow-emerald-200 shadow-lg"
                >
                  Edit profile
                </Button>
              )}
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      className={`rounded-2xl border ${
                        profileErrors.firstName ? "border-red-400 focus-visible:ring-red-200" : "border-emerald-100"
                      }`}
                      value={profileData.firstName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const capitalizedValue = capitalizeWords(value);
                        setProfileData({ ...profileData, firstName: capitalizedValue });
                        if (profileErrors.firstName) {
                          setProfileErrors((prev) => ({
                            ...prev,
                            firstName: capitalizedValue.trim() ? "" : prev.firstName,
                          }));
                        }
                      }}
                    />
                    {profileErrors.firstName && (
                      <p className="text-sm text-red-600 mt-2">{profileErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      className={`rounded-2xl border ${
                        profileErrors.lastName ? "border-red-400 focus-visible:ring-red-200" : "border-emerald-100"
                      }`}
                      value={profileData.lastName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const capitalizedValue = capitalizeWords(value);
                        setProfileData({ ...profileData, lastName: capitalizedValue });
                        if (profileErrors.lastName) {
                          setProfileErrors((prev) => ({
                            ...prev,
                            lastName: capitalizedValue.trim() ? "" : prev.lastName,
                          }));
                        }
                      }}
                    />
                    {profileErrors.lastName && (
                      <p className="text-sm text-red-600 mt-2">{profileErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="studentStatus"
                    className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block"
                  >
                    Student Status
                  </Label>
                  <Select
                    value={profileData.studentStatus}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, studentStatus: value })
                    }
                  >
                    <SelectTrigger className="rounded-2xl border-emerald-100 h-12">
                      <SelectValue placeholder="Select status" />
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
                  <Label
                    htmlFor="campus"
                    className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 block"
                  >
                    UH Campus
                  </Label>
                  <Select
                    value={profileData.campus}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, campus: value })
                    }
                  >
                    <SelectTrigger className="rounded-2xl border-emerald-100 h-12">
                      <SelectValue placeholder="Select campus" />
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
                    className="rounded-2xl border-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-emerald-200 shadow-lg"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { label: 'Name', value: `${profileData.firstName} ${profileData.lastName}` },
                  {
                    label: 'Student status',
                    value:
                      profileData.studentStatus.charAt(0).toUpperCase() +
                      profileData.studentStatus.slice(1).replace("-", " "),
                  },
                  {
                    label: 'UH Campus',
                    value:
                      profileData.campus === 'uh-manoa'
                        ? 'UH Mānoa'
                        : profileData.campus.toUpperCase(),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-emerald-100 p-4 bg-white/60 hover:border-emerald-200 transition"
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">
                      {item.label}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-start">
            <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg p-5 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Career Interests</p>
                  <h3 className="text-lg font-semibold text-slate-900">Curate your focus areas</h3>
                </div>
                {!isEditingInterests && (
                  <Button
                    onClick={() => setIsEditingInterests(true)}
                    variant="outline"
                    className="rounded-2xl border-emerald-100"
                    size="sm"
                  >
                    Edit
                  </Button>
                )}
              </div>

              {isEditingInterests && selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedInterests.map((interestId) => (
                    <span
                      key={interestId}
                      className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${getInterestColor(interestId)} text-xs font-semibold tracking-[0.2em] uppercase text-slate-700`}
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

                  <div className="flex gap-2 justify-end pt-2">
                    <Button
                      onClick={() => {
                        setIsEditingInterests(false);
                        setShowMoreInterests(false);
                      }}
                      variant="outline"
                      className="rounded-2xl border-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveInterests}
                      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow-emerald-200 shadow-lg"
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
                      className={`px-4 py-2 rounded-lg border-2 ${getInterestColor(interestId)} shadow-sm text-xs font-semibold tracking-[0.2em] uppercase text-slate-700`}
                    >
                      {getInterestLabel(interestId)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-emerald-100 rounded-3xl shadow-lg p-5 space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 font-semibold">Saved careers</p>
                  <p className="text-sm text-slate-500">Display {displayedCareers.length} of {savedCareers.length} journeys</p>
                </div>
              </div>

              {!showAllCareers ? (
                <div className="space-y-3">
                  {displayedCareers.map((career) => (
                    <div
                      key={career.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-emerald-100 bg-emerald-50/70"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{career.title}</p>
                        <p className="text-sm text-slate-500">Saved {career.savedDate}</p>
                      </div>
                      <Button variant="outline" className="rounded-2xl border-emerald-100" size="sm">
                        Open
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <ScrollArea className="h-[320px]">
                  <div className="space-y-3 pr-4">
                    {sortedCareers.map((career) => (
                      <div
                        key={career.id}
                        className="flex items-center justify-between p-4 rounded-2xl border border-emerald-100 bg-emerald-50/70"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{career.title}</p>
                          <p className="text-sm text-slate-500">Saved {career.savedDate}</p>
                        </div>
                        <Button variant="outline" className="rounded-2xl border-emerald-100" size="sm">
                          Open
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              <Button
                variant="outline"
                className="w-full rounded-2xl border-emerald-100"
                onClick={() => setShowAllCareers(!showAllCareers)}
              >
                {showAllCareers ? "Show Less" : "Open Saved Results"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
