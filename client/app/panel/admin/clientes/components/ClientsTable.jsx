import React from "react";

export default function ClientsTable() {
  return (
    <div className="border rounded-lg mt-12">
      <table className="w-full divide-y divide-white bg-white bg-opacity-10">
        <thead className="bg-slate-100 h-10">
          <tr className="border-white">
            <th className="w-1/12 text-sm sm:text-base">Nombre</th>
            <th className=" w-1/12 text-sm sm:text-base">Apellido</th>
            <th className="w-1/12">Telefono</th>
            <th className="w-1/12">Email</th>
            <th className="w-1/12">Historial</th>
            <th className="w-1/12">Editar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white">
          <tr className="even:bg-gray-100" key="id">
            <td className="text-center text-xs sm:text-sm">nombre</td>
            <td className="text-center text-xs sm:text-sm">apellido</td>
            <td className="text-center text-xs sm:text-sm">telfono</td>
            <td className="text-center text-xs sm:text-sm">email@email</td>
            <td className="text-center text-xs sm:text-sm">historial</td>
            <td className="text-center text-xs sm:text-sm">editar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
