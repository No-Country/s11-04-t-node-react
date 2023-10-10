"use client"
import FormAgenda from "@/components/agenda/FormAppointmentScheduling";
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react";

export default function AppointmentSchedulingPage() {
  const [date, setDate] = useState(new Date())
  useEffect(() => { console.log(date); }, [date])
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#D9D9D9]">
      <h3>Crear turno</h3>
      <FormAgenda/>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}
