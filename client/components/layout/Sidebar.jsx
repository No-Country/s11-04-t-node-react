"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegEdit, FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { BsArrowDownUp } from "react-icons/bs";
import {
  RiLogoutBoxLine,
  RiHome3Line,
  RiCloseLine,
  RiMenu3Fill,
  RiUser3Line,
  RiNotification3Line,
  RiArrowUpSLine,
} from "react-icons/ri";
import Image from "next/image";
import clsx from "clsx";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="flex items-center justify-between text-3xl sm:hidden bg-[#080B16] text-[#F0B35B] py-4 px-11 fixed z-50 bottom-0 w-full border-t border-gray-100/40">
        <Link href="/">
          <RiHome3Line />
        </Link>
        <Link href="/notificacion">
          <RiNotification3Line />
        </Link>
        <Link href="/perfil">
          <RiUser3Line />
        </Link>

        <button onClick={toggleMobileMenu}>
          {sidebarOpen ? <RiMenu3Fill /> : <BsArrowDownUp />}
        </button>
      </nav>

      <div
        className={clsx(
          `fixed sm:sticky left-0 z-20 flex flex-col h-screen transition-all duration-500 bg-white`,
          "w-full sm:w-auto",
          sidebarOpen ? "top-0" : "-top-full"
        )}
      >
        <aside className="bg-[#080B16] flex flex-col min-h-screen overflow-auto">
          {/* Administrador */}
          <>
            <div className="p-4 flex flex-col items-center justify-center sm:py-4">
              <div className="flex justify-center items-center border-[4px] border-[#F0B35B] bg-white rounded-full w-[120px] h-[120px] my-4 mx-auto">
                <Image
                  src="/images/barbero-admin.png"
                  alt="logo-admin"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <h3 className="font-bold text-lg text-white pb-2">
                Administrador
              </h3>
            </div>

            <ul className="pl-4">
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/admin/barberos"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <FaRegEdit />
                  <p>Barberos</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
            </ul>

            <ul className="pl-4">
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/admin/servicios"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <AiOutlineSetting />
                  <p>Servicios</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
            </ul>
          </>

          {/* Barbero */}
          <>
            <div className="p-4 flex flex-col items-center justify-center sm:py-4">
              <div className="flex justify-center items-center border-[4px] border-[#F0B35B] bg-white rounded-full w-[120px] h-[120px] my-4 mx-auto">
                <Image
                  src="/images/barbero.png"
                  alt="logo-admin"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="font-bold text-lg text-white pb-2">Barbero</h3>
            </div>
            <ul className="pl-4">
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/barbero/agenda"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <FaRegEdit />
                  <p>Agenda</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/barbero/cronograma"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <FaRegCalendarAlt />
                  <p>Cronograma</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/barbero/clientes"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <HiOutlineUsers />
                  <p>Clientes</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
              <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors flex items-center justify-between">
                <Link
                  href="/panel/barbero/servicios"
                  onClick={() => setSidebarOpen(false)}
                  className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
                >
                  <AiOutlineSetting />
                  <p>Servicios</p>
                </Link>
                <RiArrowUpSLine className="text-[#F0B35B] text-4xl sm:hidden" />
              </div>
            </ul>
          </>

          <div className="pl-4 mt-auto py-20 sm:py-4">
            <div className="sm:hover:bg-[#D9D9D9] p-2 px-4 rounded-tl-xl rounded-bl-xl sm:group transition-colors">
              <Link
                href="/"
                className="sm:group-hover:bg-[#F0B35B] p-2 px-4 flex items-center gap-5 justify-start rounded-xl text-[#F0B35B] group-hover:text-white transition-colors fill-current text-xl w-full"
              >
                <RiLogoutBoxLine />
                <p>Salir</p>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
