import { Providers } from "@/redux/provider.jsx";
import { Toaster } from "./Toaster.jsx";
import { poppins } from "@/fonts/font.js";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} font-sans`}>
      <body className="flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
