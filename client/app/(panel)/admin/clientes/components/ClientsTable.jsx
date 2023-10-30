import React, { useState } from "react";
import Image from "next/image";
import editLogo from "@/public/images/Edit.png";
import historiaLogo from "@/public/images/historial.png";
import agendaIcon from "@/public/images/agenda-icon.svg";
import ClientsModal from "./ClientsModal";
import Link from "next/link";
import { Notification } from "./Notification";
import { TbEdit } from "react-icons/tb";
import { TbHistory } from "react-icons/tb";
import { TbCalendarTime } from "react-icons/tb";

export default function ClientsTable({
  setShowHistory,
  setShowClient,
  clients,
  showClient,
  clientId,
  showClientHandler,
  clientToUpdate,
  setClientToUpdate,
  updateClientHandler,
  searchClient,
  setClientAppointmentId,
  notification,
  setClientId,
}) {
  const showModalHandler = () => {
    setShowHistory(true);
  };
  return clients.length >= 1 ? (
    <div>
      <Notification notification={notification} />
      <div className="border rounded-lg mt-5 flex flex-col  overflow-x-scroll">
        <table className="w-full divide-y divide-white bg-white bg-opacity-10 table-auto">
          <thead className="bg-slate-100 h-10">
            <tr className="border-white">
              <th className="w-1/12 text-sm sm:text-base">Nombre y Apellido</th>
              <th className="w-1/12">Telefono</th>
              <th className="w-1/12">Email</th>
              <th className="w-1/12">Historial</th>
              <th className="w-1/12">Editar</th>
              <th className="w-1/12">Agendar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            {clients
              .filter((client) =>
                client.fullName
                  .toLowerCase()
                  .slice(0, searchClient.length)
                  .includes(searchClient.toLocaleLowerCase())
              )
              .map((client) => (
                <tr className="even:bg-gray-100" key={client._id}>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3">
                    {client.fullName}
                  </td>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3">
                    {client.phone}
                  </td>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3">
                    {client.email}
                  </td>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3">
                    <button
                      className="text-blue-700 hover:text-blue-900 transition text-3xl"
                      onClick={() => {
                        setClientAppointmentId(client._id);
                        showModalHandler();
                        setClientId(client);
                      }}
                    >
                      <TbHistory
                        width={30}
                        height={30}
                        alt="Historial de Cliente"
                      />
                    </button>
                  </td>
                  <td className="text-center text-xs sm:text-sm flex justify-center pt-3 pb-3">
                    <button
                      className="text-amber-500 hover:text-amber-700 transition text-3xl"
                      onClick={() => showClientHandler(client._id)}
                    >
                      <TbEdit src={editLogo} width={30} height={30} />
                    </button>
                  </td>
                  <td className="text-center text-xs  sm:text-sm pt-3 pb-3">
                    <Link
                      key={client._id}
                      href={`agenda?id=${client._id}?name=${client.fullName}`}
                    >
                      <button className="text-green-700 hover:text-green-900 transition text-3xl">
                        <TbCalendarTime
                          width={30}
                          height={30}
                          alt="Agendar Turno"
                        />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ClientsModal
          showClient={showClient}
          setShowClient={setShowClient}
          clients={clients}
          clientId={clientId}
          clientToUpdate={clientToUpdate}
          setClientToUpdate={setClientToUpdate}
          updateClientHandler={updateClientHandler}
        />
      </div>
    </div>
  ) : (
    <div>No hay clientes cargados</div>
  );
}
