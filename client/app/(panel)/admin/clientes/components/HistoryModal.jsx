import React, { useState, useEffect } from "react";

export default function HistoryModal({
  showHistory,
  setShowHistory,
  showAppointments,
  clientAppointmentId,
  clientServices,
  allClients,
  setClientServices,
}) {
  useEffect(() => {
    showAppointments();
  }, [clientAppointmentId]);

  const foundClient = allClients?.length
  ? allClients.find((client) => client._id === clientAppointmentId)
  : null;
console.log(clientServices);
  return showHistory ? (
    <div
      id="modal-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 top-32 sm:top-1/2 h-[70vh] sm:h-fit overflow-x-auto  left-1/2 -translate-x-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 fixed sm:w-auto w-80"
    >
      <div id="modal-header" className="flex justify-between">
        <h2 className="pt-5 pb-5">{foundClient?.fullName}</h2>
        <button className="pb-12" onClick={() => setShowHistory(false)}>
          X
        </button>
      </div>
      <div id="modal-table">
        <table className="w-full divide-y divide-white bg-white bg-opacity-10 table-auto">
          <thead className=" h-10">
            <tr className="border-white">
              <th className="w-1/12 text-sm sm:text-base">Fecha</th>
              <th className="w-1/12 text-sm sm:text-base">Servicio</th>
              <th className="w-1/12 text-sm sm:text-base">Barbero</th>
              <th className="w-1/12 text-sm sm:text-base">Estado</th>
            </tr>
          </thead>
          {clientServices && clientServices.length >= 1 ? (
            <tbody className="divide-y divide-white w-60">
              {clientServices.map((services) => (
                <tr className="bg-slate-100" key={services.id}>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3 text-black">
                    {services.date}
                  </td>
                  <td className="flex flex-wrap">
                    {services.services.map((service) => (
                      <span
                        key={service._id}
                        className=" text-center border rounded-lg bg-slate-950 text-slate-200 text-[0.5rem] sm:text-sm mx-5 px-5"
                      >
                        {service.name}
                      </span>
                    ))}
                  </td>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3 text-black">
                    {services.barberId?.fullName}
                  </td>
                  <td className="text-center text-xs sm:text-sm pt-3 pb-3 text-black">
                    {services.status}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3" className="text-center text-white">
                  {clientServices.length === 0
                    ? "Cliente sin citas"
                    : "Error al cargar citas del cliente"}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  ) : (
    <></>
  );
}
