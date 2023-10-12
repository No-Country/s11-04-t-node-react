'use client'

import iconInfo from '@/public/images/icon-info.svg'
import iconDel from '@/public/images/icon-delete.png'
import Image from 'next/image'
import { createBarber, getBarbers } from './services/barbers.service'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import BarberForm from './components/BarberForm'
import { createPortal } from 'react-dom'
import BarberDetailsModal from './components/BarberDetailsModal'

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

	const [showDetailsModal, setShowDetailsModal] = useState(false)

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
		setShowDetailsModal(true)
	}

	return (
		<div className="relative border rounded-2xl h-full py-5 px-7 bg-[#D9D9D9]">
			<div
				inert={showDetailsModal ? '' : undefined}
				className={showDetailsModal ? 'blur-sm' : ''}
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

				<div className="border rounded-lg">
					<table className="w-full divide-y divide-white bg-white bg-opacity-10">
						<thead>
							<tr className="h-16 border-white">
								<th>Nombre</th>
								<th>Servicios</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white">
							{barbers.map((barber) => {
								return (
									<tr
										className="h-16 even:bg-gray-100"
										key={barber._id}
									>
										<td className="text-center">{barber.fullName}</td>
										<td>
											<div className="flex flex-wrap justify-center gap-3">
												{barber.services.map((service) => {
													return (
														<div
															className="border rounded-lg bg-slate-950 text-slate-200 px-2"
															key={service}
														>
															{service}
														</div>
													)
												})}
											</div>
										</td>
										<td>
											<button onClick={() => handleDetailsClick(barber)}>
												<Image
													width={32}
													src={iconInfo}
													alt="info_icon"
												/>
											</button>
										</td>
										<td>
											<button>
												<Image
													width={28}
													src={iconDel}
													alt="info_icon"
												/>
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
			{showDetailsModal &&
				createPortal(
					<BarberDetailsModal
						onCancel={() => setShowDetailsModal(false)}
						toModifyBarber={toModifyBarber}
						setToModifyBarber={setToModifyBarber}
						barbers={barbers}
						setBarbers={setBarbers}
						servicesList={servicesList}
						setShowDetailsModal={setShowDetailsModal}
						handleCheckboxToggle={handleCheckboxToggle}
					/>,
					document.body
				)}
		</div>
	)
}
