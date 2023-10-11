"use client"

import {useAppointmentSchedulingContext} from "@/contexts/AppointmentSchedulingProvider";
import { useEffect } from "react";
const FormAgenda = () => {

  const {formDataAppointmentScheduling, handleChange, errors} = useAppointmentSchedulingContext()

  useEffect(() => {console.log(formDataAppointmentScheduling);}, [formDataAppointmentScheduling])

  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-x-24 gap-y-8">
      <div className="w-72">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input type="text" value={formDataAppointmentScheduling.name} onChange={(e)=>handleChange(e)} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" />
      </div>
      <div className="w-72">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
        <input type="text" value={formDataAppointmentScheduling.lastName} onChange={(e)=>handleChange(e)} name="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" />
      </div>
      <div className="w-72">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
        <input type="text" value={formDataAppointmentScheduling.celPhone} onChange={(e)=>handleChange(e)} name="celPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="543865559022" />
      </div>
      <div className="w-72">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="text" value={formDataAppointmentScheduling.email} onChange={(e)=>handleChange(e)} name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="email@dominio.com" />
      </div>
    </div>
  )
}
export default FormAgenda;
