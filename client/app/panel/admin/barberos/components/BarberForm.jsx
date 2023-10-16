const BarberForm = ({
	submitHandler,
	barber,
	setBarber,
	onClickCancel,
	servicesList,
	handleCheckboxToggle,
	confirmButtonTag,
	action,
}) => {
	return (
		<form onSubmit={submitHandler}>
			<div className="flex flex-col">
				<label
					className="text-xl mb-2"
					htmlFor="barberFullName"
				>
					Nombre
				</label>
				<input
					className=" text-slate-950 border rounded-lg p-1"
					type="text"
					id="barberFullName"
					name="barberFullName"
					value={barber.fullName}
					onChange={(e) => setBarber({ ...barber, fullName: e.target.value })}
					required
				/>
			</div>

			<div className="flex">
				<div className="flex flex-col w-1/2 mr-10">
					<label
						className="text-xl mt-5 mb-2"
						htmlFor="barberPhone"
					>
						Teléfono
					</label>
					<input
						className="text-slate-950 border rounded-lg p-1"
						type="phone"
						id="barberPhone"
						name="barberPhone"
						value={barber.phone}
						onChange={(e) => setBarber({ ...barber, phone: e.target.value })}
						required
					/>
				</div>

				<div className=" flex flex-col w-1/2 mr-auto">
					<label
						className="text-xl mt-5 mb-2"
						htmlFor="barberEmail"
					>
						Email
					</label>
					<input
						className="text-slate-950 border rounded-lg p-1"
						type="email"
						id="barberEmail"
						name="barberEmail"
						value={barber.email}
						onChange={(e) => setBarber({ ...barber, email: e.target.value })}
						required
					/>
				</div>
			</div>

			{/* CHECKBOXES */}
			<div className="flex flex-wrap justify-stretch">
				{servicesList.map((service, index) => {
					return (
						<div key={service._id}>
							<label className="text-xl mr-8">
								<input
									className="mt-10 mr-1 h-5 w-5"
									type="checkbox"
									id={service._id}
									name={service.name}
									checked={barber.services[index].checked}
									onChange={() => {
										handleCheckboxToggle(action, barber, index)
									}}
								/>
								{service.name}
							</label>
						</div>
					)
				})}
			</div>

			<div className="flex justify-end gap-6">
				<button
					className="text-slate-950 my-6 border border-black rounded-lg py-1 px-6 bg-[#96B593]"
					type="submit"
				>
					{confirmButtonTag}
				</button>
				<button
					className="text-slate-950 my-6 border border-black rounded-lg py-1 px-6 bg-[#BC8F86]"
					type="button"
					onClick={onClickCancel}
				>
					Cancelar
				</button>
			</div>
		</form>
	)
}
export default BarberForm
