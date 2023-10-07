import React from "react";
import { RiMenuLine } from "react-icons/ri";
import { SideMenu } from "../shared/SideMenu";

export const UserMenu = () => {
  return (
    <div className="flex flex-col items-center cursor-pointer relative group">
      <div className="absolute top-9 right-0 hidden group-hover:block z-10 transition-all duration-500">
        <SideMenu />
      </div>
      <RiMenuLine className="text-4xl" />
    </div>
  );
};
