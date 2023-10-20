// import { Banner } from "@/components/home/Banner";
// import { Whatssap } from "@/components/shared/Whatssap";
import Link from 'next/link'

export default function HomePage() {
	return (
		<div>
			<div className="w-screen h-screen bg-[#292D33] text-white flex flex-col items-center justify-center gap-4">
				<p>Landing Page</p>

				<Link
					href="/acceso"
					className="px-6 py-4 border border-white rounded-md"
				>
					Inicia sesión
				</Link>
			</div>
			{/* Landing Page*/}
			{/* <Banner /> */}
			{/* Aqui iran los demas componentes de la Landing que se guardaran en la carpeta home */}
			{/* <Whatssap /> */}
		</div>
	)
}
