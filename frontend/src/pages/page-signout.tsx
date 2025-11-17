import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import React from "react";

interface SignOutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignOut: () => void;
}

export default function SignOutModal({
  open,
  onOpenChange,
  onSignOut,
}: SignOutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you sure you want to sign out?
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm if you want to sign out of your account
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              onSignOut();
              onOpenChange(false);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 min-w-[120px]"
          >
            Sign out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
