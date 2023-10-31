import Image from 'next/image'
import { MdOutlineDoNotDisturbOn } from 'react-icons/md'
import { TbEdit } from 'react-icons/tb'

export const BarbersTable = ({
	barbers,
	handleDetailsClick,
	handleDeleteClick,
}) => {
	return (
		<div className="border rounded-lg">
			<table className="w-full divide-y divide-white bg-white bg-opacity-10">
				<thead className="bg-slate-100 h-10">
					<tr className="border-white">
						<th className="w-4/12 text-sm sm:text-base text">Nombre</th>
						<th className="w-auto text-sm sm:text-base">Servicios</th>
						<th className="w-auto"></th>
						<th className="w-auto"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white">
					{barbers.map((barber) => {
						return (
							<tr
								className="even:bg-gray-100"
								key={barber._id}
							>
								<td className="text-left pl-4 text-xs sm:text-sm">{barber.fullName}</td>
								<td>
									<div className="flex flex-wrap justify-center gap-1">
										{barber.services.map((service) => {
											return (
												<div
													className="text-center border rounded-xl bg-slate-950 text-slate-200 text-xs px-2 py-1"
													key={service._id}
												>
													{service.name}
												</div>
											)
										})}
									</div>
								</td>
								<td>
									<button
										title="Modificar"
										onClick={() => handleDetailsClick(barber)}
									>
										<TbEdit className="text-amber-500 hover:text-amber-700 flex items-center transition text-3xl" />
									</button>
								</td>
								<td>
									<button
										title="Eliminar"
										onClick={() => handleDeleteClick(barber)}
									>
										<MdOutlineDoNotDisturbOn className="text-red-500 hover:text-red-700 flex items-center transition text-3xl" />
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
