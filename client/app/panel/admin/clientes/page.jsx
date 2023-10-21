"use client";

import { useState, useEffect } from "react";
import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";
import HistoryModal from "./components/HistoryModal";
import ClientsModal from "./components/ClientsModal";
import CreateClient from "./components/CreateClient";
import { getClients } from "./services/clients.service.js";

export default function page() {
  const [showHistory, setShowHistory] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [createClient, setCreateClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user"));
    setToken(userToken);

    const getAllClients = async () => {
      const data = await getClients(token);
      console.log("data", data);
      //if (!data.success) {
      //displayNotification('error', data.msg, 5000)
      // if (data.tokenExpired) router.push('/acceso')
      // return
      //}
      const clientsInfo = data.clients;
      setClients(clientsInfo);
      //displayNotification('success', data.msg, 3000)
    };

    getAllClients;
    // eslint-disable-next-line react-hooks/exhaustive-deps

  console.log(clients);
    
  }, []);
  return (
    <div className="h-[80vh] sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl py-5 px-7 bg-[#D9D9D9]">
      <CreateClient
        createClient={createClient}
        setCreateClient={setCreateClient}
      />
      <ClientsHeader
        createClient={createClient}
        setCreateClient={setCreateClient}
      />
      <ClientsTable
        clients={clients}
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
