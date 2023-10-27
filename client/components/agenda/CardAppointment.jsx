"use client"
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'

import { AiFillClockCircle, AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'


const CardAppointment = ({ clientId, totalPrice, status, services, startTime, endTime, date, barberId, appointmentId }) => {

  const { setFormDataAppointmentScheduling, hiddenPopUp, setHiddenPopUp, flagEdit, setFlagEdit, setAppointmentEditId, setClient } = useAppointmentSchedulingContext()


  return (
    <button onClick={() => {
      setClient({
        clientId: clientId._id, 
        fullName: clientId.fullName
      })
      setFormDataAppointmentScheduling({
        clientId: clientId._id, 
        barberId: barberId._id,
        services: services.map(service => service._id), 
        startTime, 
        endTime, 
        date 
      })
      setAppointmentEditId(appointmentId)
      setHiddenPopUp(!hiddenPopUp)
      setFlagEdit(true)
    }} className="w-4/5 flex flex-col gap-y-2 px-4 py-2 bg-yellow-200 rounded-lg hover:scale-105 hover:cursor-pointer">
      <div className="w-full flex items-center justify-between">
        <div className='flex items-center gap-x-3'>
          <span className="text-black font-semibold uppercase">{clientId?.fullName}</span>
          <span className="text-green-600 font-semibold">${totalPrice}</span>
        </div>
        <span className="rounded-md p-1 text-xl text-black">
          {
            status == 'pending' ?
              <AiFillClockCircle /> :
              status == 'cancelled' ?
                <MdCancel /> :
                <AiFillCheckCircle />
          }
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        {
          services?.map(service => {
            return (
              <span className="text-xs uppercase bg-black text-white rounded-md px-2 py-1">
                {service.name}
              </span>
            )
          })
        }
      </div>
    </button>
  )
}
export default CardAppointment;
