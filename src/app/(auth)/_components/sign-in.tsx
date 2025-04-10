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
import { setCookie } from "cookies-next/client";
import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";
import api from "@/config/api";

interface GoogleResponse {
  email: string;
  name: string;
  picture: string;
  token?: string;
}

interface ErrorResponse {
  message: string;
}

export default function SignIn() {
  const { currentCard, headerText, resetCards, setEmail, setIsAuthenticated } =
    useAuthStore();
  const router = useRouter();
  const { refetchQuery } = useInvalidateQuery();

  const reset = () => {
    resetCards();
  };

  const { mutate } = useCustomMutation<GoogleResponse, string>(
    async (token: string) => {
      const response = await api.post("/google/callback", { token });

      if (response.status !== 200) {
        throw new Error("Failed to login with Google");
      }
      toast.success("Logged in successfully");
      setIsAuthenticated(true);
      setEmail(response?.data?.data?.email);
      setCookie("kpk_token", response?.data?.data?.token);
      refetchQuery({ queryKey: ["dashboard data"] });
      router.push("/dashboard/overview");
      return response.data;
    }
  );

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      mutate(tokenResponse.access_token, {
        onSuccess: () => {
          refetchQuery({ queryKey: ["dashboard data"] });
        },
        onError: (error: ErrorResponse) => {
          toast.error("Login failed", {
            description: error.message,
          });
        },
      });
    },
    onError: () => {
      toast.error("Google login failed");
    }
  });

  const loginWithGoogle = () => {
    googleLogin();
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
          <div
            onClick={loginWithGoogle}
            className="cursor-pointer">
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
