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

	// useEffect(() => {
	// 	const fillBarbers = async () => {
	// 		const barbers = await getBarbers(token)
	// 		setBarbers(barbers)
	// 	}

	// 	fillBarbers()
	// },[])

	const [barbers, setBarbers] = useState([
		{
			_id: 1,
			phone: '123456789',
			fullName: 'Carlos Carlitos',
			email: 'carlos@gmail.com',
			services: ['Corte', 'Tintura'],
			rol: 'barber',
		},
		{
			_id: 2,
			phone: '987654321',
			fullName: 'Juan Juancitos',
			email: 'juan@gmail.com',
			services: ['Peinado', 'Alisado'],
			rol: 'barber',
		},
		{
			_id: 3,
			phone: '444333222',
			fullName: 'Jorge Jorgitos',
			email: 'jorge@gmail.com',
			services: ['Barba', 'Corte', 'Tintura'],
			rol: 'barber',
		},
	])

	const servicesList = [
		{
			_id: 111,
			name: 'Corte',
			price: 123,
		},
		{
			_id: 222,
			name: 'Barba',
			price: 123,
		},
		{
			_id: 333,
			name: 'Tintura',
			price: 123,
		},
		{
			_id: 444,
			name: 'Peinado',
			price: 123,
		},
		{
			_id: 555,
			name: 'Alisado',
			price: 123,
		},
	]

	const [newBarber, setNewBarber] = useState({
		fullName: '',
		phone: '',
		email: '',
		services: servicesList.map((service) => {
			return { name: service.name, checked: false }
		}),
	})
	const [toModifyBarber, setToModifyBarber] = useState({})
	const [toDeleteBarber, setToDeleteBarber] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [modifyModal, setModifyModal] = useState(false)

	const resetNewBarber = () => {
		setNewBarber({
			fullName: '',
			phone: '',
			email: '',
			services: servicesList.map((service) => {
				return { name: service.name, checked: false }
			}),
		})
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		const selectedServices = newBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service.name)
		const newBarberToCreate = { ...newBarber, services: selectedServices }
		// const createdBarber = await createBarber(newBarberToCreate)

		// REEMPLAZAR REGISTRO CONCATENADO CON createdBarber DEVUELTO POR SERVER
		setBarbers(
			barbers.concat({
				...newBarberToCreate,
				rol: 'barber',
				_id: Math.floor(Math.random() * 1000),
			})
		)
		resetNewBarber()
	}

	const onSave = async (e) => {
		e.preventDefault()
		const selectedServices = toModifyBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service.name)
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
