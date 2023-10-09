import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function PanelLayout({ children }) {
  return (
    <>
      <Header fluid />
      <div className="grid sm:grid-cols-[250px_1fr]">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
