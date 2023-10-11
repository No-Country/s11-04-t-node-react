'use client'
import { poppins } from "../fonts/font.js";
import "./globals.css";
import { store } from "@/redux/store.js";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
