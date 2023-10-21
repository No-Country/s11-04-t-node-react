"use client"
const hours = [
    {
        name: "lavado_de_cabello",
        text: "Lavado de cabello"
    },
    {
        name: "tintura",
        text: "Tintura"
    }
]

import { useAppointmentSchedulingContext } from "@/contexts/AppointmentSchedulingProvider";

import {IoIosArrowDown} from 'react-icons/io'

const SelectHour = () => {

    const { handleChange } = useAppointmentSchedulingContext()


    return (
        <div className="relative flex flex-col text-sm gap-y-2 text-stone-700 w-72">
            <label >Horario:</label>
            <select name='hour' onChange={handleChange} className=" block py-1.5 px-2 w-full text-sm text-stone-700 bg-transparent border-2 border-b-2 border-gray-500 appearance-none focus:outline-none rounded-xl peer">
                <option >Elige un horario</option>
                {
                    hours.map(category => {
                        return (
                            <option key={`${category.name}`} value={category.name}>{category.text}</option>
                        )
                    })
                }
            </select>
            <div className="absolute bottom-1 right-3 text-black text-xl uppercase"><IoIosArrowDown/></div>
        </div>
    )
}
export default SelectHour;
