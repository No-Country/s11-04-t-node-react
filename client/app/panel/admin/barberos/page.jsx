'use client'

import iconInfo from '@/public/images/icon-info.svg'
import iconDel from '@/public/images/icon-delete.png'
import {
	createBarber,
	deleteBarber,
	getBarbers,
} from './services/barbers.service'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import BarberForm from './components/BarberForm'
import { createPortal } from 'react-dom'
import { BarbersModal } from './components/BarbersModal'
import { DeleteBarber } from './components/DeleteBarber'
import { BarbersTable } from './components/BarbersTable'

export default function Barbers() {
	// const authUser = useSelector((state) => state.authUser)
	// const token = authUser.value.token

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

	useEffect(() => {
		const fillBarbers = async () => {
			const barbers = await getBarbers()
			setBarbers(barbers)
		}

		// OBTENER LISTA DE SERVICIOS DEL STORE CUANDO ESTÉ LISTO
		const fillServicesAndNewBarber = async () => {
			const response = await fetch(
				'https://barberbuddy.vercel.app/api/v1/services/get-services',
				{
					method: 'GET',
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYXJiZXJJZCI6IjY1Mjk2YjkzZmU3ZGM0YWI4MGFiZWZlNSIsImlhdCI6MTY5NzIxNDg1OSwiZXhwIjoxNjk5ODA2ODU5fQ.GP6BhKRsRzSWLCTX7BcLU-UP46DSy44Wz2hpE6LYG5M',
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
	}, [])

	const resetNewBarber = () => {
		setNewBarber({
			fullName: '',
			phone: '',
			email: '',
			services: servicesList,
		})
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		const selectedServices = newBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service._id)
		const newBarberToCreate = { ...newBarber, services: selectedServices }
		const createdBarber = await createBarber(newBarberToCreate)

		setBarbers(barbers.concat(createdBarber))
		resetNewBarber()
	}

	const onSave = async (e) => {
		e.preventDefault()
		const selectedServices = toModifyBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service._id)
		const barberToModify = { ...toModifyBarber, services: selectedServices }

		// const modifiedBarber = await updateBarber(barberToModify)

		// REEMPLAZAR REGISTRO CON modifiedBarber DEVUELTO POR SERVER

		setBarbers(
			barbers.map((barber) => {
				return barber._id === barberToModify._id ? barberToModify : barber
			})
		)
		setShowModal(false)
	}

	const onDelete = async () => {
		// await deleteBarber(toDeleteBarber._id)
		setBarbers(
			barbers.filter((barber) => barber._id !== toDeleteBarber._id && barber)
		)
		setShowModal(false)
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
				name: service.name,
				checked: barber.services.includes(service.name),
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
		<div className="relative border rounded-2xl h-full py-5 px-7 bg-[#D9D9D9]">
			<div
				inert={showModal ? '' : undefined}
				className={showModal ? 'blur-sm' : ''}
			>
				<h2 className="mb-7 text-4xl">Barberos</h2>

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
