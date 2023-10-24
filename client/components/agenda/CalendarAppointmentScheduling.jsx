'use client'

import { useEffect, useState } from 'react'
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider'

import { Calendar } from '@/components/ui/calendar'

const CalendarAppointmentScheduling = () => {
	const { formDataAppointmentScheduling, setFormDataAppointmentScheduling, date, setDate } = useAppointmentSchedulingContext()

	function formatDate(inputDate) {
		const date = new Date(inputDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day}-${month}-${year}`;
	}

	useEffect(() => {
		const formatingDate = formatDate(date)

		setFormDataAppointmentScheduling({
			...formDataAppointmentScheduling,
			formatingDate
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
export default CalendarAppointmentScheduling
