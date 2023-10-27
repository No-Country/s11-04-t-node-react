'use client'

import { useState, useEffect } from 'react'
import ClientsHeader from './components/ClientsHeader'
import ClientsTable from './components/ClientsTable'
import HistoryModal from './components/HistoryModal'
import CreateClient from './components/CreateClient'
import {
	getClients,
	createNewClient,
	deleteClient,
	updateClient,
	getAppointments,
} from './services/client.services.js'

export default function page() {
	const [notification, setNotification] = useState({
		messageType: 'success',
		message: '',
	})
	const [searchClient, setSearchClient] = useState('')
	const [showHistory, setShowHistory] = useState(false)
	const [showClient, setShowClient] = useState(false)
	const [createClient, setCreateClient] = useState(false)
	const [clients, setClients] = useState([])
	const [clientId, setClientId] = useState({})
	const [newClient, setNewClient] = useState({
		fullName: '',
		phone: '',
		email: '',
	})
	const [clientToUpdate, setClientToUpdate] = useState({})
	const [selectedClientForUpdate, setSelectedClientForUpdate] = useState()
	const [selectClientForDel, setSelectClientForDel] = useState()
	const [clientServices, setClientServices] = useState({})
	const [clientAppointmentId, setClientAppointmentId] = useState('')
	const [notifications, setNotificatons] = useState({
		successNotification: 'Cliente creado correctamente',
		errorNotification: 'Error al crear cliente',
	})
	const [message, setMessage] = useState()
	const [token, setToken] = useState('')

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (!user) {
			router.push('/login')
			return
		}

		const { token } = user
		setToken(token)

		const getAllClients = async () => {
			const data = await getClients(token)
			if (!data.success) {
				displayNotification('error', data.msg, 5000)
				if (data.tokenExpired) router.push('/login')
				return
			}
			const allClients = data.clients
			setClients(allClients)
			displayNotification('success', data.msg, 3000)
		}

		getAllClients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createClient, selectClientForDel, selectedClientForUpdate])

	const submitHandler = async (e) => {
		e.preventDefault()
		const newClientToCreate = { ...newClient }
		const data = await createNewClient(token, newClientToCreate)
		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			if (data.tokenExpired) router.push('/login')
			return
		}

		const createdClient = data
		setClients(createdClient)

		displayNotification('success', createdClient.msg, 3000)
		resetCreateClient()
		setCreateClient(false)
	}

	const resetCreateClient = () => {
		setNewClient({
			fullName: '',
			phone: '',
			email: '',
		})
	}

	const manageNotifications = () => {
		clients.success
			? setMessage(notifications.successNotification)
			: setMessage(notifications.errorNotification)
	}

	const deleteSelectedClient = async () => {
		const selectedClienteForDelete = clientId._id
		const data = await deleteClient(token, selectedClienteForDelete)
		setShowClient(false)
		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			if (data.tokenExpired) router.push('/login')
			return
		}
		setSelectClientForDel(selectedClienteForDelete)
		displayNotification('success', data.msg, 3000)
		return
	}

	const showClientHandler = (id) => {
		setShowClient(true)
		const findClient = clients.find((client) => client._id === id)
		setClientId(findClient)
		console.log('Showing client with ID:', clientId)
	}

	const updateClientHandler = async () => {
		try {
			const selectClientForUpdate = clientId._id
			const data = await updateClient(token, selectClientForUpdate, clientToUpdate)

			setSelectedClientForUpdate(selectClientForUpdate)
			setShowClient(false)

			if (!data.success) {
				displayNotification('error', data.msg, 5000)
				if (data.tokenExpired) router.push('/login')
				return
			}
			displayNotification('success', data.msg, 3000)
		} catch (error) {
			console.error('Error en updateClientHandler:', error)
		}
	}

	const showAppointments = async () => {
		try {
			const clientIdForAppointment = clientAppointmentId
			const data = await getAppointments(token, clientIdForAppointment)

			if (!data.success) {
				displayNotification('error', data.msg, 5000)
				if (data.tokenExpired) router.push('/login')
				setClientServices([])
				return
			}

			const appointments = data.appointments
			setClientServices(appointments)
		} catch (error) {
			console.error('Error en showAppointments:', error)
			setClientServices([])
		}
	}

	const displayNotification = (messageType, message, time) => {
		setNotification({ messageType: messageType, message: message })
		setTimeout(() => {
			setNotification({ message: '' })
		}, time)
	}

	return (
		<div className="py-10 max-h-screen h-screen sm:h-screen overflow-y-scroll overflow-hidden relative border rounded-2xl px-7 bg-[#D9D9D9] scroll-smooth">
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
				setSearchClient={setSearchClient}
			/>
			<ClientsTable
				clients={clients}
				showHistory={showHistory}
				searchClient={searchClient}
				setShowHistory={setShowHistory}
				showClient={showClient}
				setShowClient={setShowClient}
				deleteSelectedClient={deleteSelectedClient}
				clientId={clientId}
				showClientHandler={showClientHandler}
				clientToUpdate={clientToUpdate}
				setClientToUpdate={setClientToUpdate}
				updateClientHandler={updateClientHandler}
				showAppointments={showAppointments}
				clientServices={clientServices}
				setClientAppointmentId={setClientAppointmentId}
				clientAppointmentId={clientAppointmentId}
				notification={notification}
				setClientId={setClientId}
			/>
			<HistoryModal
				showHistory={showHistory}
				setShowHistory={setShowHistory}
				showAppointments={showAppointments}
				clientAppointmentId={clientAppointmentId}
				clientServices={clientServices}
				allClients={clients}
			/>
		</div>
	)
}
