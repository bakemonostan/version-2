"use client";
import { X } from "lucide-react";
import GoogleIcon from "./GoogleIcon";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import VerifyToken from "./VerifyToken";
import { useAuthStore } from "@/store/authStore";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import useCustomMutation from "@/hooks/mutations/useCusotmMutation";
import { useRouter } from "next/navigation";

interface GoogleResponse {
  email: string;
  name: string;
  picture: string;
}

interface ErrorResponse {
  message: string;
}

export default function SignIn() {
  const { currentCard, headerText, resetCards, setEmail, setCards } = useAuthStore();
  const router = useRouter();
  const reset = () => {
    resetCards();
  };

  const { mutate } = useCustomMutation<GoogleResponse, string>(
    async (token: string) => {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to login with Google');
      }
      
      return response.json();
    }
  );

  const login = useGoogleLogin({
    onSuccess: (response) => {
      if ('access_token' in response) {
        mutate(response.access_token, {
          onSuccess: (data: GoogleResponse) => {
            setEmail(data.email);
            toast.success("Login successful", {
              description: "Please verify your email to complete login",
            });
            setCards("verify-token");
            router.push(`/auth?email=${data.email}`);
          },
          onError: (error: ErrorResponse) => {
            toast.error("Google login failed", {
              description: error.message,
            });
          }
        });
      }
    },
    onError: () => {
      toast.error("Google login failed", {
        description: "Failed to login with Google",
      });
    },
  });

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
          <div onClick={() => login()} className="cursor-pointer">
            <GoogleIcon />
          </div>
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
