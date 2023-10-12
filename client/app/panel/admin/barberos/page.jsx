'use client'

import iconInfo from '@/public/images/icon-info.svg'
import iconDel from '@/public/images/icon-delete.png'
import Image from 'next/image'
import { createBarber, getBarbers } from './services/barbers.service'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Barbers() {
	// const authUser = useSelector((state) => state.authUser)
	// const token = authUser.value.token

	// const services = useSelector((state) => state.services)

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

	// useEffect(() => {
	// 	const fillBarbers = async () => {
	// 		const barbers = await getBarbers(token)
	// 		setBarbers(barbers)
	// 	}

	// 	fillBarbers()
	// },[])

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

	// const barbers = [
	// 	{
	// 		_id: 1,
	// 		phone: '123456789',
	// 		fullName: 'Carlos Carlitos',
	// 		email: 'carlos@gmail.com',
	// 		services: ['Corte', 'Tintura'],
	// 		rol: 'barber',
	// 	},
	// 	{
	// 		_id: 2,
	// 		phone: '987654321',
	// 		fullName: 'Juan Juancitos',
	// 		email: 'juan@gmail.com',
	// 		services: ['Peinado', 'Alisado'],
	// 		rol: 'barber',
	// 	},
	// 	{
	// 		_id: 3,
	// 		phone: '444333222',
	// 		fullName: 'Jorge Jorgitos',
	// 		email: 'jorge@gmail.com',
	// 		services: ['Barba', 'Corte', 'Tintura'],
	// 		rol: 'barber',
	// 	},
	// ]

	const [newBarber, setNewBarber] = useState({
		fullName: '',
		phone: '',
		email: '',
		services: servicesList.map((service) => {
			return { name: service.name, checked: false }
		}),
	})

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

		console.log(newBarberToCreate)

		resetNewBarber()
	}

	const handleCheckboxToggle = (index) => {
		const newServicesArray = newBarber.services.map((service, i) => {
			return i === index
				? { ...service, checked: !service.checked }
				: { ...service }
		})
		setNewBarber({ ...newBarber, services: newServicesArray })
	}

	return (
		<div className="h-full py-5 px-7 bg-[#D9D9D9]">
			<h2 className="mb-7 text-4xl">Barberos</h2>

			<form onSubmit={submitHandler}>
				<div className="flex flex-col">
					<label
						className="text-xl mb-2"
						htmlFor="barberFullName"
					>
						Nombre
					</label>
					<input
						className="border rounded-lg p-1"
						type="text"
						id="barberFullName"
						name="barberFullName"
						value={newBarber.fullName}
						onChange={(e) => setNewBarber({ ...newBarber, fullName: e.target.value })}
					/>
				</div>

				<div className="flex">
					<div className="flex flex-col w-1/2 mr-10">
						<label
							className="text-xl mt-5 mb-2"
							htmlFor="barberPhone"
						>
							Teléfono
						</label>
						<input
							className="border rounded-lg p-1"
							type="phone"
							id="barberPhone"
							name="barberPhone"
							value={newBarber.phone}
							onChange={(e) => setNewBarber({ ...newBarber, phone: e.target.value })}
						/>
					</div>

					<div className=" flex flex-col w-1/2 mr-auto">
						<label
							className="text-xl mt-5 mb-2"
							htmlFor="barberEmail"
						>
							Email
						</label>
						<input
							className="border rounded-lg p-1"
							type="email"
							id="barberEmail"
							name="barberEmail"
							value={newBarber.email}
							onChange={(e) => setNewBarber({ ...newBarber, email: e.target.value })}
						/>
					</div>
				</div>

				{/* CHECKBOXES */}
				<div className="flex flex-wrap justify-between">
					{servicesList.map((service, index) => {
						return (
							<div key={service._id}>
								<label className="text-xl mr-8">
									<input
										className="mt-10 mr-1 h-5 w-5"
										type="checkbox"
										id={service.name}
										name={service.name}
										checked={newBarber.services[index].checked}
										onChange={() => {
											handleCheckboxToggle(index)
										}}
									/>
									{service.name}
								</label>
							</div>
						)
					})}
				</div>

				<div className="flex justify-end gap-6">
					<button
						className="my-6 border border-black rounded-lg py-1 px-6 bg-[#96B593]"
						type="submit"
					>
						Agregar
					</button>
					<button
						className="my-6 border border-black rounded-lg py-1 px-6 bg-[#BC8F86]"
						type="button"
						onClick={resetNewBarber}
					>
						Cancelar
					</button>
				</div>
			</form>

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
										<div className="flex justify-center gap-3">
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
									<td className="">
										<button className="">
											<Image
												width={32}
												src={iconInfo}
												alt="info_icon"
											/>
										</button>
									</td>
									<td className="">
										<button className="">
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
	)
}
