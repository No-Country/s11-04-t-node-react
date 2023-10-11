"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaRegEdit, FaRegCalendarAlt, FaRegIdBadge } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import {
  RiHome3Line,
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
      <nav className="flex items-center justify-between text-3xl sm:hidden bg-[#292D33] text-[#B5AF93] py-4 px-11 fixed z-50 bottom-0 w-full border-t border-gray-100/40">
        <Link href="/">
          <RiHome3Line />
        </Link>
        <Link href="/panel/notificaciones">
          <RiNotification3Line />
        </Link>
        <Link href="/panel/mi-cuenta">
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
        <aside className="bg-[#292D33] flex flex-col min-h-screen overflow-auto">
          {/* Administrador */}
          <>
            <div className="p-4 flex flex-col items-center justify-center sm:py-4">
              <div className="flex justify-center items-center border-[4px] border-[#B5AF93] bg-white rounded-full w-[120px] h-[120px] my-4 mx-auto">
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

            <div className="sm:border-y-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/admin/barberos"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <FaRegIdBadge />
                    <p>Barberos</p>
                  </div>
                  <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
                </Link>
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/admin/agenda"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <FaRegEdit />
                    <p>Agenda</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/admin/cronograma"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <FaRegCalendarAlt />
                    <p>Cronograma</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/admin/servicios"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <AiOutlineSetting />
                    <p>Servicios</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>
          </>

          {/* Barbero */}
          {/* <>
            <div className="p-4 flex flex-col items-center justify-center sm:py-4">
              <div className="flex justify-center items-center border-[4px] border-[#B5AF93] bg-white rounded-full w-[120px] h-[120px] my-4 mx-auto">
                <Image
                  src="/images/barbero.png"
                  alt="logo-admin"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <h3 className="font-bold text-lg text-white pb-2">Barbero</h3>
            </div>

            <div className="sm:border-y-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/barbero/clientes"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <HiOutlineUsers />
                    <p>Clientes</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/barbero/agenda"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <FaRegEdit />
                    <p>Agenda</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/barbero/cronograma"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <FaRegCalendarAlt />
                    <p>Cronograma</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>

            <div className="sm:border-b-2 sm:border-black">
              <div className="text-[#B5AF93] sm:bg-[#B5AF93] sm:hover:bg-white py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-black sm:hover:text-[#B5AF93] fill-current">
                <Link
                  href="/panel/barbero/servicios"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-5 justify-between sm:justify-start text-xl w-full"
                >
                  <div className="flex items-center gap-3">
                    <AiOutlineSetting />
                    <p>Servicios</p>
                  </div>
                </Link>
                <RiArrowUpSLine className="text-[#B5AF93] text-4xl sm:hidden" />
              </div>
            </div>
          </> */}

          <div className="mt-auto pb-20 sm:pb-4">
            <div className="py-4 px-6 sm:px-12 transition-colors flex items-center justify-between sm:text-white fill-current">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-5 justify-between sm:justify-center text-xl sm:text-2xl w-full max-sm:text-[#B5AF93]"
              >
                <div className="flex sm:flex-col items-center gap-3">
                  <FaPowerOff className="text-[#C13636DB] sm:text-5xl" />
                  <p>Salir</p>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
