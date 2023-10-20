'use client'
import { backend } from '@/utils/backend'
// import AWN from 'awesome-notifications'
import 'awesome-notifications/dist/style.css'
import { useState } from 'react'
import Input from './Input'
import PopUp from './PopUp'

const LoginForm = () => {
	const [loginData, setLoginData] = useState({
		email: '',
	})
	const [OTPCode, setOTPCode] = useState()
	const [inputError, setInputError] = useState()
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	// const notifier = new AWN()

	const hanldeChangeInput = (e) => {
		setInputError()
		const { name, value } = e.target
		setLoginData({ ...loginData, [name]: value })
	}

	const validateType = (email) => {
		const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
		return validEmail.test(email)
	}

	const handleRequestCode = async (e) => {
		e.preventDefault()

		if (!validateType(loginData.email)) {
			setInputError('el email ingresado no es valido')
			setLoginData({ email: '' })
			return
		}

		// ----

		try {
			const res = await backend.post(`login/`, loginData)
			setOTPCode(res.data.token)
			setIsPopupOpen(true)
			setLoginData({ email: '' })
		} catch (error) {
			// notifier.alert(error.response.data.msg)
			setLoginData({ email: '' })
		}

		// ---

		// notifier.asyncBlock(
		// 	backend.post(`login/`, loginData),
		// 	(res) => {
		// 		null
		// 		//guardar token recibido
		// 		setOTPCode(res.data.token)
		// 		setIsPopupOpen(true)
		// 		setLoginData({ email: '' })
		// 	},
		// 	(err) => {
		// 		notifier.alert(err.response.data.msg)
		// 		setLoginData({ email: '' })
		// 	}
		// )
	}

	return (
		<>
			<form
				onSubmit={handleRequestCode}
				className="grid gap-3 text-black px-8"
			>
				<section className="flex justify-around gap-5 pt-8 w-full">
					<Input
						type={'email'}
						value={loginData.email}
						event={hanldeChangeInput}
						name={'email'}
						style={'flex-grow w-full rounded-lg h-[44px]'}
						label={'Email'}
						placeholder={'Ingresa tu correo'}
					/>
				</section>
				<span className="h-9 text-red-600 w-full text-center">{inputError}</span>
				<button className="bg-[#B5AF93] p-3 rounded-lg w-60 mx-auto mt-2">
					Ingresar
				</button>
			</form>
			<PopUp
				OTPCode={OTPCode}
				setOTPCode={setOTPCode}
				isPopupOpen={isPopupOpen}
				setIsPopupOpen={setIsPopupOpen}
			/>
		</>
	)
}
export default LoginForm
