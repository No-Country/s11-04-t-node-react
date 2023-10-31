"use client"
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ChangeStatus = () => {

  const { formDataAppointmentScheduling, client, hiddenChangeStatus, setHiddenChangeStatus, setHiddenLoader, setHiddenAlertObject, dataStatus } = useAppointmentSchedulingContext()

  const [optionSelectedCancel, setOptionSelectedCancel] = useState(false)
  const [optionSelectedComplete, setOptionSelectedComplete] = useState(false)

  // const [errorMessage, setErrorMessage] = useState({
  //   isHidden: true,
  //   text: ''
  // })

  useEffect(() => {
    console.log(dataStatus)
    if (dataStatus.status == 'cancelled') {
      setOptionSelectedCancel(true)
      return;
    }

    if (dataStatus.status == 'completed') {
      setOptionSelectedComplete(true)
      return;
    }
  }, [dataStatus])

  const handleChangeCancel = () => {
    if (optionSelectedComplete) {
      // setErrorMessage({
      //   isHidden: false,
      //   text: 'La cita no puede tener más de un estado a la vez'
      // })
      setOptionSelectedComplete(false)
    }
    setOptionSelectedCancel(true)
  }

  const handleChangeComplete = () => {
    if (optionSelectedCancel) {
      // setErrorMessage({
      //   isHidden: false,
      //   text: 'La cita no puede tener más de un estado a la vez'
      // })
      setOptionSelectedCancel(false)
    }
    setOptionSelectedComplete(true)
  }

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user
      const config = {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
      setHiddenLoader(false)
      const { data } = await axios.put(`https://barberbuddy.fly.dev/api/v1/appointment/${optionSelectedCancel ? 'cancel' : 'complete'}/${dataStatus.id}`, {}, config)
      setHiddenLoader(true)
      setHiddenAlertObject({
        isHidden: false,
        text: `¡Se cambió el estado de la cita con éxito!`,
        isSuccess: true
      })
      window.location.href = './'
    } catch (error) {
      console.log(error)
      setHiddenLoader(true)
      setHiddenAlertObject({
        isHidden: false,
        text: '¡No se pudo cambiar el estado de la cita!',
        isSuccess: false
      })
    } finally {
      setTimeout(() => {
        setHiddenAlertObject({
          isHidden: true,
          text: '',
          isSuccess: false
        })
      }, 2300);
    }
  }

  useEffect(() => {console.log(optionSelectedComplete, optionSelectedCancel)}, [optionSelectedComplete, optionSelectedCancel])

  return (
    <div className={`${hiddenChangeStatus ? 'block' : 'hidden'} fixed w-full h-screen flex items-center justify-center top-0 left-0 z-40 overflow-x-hidden overflow-y-auto md:inset-0 bg-black/70`}>
      <div className='relative w-full md:w-3/5 lg:w-1/3 bg-slate-200 text-black p-4 rounded-lg flex flex-col gap-y-10'>
        <button onClick={() => setHiddenChangeStatus(!hiddenChangeStatus)} className='absolute top-4 right-4'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11.8031 10.6031L20.9531 1.45312C21.2906 1.11562 21.2906 0.590625 20.9531 0.253125C20.6156 -0.084375 20.0906 -0.084375 19.7531 0.253125L10.6031 9.40312L1.45312 0.253125C1.11562 -0.084375 0.590625 -0.084375 0.253125 0.253125C-0.084375 0.590625 -0.084375 1.11562 0.253125 1.45312L9.40312 10.6031L0.253125 19.7531C-0.084375 20.0906 -0.084375 20.6156 0.253125 20.9531C0.403125 21.1031 0.628125 21.2156 0.853125 21.2156C1.07812 21.2156 1.30312 21.1406 1.45312 20.9531L10.6031 11.8031L19.7531 20.9531C19.9031 21.1031 20.1281 21.2156 20.3531 21.2156C20.5781 21.2156 20.8031 21.1406 20.9531 20.9531C21.2906 20.6156 21.2906 20.0906 20.9531 19.7531L11.8031 10.6031Z" fill="black" />
        </svg></button>
        <h3 className='text-center'>Cambiar el estado de la cita de <b>{client?.fullName}</b></h3>
        {/* <span className=''>Estados posibles de la cita:</span> */}
        <div className='flex items-center gap-x-6'>
          <div className='flex flex-col gap-y-4 items-start'>
            <span className='text-sm text-stone-700'>Cambia de pendiente a cancelado o viceversa</span>
            <button className="relative">
              <input
                onClick={() => handleChangeCancel()}
                className={`mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-slate-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-slate-500 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] ${optionSelectedCancel ? "checked:bg-blue-600 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-600 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-['']hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12]focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blue-600 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]" : ''}`}
                type="checkbox"
              />
            </button>
          </div>
          <div className='flex flex-col gap-y-4 items-start'>
            <span className='text-sm text-stone-700'>Cambia de pendiente a completado o viceversa</span>
            <button className="relative hover:cursor-pointer">
              <input
                onClick={() => handleChangeComplete()}
                className={`mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-slate-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-slate-500 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] ${optionSelectedComplete ? "checked:bg-blue-600 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-600 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-['']hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12]focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blue-600 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]" : ''}`}
                type="checkbox"
              />
            </button>
          </div>
        </div>
        <div className='flex items-center gap-x-4 self-center'>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Guardar cambios</button>
          <button onClick={() => setHiddenChangeStatus(!hiddenChangeStatus)} className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90">Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default ChangeStatus;
