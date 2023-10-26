"use client"

import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'
import FormAgenda from './FormAppointmentScheduling'
import axios from 'axios'

const PopUpCreateCite = () => {

  const { formDataAppointmentScheduling, hiddenPopUp, setHiddenPopUp, client } = useAppointmentSchedulingContext()

  const createAppointment = async () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const { token, _id } = user
    const config = {
      headers: {
        Authorization: `bearer ${token}`
      }
    }

    const body = { ...formDataAppointmentScheduling, barberId: _id, clientId: client._id }
    console.log(body)

    try {
      const { data } = await axios.post("https://barberbuddy.fly.dev/api/v1/appointment/create", body, config)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`${hiddenPopUp ? 'block' : 'hidden'} fixed w-full h-screen flex items-center justify-center top-0 left-0 z-40 overflow-x-hidden overflow-y-auto md:inset-0 bg-black/70`}>
      <div className='relative w-1/2 bg-slate-200 text-black p-4 rounded-lg'>
        <h2 className='text-center'>Agende una cita con el cliente {client.fullName}</h2>
        <button onClick={() => setHiddenPopUp(!hiddenPopUp)} className='absolute top-4 right-4'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11.8031 10.6031L20.9531 1.45312C21.2906 1.11562 21.2906 0.590625 20.9531 0.253125C20.6156 -0.084375 20.0906 -0.084375 19.7531 0.253125L10.6031 9.40312L1.45312 0.253125C1.11562 -0.084375 0.590625 -0.084375 0.253125 0.253125C-0.084375 0.590625 -0.084375 1.11562 0.253125 1.45312L9.40312 10.6031L0.253125 19.7531C-0.084375 20.0906 -0.084375 20.6156 0.253125 20.9531C0.403125 21.1031 0.628125 21.2156 0.853125 21.2156C1.07812 21.2156 1.30312 21.1406 1.45312 20.9531L10.6031 11.8031L19.7531 20.9531C19.9031 21.1031 20.1281 21.2156 20.3531 21.2156C20.5781 21.2156 20.8031 21.1406 20.9531 20.9531C21.2906 20.6156 21.2906 20.0906 20.9531 19.7531L11.8031 10.6031Z" fill="black" />
        </svg></button>
        <FormAgenda />
        <div className='p-6'>
          <button onClick={createAppointment} className='px-4 py-2 bg-green-500 rounded-md'>Agendar cita</button>
        </div>
      </div>
    </div>
  )
}
export default PopUpCreateCite;
