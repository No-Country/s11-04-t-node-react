export const DeleteBarber = ({ barber, onClickCancel, onClickDelete }) => {
	return (
		<div className="">
			<p>Desea eliminar el registro del barbero {barber.fullName}?</p>
			<div className="flex justify-end gap-6 mt-12">
				<button
					className="text-slate-950 border border-black rounded-lg py-1 px-6 bg-[#96B593]"
					onClick={onClickDelete}
				>
					Eliminar
				</button>
				<button
					className="text-slate-950 border border-black rounded-lg py-1 px-6 bg-[#BC8F86]"
					onClick={onClickCancel}
				>
					Cancelar
				</button>
			</div>
		</div>
	)
}
