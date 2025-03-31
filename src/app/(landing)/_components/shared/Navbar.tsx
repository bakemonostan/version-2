"use client";
import { LogoIcon } from "@/components/icons";
import React from "react";
import NavDropdownMenu from "./NavDropdownMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
export default function LandingNavbar() {
  const {user} = useUserStore();
  const pathname = "/"; 
  if (pathname.includes("/auth")) {
    return null;
  }

  return (
    <header className="top-0 z-50 w-full p-5 bg-white border md:sticky md:py-5 opacity-90">
      <nav className="mx-auto landing-container flex sm:flex-wrap items-center justify-between gap-10 sm:gap-5">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="items-center gap-3.5 sm:flex hidden">
          <div className="px-2">
            <Button
              variant="outline"
              color="black"
              className="h-10 rounded-full border-black/80 active:bg-black/10 active:translate-y-1 transition-all active:duration-300">
              <p className="px-6 py-6">Start earning on Kaparki</p>
            </Button>
          </div>
        </div>
        {!user ? (
          <div className="items-center hidden rounded-full cursor-pointer sm:flex sm:gap-4">
            <Button variant="link"  className="rounded-full">
              <Link href="/auth" className="text-sm sm:text-base ">
                Sign up
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full">
              <Link href="/auth" className="text-sm font-bold w-14 sm:text-base">
                Login
              </Link>
            </Button>
          </div>
        ) : (
          <div >
            <NavDropdownMenu />
          </div>
        )}
      </nav>
    </header>
  );
}
