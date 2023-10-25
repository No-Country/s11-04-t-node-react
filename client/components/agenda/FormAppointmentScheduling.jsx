"use client"
import { useRouter } from 'next/navigation'

import { useEffect, useState } from "react";

import { useAppointmentSchedulingContext } from "@/contexts/AppointmentSchedulingProvider";
import axios from 'axios';
import SelectHour from './SelectHour';

const FormAgenda = () => {

  const router = useRouter()
  const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, handleChange, date } = useAppointmentSchedulingContext()

  const [services, setServices] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      router.push('/')
      return
    }
    const { token } = user

    const getServices = async () => {
      try {
        const { data } = await axios("https://barberbuddy.fly.dev/api/v1/services/get-services", {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setServices(data.services)

      } catch (error) {
        console.log(error)
      }

    }
    getServices()

  }, [])

  const handleCheckboxToggle = (serviceId) => {
    // Comprobamos si el servicio ya está en el array de servicios seleccionados

    let updatedLocalServices = [...formDataAppointmentScheduling.services]; // Clonamos el array de servicios locales
    if (updatedLocalServices.includes(serviceId)) {
      // Si el servicio ya está seleccionado, lo eliminamos
      updatedLocalServices = updatedLocalServices.filter(id => id !== serviceId);
    } else {
      // Si el servicio no está seleccionado, lo agregamos
      updatedLocalServices.push(serviceId);
    }

    setFormDataAppointmentScheduling({...formDataAppointmentScheduling, services: updatedLocalServices})
  };

  useEffect(() => { console.log(formDataAppointmentScheduling) }, [formDataAppointmentScheduling])

  return (
    <div className="w-full flex flex-col flex-wrap gap-y-8 p-6">
      <div className='flex items-center'>
        <div>
          <label className='font-thin text-stone-700 text-sm'>Elija un horario de inicio</label>
          <SelectHour horario={"de inicio"} param={"startTime"}/>
        </div>
        <div>
          <label className='font-thin text-stone-700 text-sm'>Elija un horario de final</label>
          <SelectHour horario={"de fin"} param={"endTime"}/>
        </div>
      </div>
      {/* <div className="w-72">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input type="text" value={formDataAppointmentScheduling.name} onChange={(e) => handleChange(e)} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" />
      </div> */}
      <div className='flex flex-col gap-y-2'>
        <label className='font-thin text-stone-700 text-sm'>Elija el/los servicio/s que brindará al cliente:</label>
        <div className='flex items-center flex-wrap gap-x-6'>
          {
            services && services.map((service, index) => {
              return (
                <div key={service._id} className='flex items-center gap-x-1'>
                  <label >{service.name}</label>
                  <input
                    className="bg-yellow-600"
                    type="checkbox"
                    id={service._id}
                    name={service.name}
                    checked={formDataAppointmentScheduling.services.includes(service._id)}
                    onChange={() => {
                      handleCheckboxToggle(service._id)
                    }}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default FormAgenda;
