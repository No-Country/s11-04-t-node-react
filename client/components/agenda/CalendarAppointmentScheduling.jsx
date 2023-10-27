'use client'

import { useEffect, useState } from 'react'
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'

import { Calendar } from '@/components/ui/calendar'
import axios from 'axios'
import { formatDate } from './utils'

const CalendarAppointmentScheduling = () => {
  const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, date, setDate, setAppointments } = useAppointmentSchedulingContext()

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
