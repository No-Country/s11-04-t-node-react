const BarberForm = ({
	submitHandler,
	barber,
	setBarber,
	onClickCancel,
	servicesList,
	handleCheckboxToggle,
	confirmButtonTag,
	disabled,
}) => {
	return (
		<form onSubmit={submitHandler}>
			<div className="flex flex-col">
				<label
					className="text-lg sm:text-xl mb-2"
					htmlFor="barberFullName"
				>
					Nombre
				</label>
				<input
					className=" w-full text-slate-950 border rounded-lg p-1"
					type="text"
					id="barberFullName"
					name="barberFullName"
					value={barber.fullName}
					onChange={(e) => setBarber({ ...barber, fullName: e.target.value })}
					required
					disabled={disabled}
				/>
			</div>

			<div className="flex flex-col sm:flex-row mb-4">
				<div className="flex flex-col w-full sm:w-1/2 mr-10">
					<label
						className="text-lg sm:text-xl my-2"
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
						disabled={disabled}
					/>
				</div>

				<div className=" flex flex-col w-full sm:w-1/2  mr-auto">
					<label
						className="text-lg sm:text-xl my-2"
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
						disabled={disabled}
					/>
				</div>
			</div>

			{/* CHECKBOXES */}
			<div className="grid grid-cols-2 lg:grid-cols-3">
				{servicesList.map((service, index) => {
					return (
						<div
							key={service._id}
							className="flex items-start gap-2 mb-4 mr-1"
						>
							<input
								className="mt-1 md:mt-2"
								type="checkbox"
								id={service._id}
								name={service.name}
								checked={barber.services[index].checked}
								onChange={() => {
									handleCheckboxToggle(barber, index)
								}}
								disabled={disabled}
							/>
							<label className="text-sm sm:text-xl">{service.name}</label>
						</div>
					)
				})}
			</div>

			<div className="flex justify-center sm:justify-end gap-2 sm:gap-6">
				<button
					className="text-sm sm:text-base text-black mb-6 border-2 border-white rounded-lg py-1 w-28 bg-[#96B593] hover:bg-white hover:border-[#96B593] transition duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
					type="submit"
					disabled={disabled}
				>
					{confirmButtonTag}
				</button>
				<button
					className="text-sm sm:text-base text-black mb-6 border-2 border-white rounded-lg py-1 w-28 bg-[#BC8F86] hover:bg-white hover:border-[#BC8F86] transition duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
					type="button"
					onClick={onClickCancel}
					disabled={disabled}
				>
					Cancelar
				</button>
			</div>
		</form>
	)
}
export default BarberForm
