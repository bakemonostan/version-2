import { LogoIcon } from "@/components/icons";
import { Button } from "@mantine/core";
import React from "react";
import NavDropdownMenu from "../../../(landing)/_components/shared/NavDropdownMenu";
import Link from "next/link";
export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white">
      <nav className="flex-col md:flex-row flex-between mx-auto lg:max-w-[90rem] p-5">
        <Link href="/">
          <LogoIcon />
        </Link>
        <div>
          <Button
            variant="outline"
            color="black"
            radius={"xl"}>
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
