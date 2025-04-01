import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "react-day-picker/style.css";
import "@mantine/carousel/styles.css";
import { Outfit } from "next/font/google";
import MantaineProvider from "@/providers/MantaineProvider";
import QueryProvider from "@/providers/QueryProvider";
import { Loader, mantineHtmlProps } from "@mantine/core";
import { Toaster } from "sonner";
import { CircleCheck, InfoIcon, CircleAlert, CircleX } from "lucide-react";
import { ModalProvider } from "@/providers/ModalContext";
import { ModalRegistry } from "@/providers/ModalRegistry";
import { GoogleOAuthProvider } from "@react-oauth/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kaparki",
  description:
    "Rev up your journey with Kaparki - where premium wheels meet freedom. Find your perfect ride, break the routine, and hit the road your way. No compromises, just pure driving pleasure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}>
      <body className={`${outfit.variable} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <MantaineProvider>
            <QueryProvider>
              <ModalProvider>
                {children}
                <Toaster
                  duration={3000}
                  position="top-center"
                  richColors
                  closeButton
                  toastOptions={{
                    classNames: {
                      toast: "toast",
                      default: "toast-default",
                      icon: "toast-icon",
                      description: "toast-description",
                      title: "toast-title",
                      content: "toast-content",
                    },
                  }}
                  icons={{
                    success: <CircleCheck size={18} />,
                    info: <InfoIcon size={18} />,
                    warning: <CircleAlert size={18} />,
                    error: <CircleX size={18} />,
                    loading: (
                      <Loader
                        color="yellow.4"
                        size="sm"
                      />
                    ),
                  }}
                />
                <ModalRegistry />
              </ModalProvider>
            </QueryProvider>
          </MantaineProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
