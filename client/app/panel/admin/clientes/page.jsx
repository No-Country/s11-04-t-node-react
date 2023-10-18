import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";

export default function page() {
  return (
    <div className="h-[80vh] sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl py-5 px-7 bg-[#D9D9D9]">
      <ClientsHeader/>
      <ClientsTable/>
    </div>
  );
}
