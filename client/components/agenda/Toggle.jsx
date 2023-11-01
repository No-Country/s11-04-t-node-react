const Toggle = ({isActive, setIsActive}) => {
  return (
    <label className="relative inline-flex items-center mr-5 cursor-pointer mt-4 w-fit">
      {isActive ? (
        <div className="flex">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={setIsActive}
            defaultChecked
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </div>
      ) : (
        <div className="flex">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={setIsActive}
            unchecked
          />
          <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
        </div>
      )}
    </label>
  )
}
export default Toggle
