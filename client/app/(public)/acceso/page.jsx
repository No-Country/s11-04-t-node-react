import { Login } from "@/components/login/Login";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div>
      <h1>Soy el Acceso</h1>
      <Link href="/panel">Ingresar</Link>
      <Login />
    </div>
  );
}
