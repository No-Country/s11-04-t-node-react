'use client'

import iconInfo from '@/public/images/icon-info.svg'
import iconDel from '@/public/images/icon-delete.png'
import {
	createBarber,
	deleteBarber,
	getBarbers,
	updateBarber,
} from './services/barbers.service'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import BarberForm from './components/BarberForm'
import { createPortal } from 'react-dom'
import { BarbersModal } from './components/BarbersModal'
import { DeleteBarber } from './components/DeleteBarber'
import { BarbersTable } from './components/BarbersTable'
import { Notification } from './components/Notification'

export default function Barbers() {
	// const services = useSelector((state) => state.services)

	const [barbers, setBarbers] = useState([])
	const [servicesList, setServicesList] = useState([])
	const [newBarber, setNewBarber] = useState({
		fullName: '',
		phone: '',
		email: '',
		services: [],
	})
	const [toModifyBarber, setToModifyBarber] = useState({})
	const [toDeleteBarber, setToDeleteBarber] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [modifyModal, setModifyModal] = useState(false)
	const [notification, setNotification] = useState({
		messageType: 'success',
		message: '',
	})

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		const { fullName, token, rol } = user

		const fillBarbers = async () => {
			const data = await getBarbers(token)
			if (!data.success) {
				displayNotification('error', data.msg, 5000)
				return
			}
			const barbers = data.barbers
			setBarbers(barbers)
			displayNotification('success', data.msg, 3000)
		}

		// OBTENER LISTA DE SERVICIOS DEL STORE CUANDO ESTÉ LISTO
		const fillServicesAndNewBarber = async () => {
			const response = await fetch(
				'https://barberbuddy.fly.dev/api/v1/services/get-services',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const data = await response.json()
			const servicesFromServer = data.services
			const services = servicesFromServer.map((service) => {
				return { _id: service._id, name: service.name, checked: false }
			})
			setServicesList(services)
			setNewBarber(() => {
				return {
					fullName: '',
					phone: '',
					email: '',
					services: services,
				}
			})
		}

		fillBarbers()
		fillServicesAndNewBarber()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const resetNewBarber = () => {
		setNewBarber({
			fullName: '',
			phone: '',
			email: '',
			services: servicesList,
		})
	}

	const populateServicesData = (barber) => {
		const populatedServices = []

		for (let i = 0; i < barber.services.length; i++) {
			const serviceData = servicesList.filter((s) => s._id === barber.services[i])
			populatedServices.push(serviceData[0])
		}

		return {
			...barber,
			services: populatedServices,
		}
	}

	const displayNotification = (messageType, message, time) => {
		setNotification({ messageType: messageType, message: message })
		setTimeout(() => {
			setNotification({ message: '' })
		}, time)
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		const selectedServices = newBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service._id)
		const newBarberToCreate = { ...newBarber, services: selectedServices }
		const data = await createBarber(token, newBarberToCreate)

		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			return
		}

		const createdBarber = data.barber

		const createdBarberPopulatedServices = populateServicesData(createdBarber)

		setBarbers(barbers.concat(createdBarberPopulatedServices))
		resetNewBarber()

		displayNotification('success', data.msg, 3000)
	}

	const onSave = async (e) => {
		e.preventDefault()
		const selectedServices = toModifyBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service._id)
		const barberToModify = { ...toModifyBarber, services: selectedServices }

		// const modifiedBarber = await updateBarber(barberToModify)
		const data = await updateBarber(token, barberToModify)

		setShowModal(false)

		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			return
		}

		// REEMPLAZAR REGISTRO CON modifiedBarber DEVUELTO POR SERVER

		const modifiedBarberPopServ = populateServicesData(barberToModify)

		setBarbers(
			barbers.map((barber) => {
				return barber._id === modifiedBarberPopServ._id
					? modifiedBarberPopServ
					: barber
			})
		)

		displayNotification('success', data.msg, 3000)
	}

	const onDelete = async () => {
		const data = await deleteBarber(token, toDeleteBarber._id)
		setShowModal(false)

		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			return
		}
		setBarbers(
			barbers.filter((barber) => barber._id !== toDeleteBarber._id && barber)
		)

		displayNotification('success', data.msg, 3000)
	}

	const handleCheckboxToggle = (action, barber, index) => {
		const newServicesArray = barber.services.map((service, i) => {
			return i === index
				? { ...service, checked: !service.checked }
				: { ...service }
		})
		action === 'create'
			? setNewBarber({ ...barber, services: newServicesArray })
			: setToModifyBarber({ ...barber, services: newServicesArray })
	}

	const handleDetailsClick = (barber) => {
		const servicesChecked = servicesList.map((service) => {
			return {
				_id: service._id,
				name: service.name,
				checked: barber.services.some((s) => s._id === service._id),
			}
		})
		setToModifyBarber({ ...barber, services: servicesChecked })
		setModifyModal(true)
		setShowModal(true)
	}

	const handleDeleteClick = (barber) => {
		setToDeleteBarber(barber)
		setModifyModal(false)
		setShowModal(true)
	}

	return (
		<div className="h-[80vh] sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl py-5 px-7 bg-[#D9D9D9]">
			<div
				inert={showModal ? '' : undefined}
				className={showModal ? 'blur-sm' : ''}
			>
				<h2 className="text-3xl sm:text-4xl">Barberos</h2>

				<Notification notification={notification} />

				<BarberForm
					submitHandler={submitHandler}
					barber={newBarber}
					setBarber={setNewBarber}
					onClickCancel={resetNewBarber}
					servicesList={servicesList}
					handleCheckboxToggle={handleCheckboxToggle}
					confirmButtonTag="Agregar"
					action="create"
				/>

				<BarbersTable
					barbers={barbers}
					iconInfo={iconInfo}
					handleDetailsClick={handleDetailsClick}
					iconDel={iconDel}
					handleDeleteClick={handleDeleteClick}
				/>
			</div>
			{showModal &&
				createPortal(
					<>
						<BarbersModal>
							{modifyModal ? (
								<BarberForm
									submitHandler={onSave}
									barber={toModifyBarber}
									setBarber={setToModifyBarber}
									onClickCancel={() => setShowModal(false)}
									servicesList={servicesList}
									handleCheckboxToggle={handleCheckboxToggle}
									confirmButtonTag="Guardar"
									action="modify"
								/>
							) : (
								<DeleteBarber
									barber={toDeleteBarber}
									onClickCancel={() => setShowModal(false)}
									onClickDelete={onDelete}
								/>
							)}
						</BarbersModal>
					</>,
					document.body
				)}
		</div>
	)
}
