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
      <DialogTitle>
        <DialogContent className="max-w-md rounded-3xl border border-gray-200 bg-white shadow-2xl px-10 py-8">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Are you sure you want to sign out?
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirm if you want to sign out of your account
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-6">
            <Button
              onClick={() => {
                onSignOut();
                onOpenChange(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 min-w-[140px] rounded-full text-base py-2.5 px-8"
            >
              Sign out
            </Button>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
