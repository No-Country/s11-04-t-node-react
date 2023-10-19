import React from "react";

export default function ClientsModal({ showClient, setShowClient }) {
  return showClient ? (
    <div id="modal-clients-container" className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/2 sm:-translate-x-1/4 sm:-translate-y-1/2">
      <div>
        <button onClick={() => setShowClient(false)}>X</button>
      </div>
      <div>
        <form></form>
      </div>
      <button>Modificar</button>
      <button>Eliminar</button>
      <button>Cancelar</button>
    </div>
  ) : (
    <></>
  );
}
