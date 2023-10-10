import iconInfo from '@/public/images/icon-info.svg'
import iconDel from '@/public/images/icon-delete.png'
import Image from 'next/image'

export default function Barbers() {
	const services = ['Corte', 'Barba', 'Tintura', 'Peinado', 'Alisado']

	const barbers = [
		{
			id: 1,
			name: 'Carlos',
			lastname: 'Carlitos',
			services: ['corte', 'tintura'],
			phone: 123456789,
			email: 'carlos@gmail.com',
		},
		{
			id: 2,
			name: 'Juan',
			lastname: 'Juancitos',
			services: ['peinado', 'alisado'],
			phone: 987654321,
			email: 'juan@gmail.com',
		},
		{
			id: 3,
			name: 'Jorge',
			lastname: 'Jorgitos',
			services: ['barba', 'corte', 'tintura'],
			phone: 444333222,
			email: 'jorge@gmail.com',
		},
	]

	return (
		<div className="h-full py-5 px-7 bg-[#D9D9D9]">
			<h2 className="mb-7 text-4xl">Barberos</h2>

			<form>
				<div className="flex">
					<div className="flex flex-col w-1/2 mr-10">
						<label
							className="text-xl mb-2"
							htmlFor="barber-first-name"
						>
							Nombre
						</label>
						<input
							className="border rounded-lg p-1"
							type="text"
							id="barber-first-name"
							name="barber-first-name"
						/>
					</div>

					<div className="flex flex-col w-1/2 mr-auto">
						<label
							className="text-xl mb-2"
							htmlFor="barber-last-name"
						>
							Apellido
						</label>
						<input
							className="border rounded-lg p-1"
							type="text"
							id="barber-last-name"
							name="barber-last-name"
						/>
					</div>
				</div>

				<div className="flex">
					<div className="flex flex-col w-1/2 mr-10">
						<label
							className="text-xl mt-5 mb-2"
							htmlFor="barber-phone"
						>
							Teléfono
						</label>
						<input
							className="border rounded-lg p-1"
							type="phone"
							id="barber-phone"
							name="barber-phone"
						/>
					</div>

					<div className=" flex flex-col w-1/2 mr-auto">
						<label
							className="text-xl mt-5 mb-2"
							htmlFor="barber-email"
						>
							Email
						</label>
						<input
							className="border rounded-lg p-1"
							type="email"
							id="barber-email"
							name="barber-email"
						/>
					</div>
				</div>

				<div className="flex flex-wrap justify-between">
					{services.map((service) => {
						return (
							<div key={service}>
								<label className="text-xl mr-8">
									<input
										className="mt-10 mr-1 h-5 w-5 checked:bg-slate-800"
										type="checkbox"
									/>
									{service}
								</label>
							</div>
						)
					})}
				</div>
				<div className="flex justify-end gap-6">
					<button
						className="my-6 border border-black rounded-lg py-1 px-6 bg-[#96B593]"
						type="submit"
					>
						Agregar
					</button>
					<button
						className="my-6 border border-black rounded-lg py-1 px-6 bg-[#BC8F86]"
						type="button"
					>
						Cancelar
					</button>
				</div>
			</form>

			<div className="border rounded-lg">
				<table className="w-full divide-y divide-white bg-white bg-opacity-10">
					<thead>
						<tr className="h-16 border-white">
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Servicios</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white">
						{barbers.map((barber) => {
							return (
								<tr
									className="h-16 even:bg-gray-100"
									key={barber.id}
								>
									<td className="text-center">{barber.name}</td>
									<td className="text-center">{barber.lastname}</td>
									<td className="">
										<div className="flex justify-center gap-3">
											{barber.services.map((service) => {
												return (
													<div
														className="border rounded-lg bg-slate-950 text-slate-200 px-2"
														key={service}
													>
														{service}
													</div>
												)
											})}
										</div>
									</td>
									<td className="">
										<button className="">
											<Image
												width={32}
												src={iconInfo}
												alt="info_icon"
											/>
										</button>
									</td>
									<td className="">
										<button className="">
											<Image
												width={28}
												src={iconDel}
												alt="info_icon"
											/>
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
