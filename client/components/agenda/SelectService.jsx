"use client"
const services = [
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

const SelectService = () => {

    const { handleChange } = useAppointmentSchedulingContext()


    return (
        <div className="relative flex flex-col text-sm gap-y-2 text-stone-700 w-72">
            <label >Categoría:</label>
            <select name='serviceType' onChange={handleChange} className=" block py-1.5 px-2 w-full text-sm text-stone-700 bg-transparent border-2 border-b-2 border-gray-500 appearance-none focus:outline-none rounded-xl peer">
                <option >Elige un servicio</option>
                {
                    services.map(category => {
                        return (
                            <option key={`a${category.name}`} value={category.name}>{category.text}</option>
                        )
                    })
                }
            </select>
            <div className="absolute bottom-1 right-3 text-black text-xl uppercase"><IoIosArrowDown/></div>
        </div>
    )
}
export default SelectService;
