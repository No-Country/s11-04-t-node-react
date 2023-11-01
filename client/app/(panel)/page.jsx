"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PanelPage() {
  // const user = useSelector((s) => s.user.value)
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return;
  }

  return (
    <div className="sm:py-0.5">
      <div className="flex flex-col items-center justify-center bg-[#D9D9D9] p-8 text-center min-h-screen rounded-t-2xl">
        <div className="flex flex-col items-center justify-center sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-sans">
            Bienvenido {user.fullName} a
          </h1>
          <div className="flex items-end flex-col pt-5 pb-6">
            <Image
              src="/images/BarberBuddyTextLogo.svg"
              alt="text_logo"
              width="0"
              height="0"
              className="w-[208px] h-auto"
              priority
            />
            <Image
              src="/images/mostacheLogo.svg"
              alt="icon_logo"
              width="0"
              height="0"
              className="w-[59px] h-auto"
              priority
            />
          </div>
        </div>
        <h3 className="pb-10">Que desea realizar?</h3>
        <div className="w-full -m-2">
          <div className="flex flex-wrap [&>*]:w-full sm:[&>*]:w-1/4 [&>*]:p-2 justify-center">
            <div>
              <Link
                href="/admin/clientes"
                className="py-2 bg-[#B5AF93] rounded-md border border-black block"
              >
                Clientes
              </Link>
            </div>
            <div>
              <Link
                href="/admin/agenda"
                className="py-2 bg-[#B5AF93] rounded-md border border-black block"
              >
                Agenda
              </Link>
            </div>
            <DynamicRoleLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

const DynamicRoleLinks = dynamic(() => Promise.resolve(RoleLinks), {
  ssr: false,
});

const RoleLinks = () => {
  const user = useSelector((s) => s.user.value);

  return (
    <>
      {user.role === "admin" && (
        <>
          <div>
            <Link
              href="/admin/barberos"
              className="py-2 bg-[#B5AF93] rounded-md border border-black block"
            >
              Barberos
            </Link>
          </div>
          <div>
            <Link
              href="/admin/servicios"
              className="py-2 bg-[#B5AF93] rounded-md border border-black block"
            >
              Servicios
            </Link>
          </div>
        </>
      )}
    </>
  );
};
