const Input = ({ type, name, event, onBlur, value, label, style, placeholder }) => {
  const className =
    "outline-none h-10 pl-1 border-b-2 border-gray-200 rounded-xl " + style;
  return (
    <div className="grid w-full">
      <label htmlFor={name} className="capitalize tracking-widest py-1 text-white font-medium text-2xl">{label}</label>
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
  );
};
export default Input;
