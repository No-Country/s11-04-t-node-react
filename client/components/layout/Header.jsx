import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { UserMenu } from "./UserMenu";

export const Header = ({ fluid }) => {
  return (
    <header>
      <nav className="bg-[#292D33] w-full top-0 left-0 text-white max-sm:py-2 px-4 sm:pt-1 sm:border-b-[10px] border-white">
        <div
          className={clsx(
            "flex items-center justify-between px-2",
            !fluid && "max-w-screen-xl mx-auto"
          )}
        >
          <Link href="/">
            <Image
              src="/images/logo-app.png"
              alt="logo"
              width={260}
              height={103}
              priority={true}
              className="max-sm:hidden w-52"
            />
            <Image
              src="/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              priority={true}
              className="sm:hidden"
            />
          </Link>

          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
