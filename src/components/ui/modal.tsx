"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalContext";
import { ModalId } from "@/types/modal-types";

interface ModalProps {
  id: ModalId;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ id, title, description = "", children, className }: ModalProps) {
  const { activeModal, closeModal } = useModal();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setOpen(activeModal === id);
  }, [activeModal, id]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      closeModal();
    }
  };

  // Add a specific class to ensure our size modifications take precedence
  const dialogClassNames = `override-mantine-modal ${className || ''}`;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={dialogClassNames}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className={description ? "" : "sr-only"}>
              {description || `${title} dialog`}
            </DialogDescription>
          </DialogHeader>
        )}
        {!title && (
          <DialogDescription className="sr-only">
            Modal dialog
          </DialogDescription>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
} 
