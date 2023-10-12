import BarberForm from './BarberForm'

const BarberDetailsModal = ({
	onCancel,
	toModifyBarber,
	setToModifyBarber,
	barbers,
	setBarbers,
	servicesList,
	setShowDetailsModal,
	handleCheckboxToggle,
}) => {
	const onSave = async (e) => {
		e.preventDefault()
		const selectedServices = toModifyBarber.services
			.filter((service) => service.checked && service)
			.map((service) => service.name)
		const barberToModify = { ...toModifyBarber, services: selectedServices }

		// const modifiedBarber = await updateBarber(barberToModify)

		// REEMPLAZAR REGISTRO CON modifiedBarber DEVUELTO POR SERVER

		setBarbers(
			barbers.map((barber) => {
				return barber._id === barberToModify._id ? barberToModify : barber
			})
		)
		setShowDetailsModal(false)
	}

	return (
		<div className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2">
			<BarberForm
				submitHandler={onSave}
				barber={toModifyBarber}
				setBarber={setToModifyBarber}
				onClickCancel={onCancel}
				servicesList={servicesList}
				handleCheckboxToggle={handleCheckboxToggle}
				confirmButtonTag="Guardar"
				action="modify"
			/>
		</div>
	)
}
export default BarberDetailsModal
