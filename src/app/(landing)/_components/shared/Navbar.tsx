import { LogoIcon } from "@/components/icons";
import React from "react";
import NavDropdownMenu from "./NavDropdownMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
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
        <div className="flex items-center justify-center gap-2 p-2 cursor-pointer sm:px-4 rounded-2xl sm:rounded-full w-14 bg-black/5 sm:w-max">
          <NavDropdownMenu />
        </div>
      </nav>
    </header>
  );
}
