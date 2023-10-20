"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PanelPage() {
  const user = useSelector((s) => s.user.value);

  return (
    <div className="sm:py-0.5">
      <div className="flex flex-col items-center justify-center bg-[#D9D9D9] p-8 text-center min-h-screen rounded-t-2xl">
        <div className="flex flex-col items-center justify-center sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-sans">
            Bienvenido {user.fullName} a
          </h1>
          <div className="flex items-end flex-col pt-5 pb-6">
            <Image
              src="/images/logo-app-black.png"
              alt="logo"
              width={260}
              height={103}
              priority
              className="w-52"
            />
            <Image src="/images/vigote.png" alt="logo" width={59} height={19} />
          </div>
        </div>
        <h3 className="pb-10">Que desea realizar?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Link
            href="/panel/admin/servicios"
            className="py-2 px-12 bg-[#B5AF93] rounded-md border border-black"
          >
            Servicios
          </Link>
          <Link
            href="/panel/admin/barberos"
            className="py-2 px-12 bg-[#B5AF93] rounded-md border border-black"
          >
            Barberos
          </Link>
          <Link
            href="/panel/admin/clientes"
            className="py-2 px-12 bg-[#B5AF93] rounded-md border border-black"
          >
            Clientes
          </Link>
          <Link
            href="/panel/admin/agenda"
            className="py-2 px-12 bg-[#B5AF93] rounded-md border border-black"
          >
            Agenda
          </Link>
        </div>
      </div>
    </div>
  );
}
