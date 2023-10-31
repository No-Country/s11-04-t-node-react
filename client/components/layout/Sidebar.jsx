"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import { BsArrowDownUp } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import clsx from "clsx";
import {
  RiHome3Line,
  RiMenu3Fill,
  RiUser3Line,
  RiNotification3Line,
  RiArrowUpSLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { atom, useAtom, useSetAtom } from "jotai";

const sidebarOpenAtom = atom(false);

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const toggleMobileMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="sm sm:ml-3 sm:w-25 mb-2">
      <nav className="flex items-center justify-between text-3xl sm:hidden bg-[#292D33] text-[#B5AF93] py-4 px-11 fixed z-50 bottom-0 w-full border-t border-gray-100/40">
        <Link href="/">
          <RiHome3Line />
        </Link>
        <Link href="/admin/agenda">
          <RiNotification3Line />
        </Link>
        <Link href="/admin/clientes">
          <RiUser3Line />
        </Link>

        <button onClick={toggleMobileMenu}>
          {sidebarOpen ? <RiMenu3Fill /> : <BsArrowDownUp />}
        </button>
      </nav>

      <div
        className={clsx(
          `fixed sm:sticky left-0 z-20 flex flex-col h-full transition-all duration-500 bg-[#292D33] rounded-t-2xl`,
          "w-full sm:w-auto sm:rounded-b-2xl",
          sidebarOpen ? "top-0" : "-top-full"
        )}
      >
        <aside className="bg-[#292D33] flex flex-col min-h-screen overflow-auto sm:rounded-t-2xl sm:rounded-b-2xl sm:border-2 sm:border-black">
          {/* Global || Barbero */}
          <Link
            href="/admin/clientes"
            className="sm:border-b-2 sm:border-black"
          >
            <div className="text-[#B5AF93] sm:bg-[#B5AF93] py-4 px-6 sm:px-16 transition-colors flex items-center  sm:text-black fill-current sm:hover:bg-[#B5AF93] sm:hover:opacity-70 sm:active:opacity-80 sm:checked:bg-opacity-90">
              <div
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between sm:justify-start text-lg w-fulld"
              >
                <p>Clientes</p>
              </div>
              <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
            </div>
          </Link>

          <Link href="/admin/agenda" className="sm:border-b-2 sm:border-black">
            <div className="text-[#B5AF93] sm:bg-[#B5AF93] py-4 px-6 sm:px-16 transition-colors flex items-center  sm:text-black fill-current sm:hover:bg-[#B5AF93] sm:hover:opacity-70 sm:active:opacity-80 sm:checked:bg-opacity-90">
              <div
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between sm:justify-start text-left text-lg w-full"
              >
                <p>Agenda</p>
              </div>
              <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
            </div>
          </Link>

          <DynamicRoleLinks />

          <div className="mt-auto max-sm:pb-20">
            <div className="flex flex-col py-4 px-6 sm:px-12 transition-colors items-center justify-between sm:text-white fill-current">
              <Link
                href="/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-5 justify-between sm:justify-center text-xl sm:text-2xl w-full max-sm:text-[#B5AF93]"
              >
                <div className="flex sm:flex-col items-center gap-3">
                  <FaPowerOff className="text-[#C13636DB] sm:text-3xl" />
                  <p className="text-lg">Salir</p>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const DynamicRoleLinks = dynamic(() => Promise.resolve(RoleLinks), {
  ssr: false,
});

const RoleLinks = () => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const user = useSelector((s) => s.user.value);
  // console.log(user);

  return (
    <>
      {user.role === "admin" && (
        <>
          <Link
            href="/admin/barberos"
            className="sm:border-b-2 sm:border-black"
          >
            <div className="text-[#B5AF93] sm:bg-[#B5AF93] py-4 px-6 sm:px-16 transition-colors flex items-center  sm:text-black fill-current sm:hover:bg-[#B5AF93] sm:hover:opacity-70 sm:active:opacity-80 sm:checked:bg-opacity-90">
              <div
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between sm:justify-start text-left text-lg w-fulld"
              >
                <p>Barberos</p>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>
          </Link>

          <Link
            href="/admin/servicios"
            className="sm:border-b-2 sm:border-black"
          >
            <div className="text-[#B5AF93] sm:bg-[#B5AF93] py-4 px-6 sm:px-16 transition-colors flex items-center  sm:text-black fill-current sm:hover:bg-[#B5AF93] sm:hover:opacity-70 sm:active:opacity-80 sm:checked:bg-opacity-90">
              <div
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between sm:justify-start text-lg w-full"
              >
                <p>Servicios</p>
              </div>
              <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
            </div>
          </Link>
        </>
      )}
    </>
  );
};
