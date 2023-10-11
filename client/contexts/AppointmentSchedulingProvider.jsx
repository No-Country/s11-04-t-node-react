"use client"
import { validationErrors } from "@/components/agenda/utils";
import { useContext, createContext, useState } from "react";
const AppointmentSchedulingContext = createContext({})

const appointmentSchedulingObject = {
  name: '',
  lastName: '',
  celPhone: '',
  email: '',
  date: '',
  serviceType: ''
}

export const AppointmentSchedulingProvider = ({ children }) => {

  const [formDataAppointmentScheduling, setFormDataAppointmentScheduling] = useState(appointmentSchedulingObject)
  const [errors, setErrors] = useState("")

  const handleChange = (e) => {
    setFormDataAppointmentScheduling({
      ...formDataAppointmentScheduling,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validationErrors({
        ...formDataAppointmentScheduling,
        [e.target.name]: e.target.value,
      }),
    )
  }

  return (
    <AppointmentSchedulingContext.Provider
      value={{
        formDataAppointmentScheduling, 
        setFormDataAppointmentScheduling,
        handleChange,
        errors
      }}>
      {children}
    </AppointmentSchedulingContext.Provider>
  )
}

export default AppointmentSchedulingContext;

export const useAppointmentSchedulingContext = () => {
  return useContext(AppointmentSchedulingContext);
};
