const RootLayout = ({ children }) => {
	return (
		<html lang="es">
			<body>
				<header>[header]</header>
				<main>{children}</main>
				<footer>[footer]</footer>
			</body>
		</html>
	)
}
export default RootLayout
