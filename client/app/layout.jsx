import { Header } from "@/components/Header.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { poppins } from "../fonts/font.js";
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
