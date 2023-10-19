"use client"

import { AppointmentSchedulingProvider } from '@/contexts/AppointmentSchedulingProvider.jsx'

import CalendarAppointmentScheduling from "@/components/agenda/CalendarAppointmentScheduling";
import Hours from '@/components/agenda/Hours';
import PopUpCreateCite from '@/components/agenda/PopUpCreateCite';

export default function AppointmentSchedulingPage() {

  return (
    <AppointmentSchedulingProvider>
      <div className="p-12 mx-auto w-full flex flex-col items-center min-h-screen bg-[#D9D9D9] gap-y-12">
        <h3 className='self-start text-3xl font-black'>Crear turno</h3>
        <div className='w-full flex justify-between'>
          <Hours/>
          <CalendarAppointmentScheduling/>
        </div>
        <PopUpCreateCite/>
      </div>
    </AppointmentSchedulingProvider>
  );
}
