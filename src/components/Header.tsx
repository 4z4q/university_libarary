"use client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";
import { getInitial } from "@/lib/utils";
import { Button } from "./ui/button";
import Logout from "./Logout";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5 text-white font-bold ">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        BookWis
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href={"/"}>Library</Link>
        </li>
        <li>
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage
                src={session?.user?.image || "/images/profilepic.png"}
                alt="avatar"
              />
              <AvatarFallback className="bg-amber-100">
                {getInitial(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Logout />
          ) : (
            <Button>
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
