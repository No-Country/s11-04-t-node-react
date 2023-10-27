"use client"

import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'
import { hours } from './utils'
import CardAppointment from './CardAppointment'
import ChangeStatus from './ChangeStatus'
import EditAppointment from './EditAppointment'

const Hours = () => {

  const { date, hiddenPopUp, setHiddenPopUp, hiddenListOfClients, setHiddenListOfClients, setClient, appointments, hiddenChangeStatus, setHiddenChangeStatus } = useAppointmentSchedulingContext()


  const convertDateTime = (inputDateTime) => {
    const options = {
      day: 'numeric',
      month: 'long',
    };
    const date = new Date(inputDateTime);
    return date.toLocaleDateString('es-AR', options);
  }

  const handleClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = searchParams.get('id');

    const idParam = params?.split("?name=")[0]
    const nameParam = params?.split("?name=")[1]

    if (!nameParam || !idParam || !nameParam.length || !idParam.length) {
      setHiddenListOfClients(!hiddenListOfClients)
    } else {
      setClient({
        fullName: nameParam,
        _id: idParam
      })
      setHiddenPopUp(!hiddenPopUp)
    }
  }

  return (
    <div className='w-2/3 flex flex-col gap-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='p-4 text-2xl font-semibold uppercase'>
          {convertDateTime(date)}
        </h2>
        <button onClick={handleClick} className='px-4 py-2 rounded-lg bg-green-600 text-white font-semibold uppercase'>Crear cita</button>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className='text-gray-600 uppercase rounded-t-lg'>
          <tr>
            <th className="px-6 py-3 bg-transparent">
              Horario
            </th>
            <th className="px-6 py-3 bg-transparent">
              Cita
            </th>
            <th className="px-6 py-3 bg-transparent">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => {
            const matchingAppointments = appointments.filter(appointment => appointment.startTime === hour.time);
            return (
              <tr key={hour.time} className="bg-white/5 border-b border-b-gray-700">
                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>{hour.time}</th>
                <td className='px-6 py-4'>
                  {matchingAppointments.length > 0 ? (
                    matchingAppointments.map(matchingAppointment => (
                      <CardAppointment key={matchingAppointment.id} appointmentId={matchingAppointment.id} clientId={matchingAppointment.clientId} totalPrice={matchingAppointment.totalPrice} status={matchingAppointment.status} services={matchingAppointment.services} date={matchingAppointment.date} startTime={matchingAppointment.startTime} endTime={matchingAppointment.endTime} barberId={matchingAppointment.barberId} />
                    ))
                  ) : (
                    <div className='w-full flex items-center justify-start'>
                      <span

                        className='text-center text-xl text-green-600 font-semibold'>
                        Libre
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button 
                  onClick={() => setHiddenChangeStatus(!hiddenChangeStatus)}
                  className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Cambiar estado
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ChangeStatus/>
      <EditAppointment/>
    </div>
  )
}
export default Hours;
