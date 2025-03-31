"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useIsFetching } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ToggleRight } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItems, DropdownMenuItemsTwo } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Skeleton } from "@mantine/core";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

export default function NavDropdownMenu() {
  const { user, setUser } = useUserStore();
  const isFetching = useIsFetching();
  const menuItems = user ? DropdownMenuItems : DropdownMenuItemsTwo;
  const router = useRouter();
  if (isFetching === 1 || !user) {
    return (
      <div className="flex items-center gap-3 bg-black/10 rounded-full w-44 h-12 cursor-pointer">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-24 h-4 rounded-full" />
      </div>
    );
  }

  const signOut = () => {
    localStorage.removeItem("authStore");
    localStorage.removeItem("user-store");
    localStorage.removeItem("list-a-vehicle");
    deleteCookie("kpk_token");
    router.push("/");
    router.refresh();
    setUser(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1 bg-black/10 rounded-full p-1 px-2 cursor-pointer">
          <Avatar className="hidden sm:block h-8 w-8">
            <AvatarImage
              className="border-[3px] rounded-full border-brand-yellow-0"
              src="https://pbs.twimg.com/profile_images/1599029039297077249/p0znhFdE_200x200.jpg"
            />
          </Avatar>
          <span className="hidden sm:block">{user?.details.legal_name}</span>
          <span>
            <Menu className="text-black/50 w-5 h-5 mt-1" />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[16rem] p-[1px] bg-gradient-to-br from-[#FFCB4E] to-[#DDC7F2] rounded-3xl translate-y-8 -translate-x-6">
        <div className="bg-white rounded-3xl overflow-hidden">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.link}
              className="transition-all duration-300 hover:bg-none p-0">
              <li className="w-full list-none group">
                <Link
                  href={item.link}
                  className="relative flex items-center w-full px-4 py-5 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFEDB5]/15 hover:to-[#DCC6F5]/5 group-hover:scale-[1.02]">
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCB4E] to-[#DDC7F2] opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                  />
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-black">{item.name}</span>
                </Link>
                {item.withDivider && <hr className="w-full border mt-2" />}
              </li>
            </DropdownMenuItem>
          ))}
          {user && (
            <DropdownMenuItem className="p-0">
              <Link
                onClick={() => {
                  signOut();
                }}
                href="/"
                className="relative flex items-center w-full px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#FFEDB5]/15 hover:to-[#DCC6F5]/5 group-hover:scale-[1.02]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCB4E] to-[#DDC7F2] opacity-0 transition-opacity duration-200 hover:opacity-100" />
                <ToggleRight className="w-5 h-5 mr-3" />
                <p className="text-black">Logout</p>
              </Link>
            </DropdownMenuItem>
          )}
          {!user && (
            <DropdownMenuItem className="p-0">
              <div className="flex justify-center w-full py-3 px-4">
                <Button variant="cta">
                  <Link
                    href="/list-a-vehicle"
                    className="font-bold text-black/70">
                    List on Kaparki
                  </Link>
                </Button>
              </div>
            </DropdownMenuItem>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
