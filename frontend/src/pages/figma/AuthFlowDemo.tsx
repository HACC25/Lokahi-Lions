import { useState } from "react";
import FigmaSignUp from "./FigmaSignUp";
import FigmaSignIn from "./FigmaSignIn";
import FigmaSignOutModal from "./FigmaSignOutModal";
import FigmaProfilePage from "./FigmaProfile";
import { Button } from "../../components/ui/button";

type View = "sign-up" | "sign-in" | "profile";

export default function FigmaAuthFlowDemo() {
  const [currentView, setCurrentView] = useState<View>("sign-up");
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    console.log("User signed out");
    setCurrentView("sign-in");
  };

  return (
    <div>
      {/* Navigation for demo purposes */}
      <div className="bg-white border-b p-4 flex gap-4 items-center justify-center">
        <Button
          onClick={() => setCurrentView("sign-up")}
          variant={currentView === "sign-up" ? "default" : "outline"}
        >
          Sign Up
        </Button>
        <Button
          onClick={() => setCurrentView("sign-in")}
          variant={currentView === "sign-in" ? "default" : "outline"}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setCurrentView("profile")}
          variant={currentView === "profile" ? "default" : "outline"}
        >
          Profile
        </Button>
        <Button
          onClick={() => setShowSignOutModal(true)}
          variant="outline"
        >
          Sign Out
        </Button>
      </div>

      {/* Render current view */}
      {currentView === "sign-up" && <FigmaSignUp />}
      {currentView === "sign-in" && (
        <FigmaSignIn onNavigateToSignUp={() => setCurrentView("sign-up")} />
      )}
      {currentView === "profile" && <FigmaProfilePage />}

      {/* Sign out modal */}
      <FigmaSignOutModal
        open={showSignOutModal}
        onOpenChange={setShowSignOutModal}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
