import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Banner = () => {
  return (
    <div className="relative inline-block text-center w-full">
      <Image
        src="/images/banner.png"
        alt="banner"
        width="0"
        height="0"
        sizes="100vw"
        priority
        className="object-cover h-[360px] sm:h-[700px] w-full"
      />
      <div className="absolute text-white max-sm:w-[300px] top-10 sm:top-1/3 left-1/2 -translate-x-1/2">
        <h1 className="text-2xl sm:text-4xl font-bold pb-6 sm:leading-[50px]">
          EL ESTILO ES UN REFLEJO DE TU ACTITUD Y TU PERSONALIDAD
        </h1>
        <p className="text-xl sm:text-2xl pb-20 sm:pb-7">
          Horario de funcionamento: 09:00 a 18:00
        </p>
        <Link
          href="/acceso"
          className="py-2 px-12 bg-[#000000] hover:bg-transparent border hover:border hover:border-[#000000] hover:text-white rounded-md text-black transition-colors"
        >
          Agendar horário
        </Link>
      </div>
    </div>
  );
};
