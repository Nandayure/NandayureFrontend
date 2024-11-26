import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({
  isOpen,
  onClose,
  message,
}: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            Error
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base">{message}</DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
