'use client'
import { backend } from '@/utils/backend'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
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
			setInputError('dirección de email inválida')
			setLoginData({ email: '' })
			return
		}

		// ----

		try {
			const res = await backend.post(`login/`, loginData)
			Notify.success(`${res.data.msg}, por favor revisa tu email`, {
				position: 'center-top',
				timeout: 10000,
			})
			setOTPCode(res.data.token)
			setIsPopupOpen(true)
			setLoginData({ email: '' })
		} catch (error) {
			Notify.failure(error.response.data.msg, {
				position: 'center-top',
			})
			setLoginData({ email: '' })
		}

		// ---
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
						style={'flex-grow w-full p-2 bg-[#D9D9D9]'}
						label={'Email'}
						placeholder={'Ingresa tu dirección de email'}
					/>
				</section>
				<span className="h-9 text-red-600 w-full text-center">{inputError}</span>
				<button className="bg-[#B5AF93] p-2 font-medium rounded-xl w-44 sm:w-60 mx-auto mt-2">
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
