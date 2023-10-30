"use client"

import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'
import { hours } from './utils'
import CardAppointment from './CardAppointment'
import ChangeStatus from './ChangeStatus'
import Loader from './Loader'
import Alert from './Alert'

const Hours = () => {

  const { date, hiddenPopUp, setHiddenPopUp, hiddenListOfClients, setHiddenListOfClients, setClient, appointments, hiddenChangeStatus, setHiddenChangeStatus, setDataStatus } = useAppointmentSchedulingContext()


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
    <div className='w-full md:w-2/3 flex flex-col gap-y-6'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4'>
        <h2 className='p-4 text-2xl font-semibold uppercase'>
          {convertDateTime(date)}
        </h2>
        <button onClick={handleClick} className='px-4 py-2 rounded-lg bg-green-600 text-white font-semibold uppercase'>Crear cita</button>
      </div>
      <table className="overflow-x-auto w-full text-sm text-left text-gray-500">
        <thead className='text-gray-600 uppercase rounded-t-lg overflow-x-auto'>
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
        <tbody className='overflow-x-auto'>
          {hours.map((hour, index) => {
            const matchingAppointments = appointments.filter(appointment => appointment.startTime === hour.time);
            return (
              <tr key={hour.time} className="bg-white/5 border-b border-b-gray-700">
                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>{hour.time}</th>
                <td className='px-6 py-4'>
                  {matchingAppointments.length > 0 ? (
                    matchingAppointments.map(matchingAppointment => (
                      <CardAppointment key={matchingAppointment._id} appointmentId={matchingAppointment._id} clientId={matchingAppointment.clientId} totalPrice={matchingAppointment.totalPrice} status={matchingAppointment.status} services={matchingAppointment.services} date={matchingAppointment.date} startTime={matchingAppointment.startTime} endTime={matchingAppointment.endTime} barberId={matchingAppointment.barberId} />
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
                  {matchingAppointments.length > 0 ? (
                    matchingAppointments.map(matchingAppointment => (
                      <button key={matchingAppointment.id}
                        onClick={() => {
                          setHiddenChangeStatus(!hiddenChangeStatus)
                          setDataStatus({
                            id: matchingAppointment._id,
                            status: matchingAppointment.status
                          })
                        }}
                        className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Cambiar estado
                      </button>
                    ))
                  ) : (
                    <div className='w-full flex items-center justify-start'>
                      <span

                        className='text-center text-xl text-stone-600 font-semibold'>
                        Sin estado
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ChangeStatus />
      <Loader />
      <Alert />
    </div>
  )
}
export default Hours;
