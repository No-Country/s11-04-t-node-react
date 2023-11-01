'use client'

import { useEffect, useState } from 'react'
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'

import { Calendar } from '@/components/ui/calendar'
import axios from 'axios'
import { formatDate } from './utils'

const CalendarAppointmentScheduling = () => {
  const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, date, setDate, setAppointments, setHiddenLoader, setHiddenAlertObject } = useAppointmentSchedulingContext()

  const getAppointmentsForDate = async (actualDate) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user
      const config = {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
      setHiddenLoader(false)
      const { data } = await axios(`https://barberbuddy.fly.dev/api/v1/appointment/appointments-by-date/${actualDate}`, config)
      setHiddenLoader(true)
      setAppointments(data.appointments)
      setHiddenAlertObject({
        isHidden: false,
        text: `¡Se obtuvieron las citas del día ${actualDate} con éxito!`,
        isSuccess: true
      })
    } catch (error) {
      setHiddenLoader(true)
      setHiddenAlertObject({
        isHidden: false,
        text: '¡No se pudieron obtener las citas!',
        isSuccess: false
      })
    } finally {
      setTimeout(() => {
        setHiddenAlertObject({
          isHidden: true,
          text: '',
          isSuccess: false
        })
      }, 2300);
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
    <div className='block lg:fixed right-10'>
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
