import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
interface MultistepFormButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBackClick: () => void;
  onContinueClick: () => void;
  type?: "submit" | "button";
}

export default function MultistepFormButtons({
  currentStep = 1,
  totalSteps = 6,
  isSubmitting = false,
  onBackClick = () => {},
  onContinueClick = () => {},
  type = "submit",
}: MultistepFormButtonsProps) {
  return (
    <div className="grid w-max rounded-md justify-end ml-auto gap-5 grid-cols-2">
      <Button
        disabled={currentStep === 1}
        onClick={onBackClick}
        className="border-0 bg-transparent text-black/80 shadow-none hover:bg-transparent hover:text-black/80 disabled:text-black/50 disabled:cursor-not-allowed">
        Back
      </Button>
      {currentStep === totalSteps && (
        <Button
          variant="cta"
          disabled={isSubmitting}
          type={type}
          onClick={onContinueClick}>
          {isSubmitting ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      )}
      {currentStep !== totalSteps && (
        <Button
          variant="cta"
          disabled={isSubmitting}
          type={type}
          onClick={onContinueClick}>
          {isSubmitting ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      )}
    </div>
  );
}
