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
  serviceType: '',
  hour: ''
}

export const AppointmentSchedulingProvider = ({ children }) => {

  const [formDataAppointmentScheduling, setFormDataAppointmentScheduling] = useState(appointmentSchedulingObject)
  const [errors, setErrors] = useState("")
  const [date, setDate] = useState(new Date())

  const [hiddenPopUp, setHiddenPopUp] = useState(false)

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
        errors,
        hiddenPopUp, 
        setHiddenPopUp,
        date, 
        setDate
      }}>
      {children}
    </AppointmentSchedulingContext.Provider>
  )
}

export default AppointmentSchedulingContext;

export const useAppointmentSchedulingContext = () => {
  return useContext(AppointmentSchedulingContext);
};
