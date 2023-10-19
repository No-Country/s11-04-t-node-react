"use client";

import { useState } from "react";
import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";
import HistoryModal from "./components/HistoryModal";
import ClientsModal from "./components/ClientsModal";

export default function page() {
  const [showHistory, setShowHistory] = useState(false);
  const [showClient, setShowClient] = useState(false);
  return (
    <div className="h-[80vh] sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl py-5 px-7 bg-[#D9D9D9]">
      <ClientsHeader />
      <ClientsTable
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        showClient={showClient}
        setShowClient={setShowClient}
      />
      <HistoryModal showHistory={showHistory} setShowHistory={setShowHistory} />
      <ClientsModal showClient={showClient} setShowClient={setShowClient} />
    </div>
  );
}
