const Input = ({
	type,
	name,
	event,
	onBlur,
	value,
	label,
	style,
	placeholder,
}) => {
	const className = `outline-none pl-1 border rounded-xl border-slate-300 ${style}`
	return (
		<div className="grid w-full">
			<label
				htmlFor={name}
				className="text-xl tracking-widest pb-2 text-white font-normal"
			>
				{label}
			</label>
			<input
				required
				className={className}
				type={type}
				name={name}
				id={name}
				onChange={event}
				onBlur={onBlur}
				value={value}
				placeholder={placeholder}
			/>
		</div>
	)
}
export default Input
