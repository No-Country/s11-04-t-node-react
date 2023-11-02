'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'
import SelectHour from './SelectHour'

const FormAgenda = () => {
	const router = useRouter()
	const {
		formDataAppointmentScheduling,
		setFormDataAppointmentScheduling,
		handleChange,
		flagEdit,
	} = useAppointmentSchedulingContext()

	const [services, setServices] = useState([])

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (!user) {
			router.push('/')
			return
		}
		const { token, _id, role } = user

		const getServices = async () => {
			try {
				let url = ''

				if (role === 'barber') {
					url = 'https://barberbuddy.fly.dev/api/v1/barber/get-me'
				} else {
					url = 'https://barberbuddy.fly.dev/api/v1/barber/get-barber'
				}

				const { data } = await axios(`${url}/${_id}`, {
					headers: {
						Authorization: `bearer ${token}`,
					},
				})
				setServices(data?.barber.services)
			} catch (error) {
				console.log(error)
			}
		}
		getServices()
	}, [])

	const handleCheckboxToggle = (serviceId) => {
		// Comprobamos si el servicio ya está en el array de servicios seleccionados

		let updatedLocalServices = [...formDataAppointmentScheduling.services] // Clonamos el array de servicios locales
		if (updatedLocalServices.includes(serviceId)) {
			// Si el servicio ya está seleccionado, lo eliminamos
			updatedLocalServices = updatedLocalServices.filter((id) => id !== serviceId)
		} else {
			// Si el servicio no está seleccionado, lo agregamos
			updatedLocalServices.push(serviceId)
		}

		setFormDataAppointmentScheduling({
			...formDataAppointmentScheduling,
			services: updatedLocalServices,
		})
	}

	return (
		<div className="w-full flex flex-col flex-wrap gap-y-8 p-6">
			<div className="flex flex-col md:flex-row items-center">
				<div>
					<label className="font-thin text-stone-700 text-sm">
						Elija un horario de inicio
					</label>
					<SelectHour
						hourSelected={formDataAppointmentScheduling?.startTime}
						horario={'de inicio'}
						param={'startTime'}
					/>
				</div>
				<div>
					<label className="font-thin text-stone-700 text-sm">
						Elija un horario de final
					</label>
					<SelectHour
						hourSelected={formDataAppointmentScheduling?.endTime}
						horario={'de fin'}
						param={'endTime'}
					/>
				</div>
			</div>
			<div className={`${flagEdit ? '' : 'hidden'}`}>
				<input
					type="date"
					name="name"
					onChange={handleChange}
					value={`${formDataAppointmentScheduling?.date.split('-')[2]}-${
						formDataAppointmentScheduling?.date.split('-')[1]
					}-${formDataAppointmentScheduling?.date.split('-')[0]}`}
				/>
			</div>
			<div className="flex flex-col gap-y-2">
				<label className="font-thin text-stone-700 text-sm">
					Elija el/los servicio/s que brindará al cliente:
				</label>
				<div className="flex items-center flex-wrap gap-x-6">
					{services &&
						services.map((service, index) => {
							return (
								<div
									key={service._id}
									className="flex items-center gap-x-1"
								>
									<label>{service.name}</label>
									<input
										className="bg-yellow-600"
										type="checkbox"
										id={service._id}
										name={service.name}
										checked={formDataAppointmentScheduling.services.includes(service._id)}
										onChange={() => {
											handleCheckboxToggle(service._id)
										}}
									/>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}
export default FormAgenda
