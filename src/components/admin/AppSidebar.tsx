"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, getInitial } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { adminSideBarLinks } from "@/app/constant";
import "../../styles/style.css";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

function AppSidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    <Sidebar className="border-none shadow-2xl">
      <SidebarHeader>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="BookWise Logo"
            height={37}
            width={37}
          />
          <h1 className="text-lg font-semibold">BookWise</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="border-red-600">
        <SidebarGroup>
          <div className="mt-5 flex flex-col gap-5">
            {adminSideBarLinks.map((link) => {
              const isSelected =
                (link.route !== "/admin" &&
                  pathname.includes(link.route) &&
                  link.route.length > 1) ||
                pathname === link.route;

              return (
                <Link href={link.route} key={link.route}>
                  <div
                    className={`flex flex-row rounded-sm items-center gap-3 p-3 font-semibold  ${cn(
                      "link",
                      isSelected && "bg-primary-admin shadow-sm "
                    )}`}
                  >
                    <div className="relative size-5">
                      <Image
                        src={link.img}
                        alt="icon"
                        fill
                        className={`${
                          isSelected ? "brightness-0 invert" : ""
                        }  object-contain`}
                      />
                    </div>

                    <p className={cn(isSelected ? "text-white" : "text-dark")}>
                      {link.text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 m-5 rounded-xl bg-[#f8f8ff]">
        <div className="user">
          <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitial(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
