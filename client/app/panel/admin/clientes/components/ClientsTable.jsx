
import React from "react";
import Image from "next/image";
import editLogo from "@/public/images/Edit.png";
import historiaLogo from "@/public/images/historial.png";

export default function ClientsTable({ setShowHistory,setShowClient }) {

const showModalHandler = () =>{
  console.log("click");
  setShowHistory(true)
}

const showClientHandler = () =>{
  setShowClient(true)
}
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
            <td className="text-center text-xs sm:text-sm pt-3 pb-3">nombre</td>
            <td className="text-center text-xs sm:text-sm pt-3 pb-3">
              apellido
            </td>
            <td className="text-center text-xs sm:text-sm pt-3 pb-3">
              telfono
            </td>
            <td className="text-center text-xs sm:text-sm pt-3 pb-3">
              email@email
            </td>
            <td className="text-center text-xs sm:text-sm pt-3 pb-3">
              <button onClick={() => showModalHandler()}>
                <Image src={historiaLogo} width={30} height={30}></Image>
              </button>
            </td>
            <td className="text-center text-xs sm:text-sm flex justify-center pt-3 pb-3">
              <button onClick={() => showClientHandler()}>
                <Image
                  className=""
                  src={editLogo}
                  width={30}
                  height={30}
                ></Image>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
