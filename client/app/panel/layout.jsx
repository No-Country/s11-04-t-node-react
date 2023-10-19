import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function PanelLayout({ children }) {
  return (
    <>
      <Header fluid />
      <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] sm:gap-6 min-h-screen">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
