'use client'

import { useEffect, useState } from 'react'
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'

import { Calendar } from '@/components/ui/calendar'

const CalendarAppointmentScheduling = () => {
	const { formDataAppointmentScheduling, setFormDataAppointmentScheduling } =
		useAppointmentSchedulingContext()

	const [date, setDate] = useState(new Date())
	useEffect(() => {
		setFormDataAppointmentScheduling({
			...formDataAppointmentScheduling,
			date,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
export default CalendarAppointmentScheduling
