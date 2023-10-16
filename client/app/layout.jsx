import { poppins } from '../fonts/font.js'
import './globals.css'
import { Providers } from '@/redux/provider.jsx'

export default function RootLayout({ children }) {
	return (
		<html
			lang="es"
			className={poppins.variable}
		>
			<body className="flex flex-col min-h-screen">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
