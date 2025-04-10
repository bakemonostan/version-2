"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";
import { toast } from "sonner";
import { useVehicleListingStore } from "@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore";

export function PreviewSubmissionModal() {
  const { closeModal } = useModal();
  const router = useRouter();
  const store = useVehicleListingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await api.post(`/vehicle/save/${store.listingId}`);
    },
    onSuccess: () => {
      closeModal();
      router.push("/dashboard/listings");
      toast.success('Vehicle listed successfully', {
        description: 'Your vehicle has been listed successfully, awaiting approval'
      });
      store.resetStore();
    },
    onError: () => {
      toast.error('Error', {
        description: 'Something went wrong, please try again'
      });
      closeModal();
      router.push("/auth");
    }
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Modal
      id="preview-submission-modal"
      onClose={closeModal}
      description="Are you sure you want to submit this listing?"
      title="Submit Listing?"
      className="w-full modal-md"
    >
      <div className="py-5 w-full">
        <Button 
          className="w-full" 
          variant="cta" 
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Proceed"}
        </Button>
      </div>
    </Modal>
  );
}
