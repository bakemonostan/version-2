import { LogoIcon } from "@/components/icons";
import { Button } from "@mantine/core";
import React from "react";
import NavDropdownMenu from "./NavDropdownMenu";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <header className="top-0 z-50 w-full p-5 bg-white border md:sticky md:py-5 opacity-90">
      <nav className="mx-auto sm:max-w-[79.5rem] flex sm:flex-wrap items-center justify-between gap-10 sm:gap-5">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="items-center gap-3.5 sm:flex hidden">
          <div className="px-2">
            <Button variant="outline" color="black" radius={"xl"}>
              Start earning on Kaparki
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
