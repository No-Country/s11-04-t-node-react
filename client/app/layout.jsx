import { poppins } from "../fonts/font.js";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
