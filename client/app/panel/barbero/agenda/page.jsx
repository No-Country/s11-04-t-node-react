"use client"

import { AppointmentSchedulingProvider } from '@/contexts/AppointmentSchedulingProvider.jsx'

import CalendarAppointmentScheduling from "@/components/agenda/CalendarAppointmentScheduling";
import FormAgenda from "@/components/agenda/FormAppointmentScheduling";
import SelectService from '@/components/agenda/SelectService';

export default function AppointmentSchedulingPage() {
  
  return (
    <AppointmentSchedulingProvider>
      <div className="p-24 mx-auto w-full flex flex-col items-center min-h-screen bg-[#D9D9D9] gap-y-12">
        <h3 className='self-start text-3xl font-black'>Crear turno</h3>
        <div className='flex flex-col w-3/4 gap-y-12'>
          <FormAgenda />
          <div className='flex items-start w-full justify-between'>
            <CalendarAppointmentScheduling/>
            <SelectService/>
          </div>
        </div>
      </div>
    </AppointmentSchedulingProvider>
  );
}
