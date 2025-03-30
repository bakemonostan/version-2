import { LogoIcon } from "@/components/icons";
import { Button } from "@mantine/core";
import React from "react";
import NavDropdownMenu from "./NavDropdownMenu";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <nav className="flex-col md:flex-row flex-between landing-container py-7">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div>
          <Button variant="outline" color="black" radius={"xl"}>
            Start earning on Kaparki
          </Button>
        </div>
        <div>
          <NavDropdownMenu />
        </div>
      </nav>
    </header>
  );
}
