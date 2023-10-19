import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Whatssap = () => {
  return (
    <Link
      href="/"
      className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 -traslate-x-1/2 cursor-pointer z-10"
    >
      <Image
        className="max-sm:w-14 md:w-16"
        src="/images/whatssap.png"
        alt="whatssap"
        width={87}
        height={87}
      />
    </Link>
  );
};
