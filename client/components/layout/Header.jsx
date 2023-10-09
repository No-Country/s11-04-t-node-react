import React from "react";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import Image from "next/image";
import clsx from "clsx";

export const Header = ({ fluid }) => {
  return (
    <header>
      <nav className="bg-[#080B16] w-full top-0 left-0 text-white max-sm:py-2 px-4 sm:pt-1 border-b border-gray-100/40">
        <div
          className={clsx(
            "flex items-center justify-between px-2",
            !fluid && "max-w-screen-xl mx-auto"
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            <span className="text-2xl">BarberBuddy</span>
          </Link>

          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
