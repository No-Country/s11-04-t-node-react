export const DeleteBarber = ({ barber, onClickCancel, onClickDelete }) => {
	return (
		<div className="">
			<p>Desea eliminar el registro del barbero {barber.fullName}?</p>
			<div className="flex justify-end gap-6 mt-12">
				<button
					className="text-sm sm:text-base text-black mb-6 border-2 border-white rounded-lg py-1 w-28 bg-[#96B593] hover:bg-white hover:border-[#96B593] transition duration-300"
					onClick={onClickDelete}
				>
					Eliminar
				</button>
				<button
					className="text-sm sm:text-base text-black mb-6 border-2 border-white rounded-lg py-1 w-28 bg-[#BC8F86] hover:bg-white hover:border-[#BC8F86] transition duration-300"
					onClick={onClickCancel}
				>
					Cancelar
				</button>
			</div>
		</div>
	)
}
