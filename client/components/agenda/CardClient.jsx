import { useAppointmentSchedulingContext } from "@/contexts/AppointmentSchedulingProvider";
import Link from "next/link";

const CardClient = ({ fullName, email, _id }) => {
    const { setClient, hiddenPopUp, setHiddenPopUp, hiddenListOfClients, setHiddenListOfClients } = useAppointmentSchedulingContext()

    const textWhatsapp = `Hola`

    const handleClickClient = () => {
        setClient({
            fullName,
            _id
        })
        setHiddenListOfClients(!hiddenListOfClients)
        setHiddenPopUp(!hiddenPopUp)
    }

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {fullName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {email}
                    </p>
                </div>
                <div className="flex items-center gap-x-3">
                    <button
                        onClick={handleClickClient}
                        className="inline-block px-4 py-2 bg-green-500 rounded-md">
                        Agendar cita
                    </button>
                    <Link target="_blank" href={`https://wa.me/+543865559022?text=${textWhatsapp}`} className="inline-block px-4 py-2 bg-green-500 rounded-md">
                        Contactar
                    </Link>
                </div>
            </div>
        </li>
    )
}
export default CardClient;
