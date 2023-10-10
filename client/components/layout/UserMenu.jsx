"use client";
import React from "react";
import { RiMenuLine } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { TbUser, TbUserEdit } from "react-icons/tb";
import Image from "next/image";

export const UserMenu = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <RiMenuLine className="text-4xl max-sm:pt-1" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute z-10 top-full right-0"
      >
        <Menu.Items>
          <div className="flex flex-col justify-start mt-2 sm:mt-0.5 gap-3 p-4 w-52 sm:w-[210px] bg-white border border-gray-100/40 shadow-md text-[#292D33] rounded">
            <div className="flex items-center flex-col">
              <h3 className="font-roboto text-center px-2 font-bold">
                Bienvenidos a
              </h3>
              <div className="flex items-center gap-2">
                <p className="font-bold">BarberBuddy</p>
                <Image
                  src="/images/logo-black.png"
                  alt="logo"
                  className="text-black"
                  width={36}
                  height={36}
                />
              </div>
            </div>

            <Menu.Item>
              <Link
                href="/acceso"
                className="flex items-center gap-2 hover:text-[#B5AF93] transition"
              >
                <TbUser className="text-2xl" />
                <p>Inicia sesión</p>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                href="/registro"
                className="flex items-center gap-2 hover:text-[#B5AF93]"
              >
                <TbUserEdit className="text-2xl" />
                <p>Regístrate</p>
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
