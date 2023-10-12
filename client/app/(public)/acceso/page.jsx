import Link from "next/link";
import React from "react";
import LoginForm from "./loginComponents/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[#292D33] w-full min-h-screen text-white grid content-center justify-center">
      {/* Emilio */}
      <section className="w-full max-w-md p-5">
        <article className="relative">
          <h1 className="text-[64px] h-[147px] text-center">BarberBuddy</h1>
          <div className="absolute top-14 right-10">
            <img className="h-[85px]" src="/images/logo.png" alt="logo" />
          </div>
        </article>

        <LoginForm />
      </section>
    </div>
  );
}
