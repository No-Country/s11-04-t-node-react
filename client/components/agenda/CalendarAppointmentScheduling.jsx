"use client"

import { useEffect, useState } from "react"
import { useAppointmentSchedulingContext } from "@/contexts/AppointmentSchedulingProvider";

import { Calendar } from "@/components/ui/calendar"

const CalendarAppointmentScheduling = () => {
    const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, date, setDate } = useAppointmentSchedulingContext()

    useEffect(() => {
        setFormDataAppointmentScheduling({
            ...formDataAppointmentScheduling,
            date,
        })
    }, [date])

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
        />
    )
}
export default CalendarAppointmentScheduling;
