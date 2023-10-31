import { Providers } from '@/redux/provider.jsx'
import { Toaster } from './Toaster.jsx'
import { poppins } from '@/fonts/font.js'
import './globals.css'

export const metadata = {
	title: 'BarberBuddy',
	decription:
		'BarberBuddy is a web application designed for managing shifts in barbershops.',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang="es"
			className={`${poppins.variable} font-sans`}
		>
			<body className="flex flex-col mb-5">
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
