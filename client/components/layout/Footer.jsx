import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="relative">
        <div className="flex flex-col items-center justify-center p-4 sm:p-12 gap-2 sm:gap-5">
          <div className="flex items-center gap-4">
            <Link href="">
              <img
                className="max-sm:w-6"
                src="/images/instagram.png"
                alt="instagram"
              />
            </Link>
            <Link href="">
              <img
                className="max-sm:w-6"
                src="/images/twitter.png"
                alt="twitter"
              />
            </Link>
            <Link href="">
              <img
                className="max-sm:w-6"
                src="/images/facebook.png"
                alt="facebook"
              />
            </Link>
          </div>
          <div>
            <img
              className="max-sm:h-[120px]"
              src="/images/logo-footer.png"
              alt="logo-footer"
            />
          </div>
        </div>
        <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 -traslate-x-1/2">
          <Link href="">
            <img
              className="max-sm:w-14 md:w-20"
              src="/images/whatssap.png"
              alt="whatssap"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
