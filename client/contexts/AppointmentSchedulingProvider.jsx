"use client"
import { useContext, createContext, useState, useEffect } from "react";
const AppointmentSchedulingContext = createContext({})

const appointmentSchedulingObject = {
  clientId: '',
  barberId: '',
  services: [],
  startTime: '',
  endTime: '',
  date: ''
}

export const AppointmentSchedulingProvider = ({ children }) => {

  const [formDataAppointmentScheduling, setFormDataAppointmentScheduling] = useState(appointmentSchedulingObject)
  const [date, setDate] = useState(new Date())

  const [hiddenPopUp, setHiddenPopUp] = useState(false)
  const [hiddenChangeStatus, setHiddenChangeStatus] = useState(false)

  const [flagEdit, setFlagEdit] = useState(false)
  const [appointmentEditId, setAppointmentEditId] = useState("")


  const [hiddenListOfClients, setHiddenListOfClients] = useState(false)
  const [appointments, setAppointments] = useState([])

  const [client, setClient] = useState({
    fullName: '',
    _id: ''
  })

  const handleChange = (e) => {
    setFormDataAppointmentScheduling({
      ...formDataAppointmentScheduling,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <AppointmentSchedulingContext.Provider
      value={{
        formDataAppointmentScheduling, 
        setFormDataAppointmentScheduling,
        handleChange,
        hiddenPopUp, 
        setHiddenPopUp,
        date, 
        setDate,
        hiddenListOfClients, 
        setHiddenListOfClients,
        client, 
        setClient,
        appointments, 
        setAppointments,
        hiddenChangeStatus, 
        setHiddenChangeStatus,
        flagEdit, 
        setFlagEdit,
        appointmentEditId, 
        setAppointmentEditId
      }}>
      {children}
    </AppointmentSchedulingContext.Provider>
  )
}

export default AppointmentSchedulingContext;

export const useAppointmentSchedulingContext = () => {
  return useContext(AppointmentSchedulingContext);
};
