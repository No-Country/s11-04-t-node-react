import React, { useState } from "react";
import Image from "next/image";
import editLogo from "@/public/images/Edit.png";
import historiaLogo from "@/public/images/historial.png";
import agendaIcon from "@/public/images/agenda-icon.svg";
import ClientsModal from "./ClientsModal";

export default function ClientsTable({
  setShowHistory,
  setShowClient,
  clients,
  showClient,
  deleteSelectedClient,
  clientId,
  showClientHandler,
  clientToUpdate,
  setClientToUpdate,
  updateClientHandler,
  searchClient,
}) {
  const showModalHandler = () => {
    console.log("click");
    setShowHistory(true);
  };

  console.log(clientId);
  return clients.length >= 1 ? (
    <div className="border rounded-lg mt-12">
      <table className="w-full divide-y divide-white bg-white bg-opacity-10">
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
                  <button onClick={() => showModalHandler()}>
                    <Image src={historiaLogo} width={30} height={30}></Image>
                  </button>
                </td>
                <td className="text-center text-xs sm:text-sm flex justify-center pt-3 pb-3">
                  <button onClick={() => showClientHandler(client._id)}>
                    <Image
                      className=""
                      src={editLogo}
                      width={30}
                      height={30}
                    ></Image>
                  </button>
                </td>
                <td className="text-center text-xs  sm:text-sm pt-3 pb-3">
                  <button onClick={() => showClientHandler()}>
                    <Image
                      className=""
                      src={agendaIcon}
                      width={30}
                      height={30}
                    ></Image>
                  </button>
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
        deleteSelectedClient={deleteSelectedClient}
        clientToUpdate={clientToUpdate}
        setClientToUpdate={setClientToUpdate}
        updateClientHandler={updateClientHandler}
      />
    </div>
  ) : (
    <div>No hay clientes cargados</div>
  );
}
