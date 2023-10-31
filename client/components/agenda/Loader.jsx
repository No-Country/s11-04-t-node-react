"use client"
import { useAppointmentSchedulingContext } from '@/contexts/AppointmentSchedulingProvider.jsx'

const Loader = () => {

  const { hiddenLoader} = useAppointmentSchedulingContext()

  return (
    <div className={`${hiddenLoader ? 'hidden' : 'block'} fixed w-full h-screen flex items-center justify-center top-0 left-0 z-40 md:inset-0 bg-black/50`}>
      <div className="flex flex-row gap-2">
        <div className="w-12 h-12 rounded-full bg-yellow-300 animate-bounce"></div>
        <div className="w-12 h-12 rounded-full bg-yellow-300 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-12 h-12 rounded-full bg-yellow-300 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  )
}
export default Loader;
