"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ModalId, ModalParamsMap } from "@/types/modal-types";

type ModalParamsType = {
  [K in ModalId & keyof ModalParamsMap]?: ModalParamsMap[K];
};

interface ModalContextType {
  openModal: <T extends ModalId & keyof ModalParamsMap>(id: T, params?: ModalParamsMap[T]) => void;
  closeModal: () => void;
  activeModal: ModalId | null;
  modalParams: ModalParamsType | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [modalParams, setModalParams] = useState<ModalParamsType | null>(null);

  const openModal = <T extends ModalId & keyof ModalParamsMap>(id: T, params?: ModalParamsMap[T]) => {
    setActiveModal(id);
    if (params) {
      setModalParams({ [id]: params });
    } else {
      setModalParams(null);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalParams(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal, modalParams }}>
      {children}
    </ModalContext.Provider>
  );
} 
