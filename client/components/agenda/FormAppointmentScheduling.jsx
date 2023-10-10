import { useState } from "react";

const FormAgenda = () => {

  const [agendaTemplate, setAgendaTemplate] = useState({
    name: '',
    lastName: '',
    celPhone: '',
    email: ''
  })
  const [errors, setErrors] = useState("")

  const handleChange = (e) => {
    setAgendaTemplate({
      ...agendaTemplate,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validationErrorsLogin({
        ...agendaTemplate,
        [e.target.name]: e.target.value,
      }),
    )
  }

  return (
    <div className="flex ">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input type="text" onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
        <input type="text" onChange={handleChange} id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
        <input type="text" onChange={handleChange} id="celPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="543865559022" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="text" onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@dominio.com" />
      </div>
    </div>
  )
}
export default FormAgenda;
