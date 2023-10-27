import { useEffect, useState } from 'react'
import Input from './Input'
import { useRouter } from 'next/navigation'
import { backend, getAuthorization } from '@/utils/backend'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Loading } from 'notiflix/build/notiflix-loading-aio'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/userSlice'

const ErrorMesaje = ({ codeCounter, setCodeCounter, setIsPopupOpen }) => {
	const [segundos, setSegundos] = useState(60)

	useEffect(() => {
		if (codeCounter === 0) {
			const intervalo = setInterval(() => {
				if (segundos <= 0) {
					clearInterval(intervalo)
					setSegundos(60)
					console.log('Cuenta regresiva finalizada.')
				}
				setSegundos((prev) => prev - 1)
			}, 100)

			return () => {
				clearInterval(intervalo)
			}
		}
	}, [codeCounter, segundos])

	useEffect(() => {
		if (segundos == 0) {
			setCodeCounter(3)
			setIsPopupOpen((prev) => !prev)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [segundos])

	return (
		<article className="h-[360px] bg-[#B5AF93] w-full max-w-lg rounded-2xl p-5 flex flex-col justify-center content-center">
			<h3 className="text-4xl text-red-600 text-center capitalize py-5">
				Intentos agotados
			</h3>
			<span className="text-center w-full">
				prueba denuevo en unos minutos: {segundos}
			</span>
		</article>
	)
}

const PopUp = ({ OTPCode, setOTPCode, isPopupOpen, setIsPopupOpen }) => {
	const [code, setcode] = useState(['', '', '', ''])
	const [codeCounter, setCodeCounter] = useState(3)
	const router = useRouter()
	const dispatch = useDispatch()

	const changeCodeValue = (e, index) => {
		let value = eval(e.target.value)
		const validatorNumber = /^[0-9]$/
		if (!validatorNumber.test(value)) value = ''
		const newCode = [...code]
		newCode.splice(index, 1, value)
		setcode(newCode)
	}

	const hanldeAuthorizedUser = async () => {
		const data = {
			otp: code.join(''),
		}
		Loading.standard()
		try {
			const res = await backend.post(`verify-email`, data, {
				headers: getAuthorization(OTPCode),
			})
			Loading.remove()
			router.push('/')
			return dispatch(
				login({
					_id: res.data._id,
					fullName: res.data.fullName,
					token: res.data.token,
					role: res.data.role,
				})
			)
		} catch (error) {
			Notify.failure(error.response.data.msg, {
				position: 'center-top',
			})
			Loading.remove()
			setcode(['', '', '', ''])
			console.log(error)
		}

		//---
	}

	return (
		<section
			className={`fixed top-0 min-h-screen w-full z-50 left-0 flex justify-center items-center bg-black/70 p-3 text-black tracking-widest ${
				isPopupOpen ? 'visible' : 'invisible'
			}`}
		>
			{codeCounter == 0 ? (
				<ErrorMesaje
					codeCounter={codeCounter}
					setCodeCounter={setCodeCounter}
					setIsPopupOpen={setIsPopupOpen}
				/>
			) : (
				<article className="grid w-full max-w-lg bg-white p-8 h-[360px] rounded-xl">
					<p
						className="text-lg font-semibold"
						title="verifica tu email o telefono"
					>
						Código de verificación
					</p>
					<p className="text-sm text-slate-400">
						Hemos enviado el código de verificación a tu dirección de email
					</p>
					{/* <div className="h-[20px] text-lg">
						intentos restantes:{' '}
						<span className="text-red-600 font-semibold">{codeCounter}</span>
					</div> */}
					<div className="flex justify-around gap-2">
						{[0, 1, 2, 3].map((index) => (
							<div
								key={index}
								className="flex justify-center"
							>
								<Input
									type="number"
									style={'text-center text-4xl w-full py-1 text-slate-950 mb-6 pl-0'}
									value={code[index]}
									event={(e) => changeCodeValue(e, index)}
								/>
							</div>
						))}
					</div>
					<button
						onClick={hanldeAuthorizedUser}
						className=" bg-orange-400 px-3 text-white w-60 mx-auto mt-2 tracking-widest text-lg font-medium mb-4 rounded-3xl"
					>
						Confirmar
					</button>
				</article>
			)}
		</section>
	)
}
export default PopUp
