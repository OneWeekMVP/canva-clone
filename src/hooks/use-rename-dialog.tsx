import { useState, useEffect, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RenameDialogInnerProps {
  initialName: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

const RenameDialogInner = ({ initialName, onConfirm, onCancel }: RenameDialogInnerProps) => {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus and select all text once the dialog animation completes
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (trimmed) {
      onConfirm(trimmed);
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Rename project</DialogTitle>
        <DialogDescription>
          Enter a new name for this project.
        </DialogDescription>
      </DialogHeader>
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Project name"
      />
      <DialogFooter className="pt-2">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={!name.trim()}>
          Save
        </Button>
      </DialogFooter>
    </>
  );
};

export const useRenameDialog = (): [
  () => JSX.Element,
  (currentName: string) => Promise<string | null>,
] => {
  const [state, setState] = useState<{
    resolve: (value: string | null) => void;
    initialName: string;
  } | null>(null);

  const open = useCallback((currentName: string) =>
    new Promise<string | null>((resolve) => {
      setState({ resolve, initialName: currentName });
    }), []);

  const handleConfirm = useCallback((name: string) => {
    state?.resolve(name);
    setState(null);
  }, [state]);

  const handleCancel = useCallback(() => {
    state?.resolve(null);
    setState(null);
  }, [state]);

  const RenameDialog = useCallback(() => (
    <Dialog open={state !== null} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent>
        {state && (
          <RenameDialogInner
            initialName={state.initialName}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  ), [state, handleConfirm, handleCancel]);

  return [RenameDialog, open];
};
