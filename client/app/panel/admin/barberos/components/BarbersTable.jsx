import Image from 'next/image'

export const BarbersTable = ({
	barbers,
	iconInfo,
	handleDetailsClick,
	iconDel,
	handleDeleteClick,
}) => {
	return (
		<div className="border rounded-lg">
			<table className="w-full divide-y divide-white bg-white bg-opacity-10">
				<thead className="bg-slate-100 h-10">
					<tr className="border-white">
						<th className="w-4/12 text-sm sm:text-base">Nombre</th>
						<th className=" w-6/12 text-sm sm:text-base">Servicios</th>
						<th className="w-1/12"></th>
						<th className="w-1/12"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white">
					{barbers.map((barber) => {
						return (
							<tr
								className="even:bg-gray-100"
								key={barber._id}
							>
								<td className="text-center text-xs sm:text-sm">{barber.fullName}</td>
								<td>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
										{barber.services.map((service) => {
											return (
												<div
													className="text-center border rounded-lg bg-slate-950 text-slate-200 text-xs"
													key={service._id}
												>
													{service.name}
												</div>
											)
										})}
									</div>
								</td>
								<td>
									<button onClick={() => handleDetailsClick(barber)}>
										<Image
											width={28}
											src={iconInfo}
											alt="info_icon"
										/>
									</button>
								</td>
								<td>
									<button onClick={() => handleDeleteClick(barber)}>
										<Image
											width={24}
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
	)
}
