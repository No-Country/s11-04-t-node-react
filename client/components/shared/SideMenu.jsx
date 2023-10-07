import React from "react";
import Link from "next/link";
import { TbUser, TbUserEdit } from "react-icons/tb";

export const SideMenu = () => {
  return (
    <div className="flex flex-col justify-start gap-3 p-4 w-52 sm:w-[210px] bg-white border shadow-md text-[#080B16] rounded-md">
      <div className="flex items-center flex-col">
        <h3 className="font-roboto text-center px-2 font-bold">
          Bienvenidos a
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-bold">BarberBuddy</p>
          <img
            src="/images/logo-black.png"
            alt="logo"
            className="text-black w-8"
          />
        </div>
      </div>

      <Link
        href="/acceso"
        className="flex items-center gap-2 hover:text-[#F0B35B] transition"
      >
        <TbUser className="text-2xl" />
        <p>Inicia sesión</p>
      </Link>

      <Link
        href="/registro"
        className="flex items-center gap-2 hover:text-[#F0B35B]"
      >
        <TbUserEdit className="text-2xl" />
        <p>Regístrate</p>
      </Link>
    </div>
  );
};
