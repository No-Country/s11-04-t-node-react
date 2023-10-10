import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="bg-[#292D33] min-h-screen text-white">
      {/* Emilio */}
      <p>Soy el formulario del Login</p>
      <h1>BarberBuddy</h1>
      <p>Email</p>
      <p>Password</p>
      <Link href="/panel" className="bg-[#B5AF93]">
        Ingresar
      </Link>
    </div>
  );
}
