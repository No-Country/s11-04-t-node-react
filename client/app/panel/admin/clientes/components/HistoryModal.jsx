import React from "react";

export default function HistoryModal({ showHistory, setShowHistory }) {
  return showHistory ? (
    <div
      id="modal-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/4 sm:-translate-x-1/2 sm:-translate-y-1/2 w-2/6"
    >
      <div id="modal-header" className="flex justify-between">
        <h2 className="pt-5 pb-5">nombre.cliente</h2>
        <button className="pb-12" onClick={() => setShowHistory(false)}>
          X
        </button>
      </div>
      <div id="modal-table">
        <table className="w-full divide-y divide-white bg-white bg-opacity-10">
          <thead className=" h-10">
            <tr className="border-white">
              <th className="w-1/12 text-sm sm:text-base">Fecha</th>
              <th className="w-1/12 text-sm sm:text-base">Servicio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            <tr className="bg-slate-100" key="id">
              <td className="text-center text-xs sm:text-sm pt-3 pb-3 text-black">
                10/09/23
              </td>
              <td className="text-center border rounded-lg bg-slate-950 text-slate-200 text-xs">
                corte
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <></>
  );
}
