
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { Edit2Icon } from "lucide-react";
import DetailsComponent from "./DetailsComponent";
import { useModal } from "@/providers/ModalContext";


export default function ProfileTab() {
  const { user } = useUserStore();
  const { openModal } = useModal();


  const imgUrl =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <div>
      <div className="p-4 mt-8 rounded-md sm:p-6 bg-[#F9F7DE]">
        <div className="flex items-center gap-4">
          <div className="size-8">
            <Image
              width={32}
              height={32}
              src="/images/party-popper-img.jpg"
              alt="Hurray icon"
              className="h-full w-full object-cover aspect-square mix-blend-multiply"
            />
          </div>
          <p className="text-sm sm:text-base">
            The information you share will be used to help other guests and
            hosts get to know you
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-6 py-8 sm:flex items-center">
        <div className="py-1 flex items-center justify-center flex-col">
          <Avatar className="w-[121px] h-[121px] ">
            <AvatarImage
              src={user?.picture || imgUrl}
              alt="Profile"
            />
            <AvatarFallback>
              {user?.legal_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div
            className="bg-white rounded-full p-2 shadow-2xl relative -top-5 cursor-pointer">
            <p className="flex items-center gap-2 ">
              <span>
                <Edit2Icon className="size-4" />
              </span>
              <span className="body-3 text=black/8- font-medium">Replace</span>
            </p>
          </div>
        </div>
        <div className="w-full">
          <DetailsComponent
            title="ABOUT YOU"
            subtitle={user?.bio || "Add your bio"}
            className="border-none"
            withLink
            isColumn
            linkText="Edit About Info"
            onAction={() => {
              openModal("edit-bio", { bio: user?.bio });
            }}
          />
        </div>
      </div>
    </div>
  );
}
