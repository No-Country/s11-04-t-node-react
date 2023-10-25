"use client"

import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'

export const hours = [
  {
    time: '08:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '08:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '09:00',
    cita: null
  },
  {
    time: '09:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '10:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '10:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '11:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '11:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '12:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  }
]

export const lastHours = [
  {
    time: '14:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '14:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '15:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '15:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '16:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '16:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '17:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '17:30',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  },
  {
    time: '18:00',
    cita: {
      service: 'tintura',
      client: 'Mochita la del barrio'
    }
  }
]

const Hours = () => {

  const { date, hiddenPopUp, setHiddenPopUp, hiddenListOfClients, setHiddenListOfClients } = useAppointmentSchedulingContext()

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
    const nameParam = searchParams.get('name');
    const idParam = searchParams.get('_id');

    const decodedName = decodeURIComponent(nameParam);
    const decodedId = decodeURIComponent(idParam);

    console.log(decodedId, decodedName)
    if (decodedName == null && decodedId == null) {
      setHiddenPopUp(!hiddenPopUp)
    }else{
      setHiddenListOfClients(!hiddenListOfClients)
    }
  }

  return (
    <div className='w-2/3 flex flex-col'>
      <h2 className='p-4 text-xl font-semibold uppercase'>
        {convertDateTime(date)}
      </h2>
      <div className='w-full flex items-center justify-between'>
        <div className='w-1/2'>
          {
            hours.map(hour => {
              return (
                <div key={hour.time} className={`${!hour.cita ? '' : ''} w-full flex items-center border`}>
                  <div className='p-4 text-center border-r boder-r-black'>{hour.time}</div>
                  {
                    !hour.cita ?
                      <div className='w-full flex items-center justify-center'>
                        <button
                          onClick={handleClick}
                          className='text-center border rounded-md text-xl p-1.5'>
                          +
                        </button>
                      </div> :
                      <div className='bg-[#ccbb6f] w-full px-4 flex flex-col gap-y-1'><span>{hour.cita.client}</span><span>{hour.cita.service}</span></div>
                  }
                </div>
              )
            })
          }
        </div>
        <div className='w-1/2'>
          {
            lastHours.map(hour => {
              return (
                <div key={hour.time} className='w-full flex items-center border'>
                  <div className='p-4 text-center border-r boder-r-black'>{hour.time}</div>
                  <div className='px-4 flex flex-col gap-y-1'><span>{hour.cita.client}</span><span>{hour.cita.service}</span></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Hours;
