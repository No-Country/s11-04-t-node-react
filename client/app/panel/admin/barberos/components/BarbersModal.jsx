export const BarbersModal = ({ children }) => {
	return (
		<div className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/2 sm:-translate-x-1/4 sm:-translate-y-1/2">
			{children}
		</div>
	)
}
