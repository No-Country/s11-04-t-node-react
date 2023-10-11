"use client";
import { ServicetimeList } from "@/components/shared/service/ServicetimeList";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";

export default function ServiceRegistrationPage() {
  const [showModal, setShowModal] = useState(false);
  const [deletedModal, setDeletedModal] = useState(false);

  return (
    <>
      <div className="min-h-screen p-4 md:p-14 bg-[#D9D9D9]">
        <div className="flex flex-col">
          <h1 className="max-sm:hidden sm:text-4xl sm:pb-10">Servicios</h1>
          <form className="grid grid-cols-1 sm:grid-cols-4 sm:justify-between gap-4 sm:gap-20 pb-12">
            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Servicio</span>
              <input
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 "
                type="text"
                required
                placeholder="Ingrese su servicio"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Precio</span>
              <input
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 "
                type="text"
                required
                placeholder="Ingrese el precio"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Tiempo</span>
              <ServicetimeList />
            </label>

            <div className="p-0.5 bg-white rounded-md flex items-center self-end mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center p-0.5 rounded-md text-xl text-black hover:text-black bg-[#96B593] border-[#96B593] hover:bg-white hover:border-[#96B593] border-2 transition duration-300"
              >
                Guardar
              </button>
            </div>
          </form>

          <div className="overflow-auto rounded-md">
            <table className="table-auto px-4 py-8 w-full">
              <thead className="bg-white border-b-4 border-gray-300">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Servicios
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Precio
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Tiempo
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Editar
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Eliminar
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Corte
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span>$</span>200
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    15<span>min</span>
                  </td>

                  <td className="px-6 py-1 text-gray-700 whitespace-nowrap">
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-amber-500 hover:text-amber-700 flex items-center transition text-3xl"
                    >
                      <TbEdit />
                    </button>
                  </td>

                  <td className="px-6 py-1 text-gray-700 whitespace-nowrap">
                    <button
                      onClick={() => setDeletedModal(true)}
                      className="text-red-500 hover:text-red-700 flex items-center transition text-3xl"
                    >
                      <MdOutlineDoNotDisturbOn />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col">
          <form className="grid grid-cols-1 sm:grid-cols-3 sm:justify-between gap-2 sm:gap-4 pb-8">
            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Servicio</span>
              <input
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 "
                type="text"
                required
                placeholder="Ingrese su servicio"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Precio</span>
              <input
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 "
                type="text"
                required
                placeholder="Ingrese el precio"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="sm:text-2xl">Tiempo</span>
              <ServicetimeList />
            </label>
          </form>
          <div className="flex justify-end gap-4">
            <div className="p-0.5 bg-white rounded-md flex items-center self-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#96B593] border-[#96B593] hover:bg-white hover:border-[#96B593] border-2 transition duration-300"
              >
                Modificar
              </button>
            </div>
            <div className="p-0.5 bg-white rounded-md flex items-center self-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#BC8F86] border-[#BC8F86] hover:bg-white hover:border-[#BC8F86] border-2 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isVisible={deletedModal} onClose={() => setDeletedModal(false)}>
        <div className="flex flex-col">
          <h2 className="text-center text-2xl">¿Desea eliminar el servicio?</h2>
          <div className="flex justify-end gap-4 py-9">
            <div className="p-0.5 bg-white rounded-md flex items-center self-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#BC8F86] border-[#BC8F86] hover:bg-white hover:border-[#BC8F86] border-2 transition duration-300"
              >
                Eliminar
              </button>
            </div>
            <div className="p-0.5 bg-white rounded-md flex items-center self-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#96B593] border-[#96B593] hover:bg-white hover:border-[#96B593] border-2 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
