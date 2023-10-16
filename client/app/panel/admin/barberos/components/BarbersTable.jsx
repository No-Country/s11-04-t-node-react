import Image from 'next/image'

export const BarbersTable = ({
	barbers,
	iconInfo,
	handleDetailsClick,
	iconDel,
	handleDeleteClick,
}) => {
	return (
		<div className="border rounded-lg max-h-[40vh] overflow-auto">
			<table className="w-full divide-y divide-white bg-white bg-opacity-10">
				<thead className="sticky top-0 bg-slate-100 h-10">
					<tr className="border-white">
						<th>Nombre</th>
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
								key={barber._id}
							>
								<td className="text-center">{barber.fullName}</td>
								<td>
									<div className="grid grid-cols-2 gap-1">
										{barber.services.map((service) => {
											return (
												<div
													className="border rounded-lg bg-slate-950 text-slate-200 text-center"
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
											width={32}
											src={iconInfo}
											alt="info_icon"
										/>
									</button>
								</td>
								<td>
									<button onClick={() => handleDeleteClick(barber)}>
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
	)
}
