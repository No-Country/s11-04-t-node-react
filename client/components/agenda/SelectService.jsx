const services = [
    {
        name: "lavado_de_cabello",
        text: "Lavado de cabello"
    },
    {
        name: "tintura",
        text: "Tintura"
    }
]

const SelectService = () => {
    return (
        <div className="flex flex-col text-sm gap-y-2 text-stone-700 w-full">
            <label >Categoría:</label>
            <select name='category' onChange={handleChange} className="block py-1.5 px-2 w-full text-sm text-stone-700 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200/50 peer">
                <option >Elige un servicio</option>
                {
                    services.map(category => {
                        return (
                            <option key={`a${category.name}`} value={category.name}>{category.text}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
export default SelectService;
