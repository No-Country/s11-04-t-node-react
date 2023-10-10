import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="relative">
        <div className="flex flex-col items-center justify-center py-4 sm:p-4 gap-2 sm:gap-3 border-t border-[#292D33]">
          <div className="flex items-center gap-6 sm:gap-12">
            <Link href="/">
              <Image
                className="w-6 sm:w-8"
                src="/images/instagram.png"
                alt="instagram"
                width={28}
                height={28}
              />
            </Link>
            <Link href="/">
              <Image
                className="w-6 sm:w-8"
                src="/images/twitter.png"
                alt="twitter"
                width={28}
                height={28}
              />
            </Link>
            <Link href="/">
              <Image
                className="w-6 sm:w-8"
                src="/images/facebook.png"
                alt="facebook"
                width={28}
                height={28}
              />
            </Link>
          </div>
          <div>
            <Image
              className="w-28 sm:w-44"
              src="/images/logo-footer.png"
              alt="logo-footer"
              width={166}
              height={196}
              priority
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
