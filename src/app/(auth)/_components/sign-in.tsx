"use client";
import { X } from "lucide-react";
import GoogleIcon from "./GoogleIcon";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import VerifyToken from "./VerifyToken";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { currentCard, headerText, resetCards } = useAuthStore();
  const router = useRouter();
  const reset = () => {
    resetCards();
    router.push(window.location.pathname);
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 px-2 max-w-[500px] mx-auto relative">
        <p className="text-center text-heading-4 leading-heading-4  w-full">
          {headerText}
        </p>
        <X
          className="cursor-pointer hover:rotate-90 transition-all duration-300 hover:scale-110 absolute right-0"
          onClick={() => {
            reset();
          }}
        />
      </div>
      <div className="max-w-[500px] min-h-[429.23px] bg-white rounded-xl mx-auto sm:py-8 sm:px-16 p-8">
        {currentCard === "sign-in" && <SignInForm />}
        {currentCard === "sign-up" && <SignUpForm />}
        {currentCard === "verify-token" && <VerifyToken />}
        <div className="flex-center gap-4 py-9">
          <div className="w-full h-[1px] bg-gray-200 flex-shrink"></div>
          <div className="text-heading-6 leading-heading-6 font-bold flex-shrink-0">
            <p> Or continue with</p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 flex-shrink"></div>
        </div>
        <div className="flex-center gap-4 border border-gray-200 rounded-xl w-max mx-auto p-5 mb-6">
          <GoogleIcon />
        </div>
        <div className="text-body-3 leading-body-3 text-gray-500 text-center">
          <p>
            By logging in or creating an account, you agree with our{" "}
            <span className="text-primary">Terms and Conditions</span> and{" "}
            <span className="text-primary">Privacy Policy</span>
          </p>
        </div>
      </div>
    </>
  );
}
