import React from "react";

function ClientDelete({
  modalDeleteClient,
  setModalDeleteClient,
  deleteSelectedClient,
}) {
  return modalDeleteClient ? (
    <div
      id="modal-clients-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/2 sm:-translate-x-1/4 sm:-translate-y-1/2"
    >
      <div className="flex justify-end">
        <button onClick={() => setModalDeleteClient(false)}>X</button>
      </div>
      <div>Esta seguro que desea eliminar este cliente?</div>
      <div className="flex">
        <button
          className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#96B593] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
          onClick={() => {
            deleteSelectedClient(), setModalDeleteClient(false);
          }}
        >
          Confirmar
        </button>
        <button
          className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#C65F5F] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
          type="button"
          onClick={() => {
            setModalDeleteClient(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ClientDelete;
