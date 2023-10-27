"use client"
import { useEffect, useState } from "react";

import { useAppointmentSchedulingContext } from "@/contexts/AppointmentSchedulingProvider";

import { hours } from "./utils";

const SelectHour = ({hourSelected, horario, param }) => {

  const { handleChange, formDataAppointmentScheduling, setFormDataAppointmentScheduling, flagEdit, setFlagEdit } = useAppointmentSchedulingContext()
  const [hiddenDropdownAnswer, setHiddenDropdownAnswer] = useState(true)
  const [option, setOption] = useState('')

  useEffect(() => {
    if(flagEdit){
      setOption(hourSelected)
    }else{
      setOption(`Elija un horario`)
    }
  }, [flagEdit])

  const handleClick = (hour) => {
    setFormDataAppointmentScheduling({...formDataAppointmentScheduling, [param]: hour})
  }

  return (
    <div className="relative flex flex-col text-sm gap-y-2 text-stone-700 w-72">
      <button onClick={() => {
        setHiddenDropdownAnswer(!hiddenDropdownAnswer)
        }} className="w-full flex items-center justify-between text-black bg-slate-200 hover:bg-slate-300/80 font-medium rounded-lg text-sm px-5 py-3 text-center" type="button">
        <span>{option}{option == 'Elija un horario'  ? horario : ''}</span>
        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div className={`${hiddenDropdownAnswer ? 'hidden' : 'absolute '} h-72 top-10 z-10 bg-white divide-y divide-gray-100 px-2 border shadow-lg w-full overflow-y-auto scroll-hidden`}>
        {
          hours.map((hour) => {
            return (
              <button
                key={hour.time}
                onClick={() => {
                  handleClick(hour.time)
                  setOption(hour.time)
                  setHiddenDropdownAnswer(!hiddenDropdownAnswer)
                }} className="w-full text-start">
                <span className="block px-4 py-2 hover:bg-slate-200 rounded-lg">{hour.time}</span>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
export default SelectHour;
