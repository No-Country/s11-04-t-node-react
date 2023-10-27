'use client'

import { useEffect, useState } from 'react'
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'

import { Calendar } from '@/components/ui/calendar'
import axios from 'axios'

const CalendarAppointmentScheduling = () => {
  const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, date, setDate, setAppointments } = useAppointmentSchedulingContext()

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const getAppointmentsForDate = async (actualDate) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user
      const config = {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
      const { data } = await axios(`https://barberbuddy.fly.dev/api/v1/appointment/appointments-by-date/${actualDate}`, config)
      console.log(data)
      setAppointments(data.appointments)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const formatingDate = formatDate(date)

    setFormDataAppointmentScheduling({
      ...formDataAppointmentScheduling,
      date: formatingDate
    })
    getAppointmentsForDate(formatingDate)
  }, [date])

  return (
    <div className='fixed right-10'>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  )
}
export default CalendarAppointmentScheduling


// barberId
// :
// email
// :
// "fabiuuu8@gmail.com"
// fullName
// :
// "Fabian Carabajal"
// _id
// :
// "6526dd8ce90fa3ae5d1e176f"
// [[Prototype]]
// :
// Object
// clientId
// :
// email
// :
// "emaaa@gmail.com"
// fullName
// :
// "emma"
// _id
// :
// "6536d474aac66ade5d43f0ab"
// [[Prototype]]
// :
// Object
// date
// :
// "25-10-2023"
// endTime
// :
// "08:30"
// services
// :
// Array(1)
// 0
// :
// name
// :
// "barba"
// price
// :
// 5000
// _id
// :
// "652e199feeb638c5bb91edf5"
// [[Prototype]]
// :
// Object
// length
// :
// 1
// [[Prototype]]
// :
// Array(0)
// startTime
// :
// "08:00"
// status
// :
// "pending"
// totalPrice
// :
// 5000
// _id
// :
// "653910fb88c24cd20846a087"
