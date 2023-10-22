"use client";

import { useState, useEffect } from "react";
import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";
import HistoryModal from "./components/HistoryModal";
import ClientsModal from "./components/ClientsModal";
import CreateClient from "./components/CreateClient";
import { getClients } from "./services/client.services.js";
import { createNewClient } from "./services/client.services.js";

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
  const [notifications, setNotificatons] = useState({
    successNotification: "Cliente creado correctamente",
    errorNotification: "Error al crear cliente"
  })
  const [message, setMessage] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (!user) {
			router.push('/')
			return
		}

		const { token } = user
		setToken(token)

		const getAllClients = async () => {
			const data = await getClients(token)
			if (!data.success) {
				console.log('error', data.msg, 5000)
				if (data.tokenExpired) router.push('/acceso')
				return
			}
			const allClients = data.clients
			setClients(allClients)
			console.log('success', data.msg, 3000)
      console.log(clients);
		}

		getAllClients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    const newClientToCreate = { ...newClient}
		const data = await createNewClient(token, newClientToCreate)
    if (!data.success) {
			console.log('error', data.msg, 5000)
			if (data.tokenExpired) router.push('/acceso')
			return
		}

		const createdClient = data
    console.log(createdClient);
		setClients(createdClient)

		console.log('success', data.msg, 3000)
  }

  const manageNotifications = () => {
    clients.success ? (setMessage(notifications.successNotification)) : (setMessage(notifications.errorNotification)) 
  }
  
  return (
    <div className="h-[80vh] sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl py-5 px-7 bg-[#D9D9D9]">
      <CreateClient
        createClient={createClient}
        setCreateClient={setCreateClient}
        newClient={newClient}
        setNewClient={setNewClient}
        submitHandler={submitHandler}
        clients={clients}
        manageNotifications={manageNotifications}
        notifications={notifications}
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
