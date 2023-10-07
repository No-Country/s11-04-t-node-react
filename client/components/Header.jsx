import React from "react";
import Link from "next/link";
import { UserMenu } from "./layout/UserMenu";

export const Header = () => {
  return (
    <header>
      <nav className="bg-[#080B16] w-full top-0 left-0 text-white px-4 sm:py-1 border-b border-gray-100/40">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" />
            <span className="text-2xl">BarberBuddy</span>
          </Link>

          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
