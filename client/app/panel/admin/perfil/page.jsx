'use client'

import avatarPlaceholder from '@/public/images/barber_avatar.jpeg'
import { useEffect, useState } from 'react'
import BarberForm from '../barberos/components/BarberForm'
import { getBarber, updateBarber } from '../barberos/services/barbers.service'
import { Notification } from '../barberos/components/Notification'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Profile = () => {
	const [barber, setBarber] = useState({
		fullName: '',
		phone: '',
		email: '',
		services: [],
	})
	const [servicesList, setServicesList] = useState([])
	const [notification, setNotification] = useState({
		messageType: 'success',
		message: '',
	})
	const [disabled, setDisabled] = useState(true)
	const [user, setUser] = useState()

	const router = useRouter()

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (!user) {
			router.push('/')
			return
		}

		setUser(user)

		// OBTENER LISTA DE SERVICIOS DEL STORE CUANDO ESTÉ LISTO
		const fillServicesAndBarber = async () => {
			const response = await fetch(
				'https://barberbuddy.fly.dev/api/v1/services/get-services',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			)
			const servicesData = await response.json()
			if (!servicesData.success) {
				displayNotification('error', servicesData.msg, 5000)
				if (servicesData.tokenExpired) router.push('/acceso')
				return
			}
			const servicesFromServer = servicesData.services
			const services = servicesFromServer.map((service) => {
				return { _id: service._id, name: service.name, checked: false }
			})

			const barberData = await getBarber(user.token, user._id, user.role)
			if (!barberData.success) {
				displayNotification('error', barberData.msg, 5000)
				if (barberData.tokenExpired) router.push('/acceso')
				return
			}
			const barber = barberData.barber

			const servicesChecked = services.map((service) => {
				return {
					_id: service._id,
					name: service.name,
					checked: barber.services.some((s) => s === service._id),
				}
			})

			setServicesList(services)
			setBarber({ ...barber, services: servicesChecked })

			displayNotification('success', barberData.msg, 3000)
		}

		fillServicesAndBarber()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const displayNotification = (messageType, message, time) => {
		setNotification({ messageType: messageType, message: message })
		setTimeout(() => {
			setNotification({ message: '' })
		}, time)
	}

	const handleCheckboxToggle = (barber, index) => {
		const newServicesArray = barber.services.map((service, i) => {
			return i === index
				? { ...service, checked: !service.checked }
				: { ...service }
		})
		setBarber({ ...barber, services: newServicesArray })
	}

	const onSave = async (e) => {
		e.preventDefault()
		const selectedServices = barber.services
			.filter((service) => service.checked && service)
			.map((service) => service._id)
		const barberToModify = { ...barber, services: selectedServices }

		// const modifiedBarber = await updateBarber(barberToModify)
		const data = await updateBarber(user.token, barberToModify, user.role)

		window.scrollTo(0, 0)

		if (!data.success) {
			displayNotification('error', data.msg, 5000)
			if (data.tokenExpired) router.push('/acceso')
			return
		}
		setDisabled(true)
		displayNotification('success', data.msg, 3000)
	}

	const editClickHandle = () => {
		setDisabled(false)
	}

	if (!user) {
		// router.push('/')
		return
	}

	return (
		<div className="py-28 sm:h-screen overflow-hidden overflow-y-scroll relative border rounded-2xl px-7 bg-[#D9D9D9]">
			<h2 className="text-3xl sm:text-4xl">Mi Perfil</h2>
			<Notification notification={notification} />
			<Image
				width={64}
				height={64}
				src={user.avatar ? user.avatar : avatarPlaceholder}
				alt="profile"
				className="border rounded-full mb-4"
			/>
			<BarberForm
				submitHandler={onSave}
				barber={barber}
				setBarber={setBarber}
				onClickCancel={() => {
					setDisabled(true)
				}}
				servicesList={servicesList}
				handleCheckboxToggle={handleCheckboxToggle}
				confirmButtonTag="Guardar"
				disabled={disabled}
			/>
			<div className="flex justify-center">
				<button
					className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-56 bg-[#BC8F86] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
					onClick={editClickHandle}
					disabled={!disabled}
				>
					Modificar
				</button>
			</div>
		</div>
	)
}
export default Profile
