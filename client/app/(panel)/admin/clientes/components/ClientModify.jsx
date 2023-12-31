import React from "react";

function ClientModify({
  setModalModifyClient,
  modalModifyClient,
  updateClientHandler,
}) {
  return modalModifyClient ? (
    <div
      id="modal-clients-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 top-32 sm:top-1/2 h-[70vh] sm:h-fit overflow-hidden left-1/2 -translate-x-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 fixed"
    >
      <div className="flex justify-end">
        <button onClick={() => setModalModifyClient(false)}>X</button>
      </div>
      <div>Desea modificar los datos de este cliente?</div>
      <div className="flex">
        <button
          className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#96B593] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
          type="submit"
          onClick={() => {
            updateClientHandler();
            setModalModifyClient(false);
          }}
        >
          Confirmar
        </button>
        <button
          className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#C65F5F] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
          type="button"
          onClick={() => setModalModifyClient(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ClientModify;
