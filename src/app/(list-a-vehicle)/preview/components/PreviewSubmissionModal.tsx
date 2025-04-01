"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";

export function PreviewSubmissionModal() {
  const { closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = () => {
    closeModal();
    router.push("/listings");
  };

  return (
    <Modal
      id="preview-submission-modal"
      onClose={closeModal}
      description="This is a preview of the submission"
      title="Preview Submission"
      className="w-full modal-md"
    >
      <div className="py-5">
        <Button onClick={handleSubmit}>Proceed</Button>
      </div>
    </Modal>
  );
}
