import React, { useState, useEffect } from "react";
import ClientDelete from "./ClientDelete";

export default function ClientsModal({
  showClient,
  setShowClient,
  clients,
  clientId,
  deleteSelectedClient,
  clientToUpdate,
  setClientToUpdate,
  updateClientHandler,
}) {
  const [cancelUpdate, setCancelUpdate] = useState(false);
  const [modalDeleteClient, setModalDeleteClient] = useState(false);

  const originalClientState = {
    fullName: clientId.fullName,
    phone: clientId.phone,
    email: clientId.email,
  };

  useEffect(() => {
    if (cancelUpdate) {
      setClientToUpdate(originalClientState);
      setCancelUpdate(false);
    }
  }, [cancelUpdate, setClientToUpdate, originalClientState]);
  return showClient ? (
    <div
      id="modal-clients-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/2 sm:-translate-x-1/4 sm:-translate-y-1/2"
    >
      <div>
        <button onClick={() => setShowClient(false)}>X</button>
      </div>
      <div>
        <form /*onSubmit={updateClientHandler}*/>
          <div className="flex flex-col sm:flex-row mb-4">
            <div className="flex flex-col w-full sm:w-1/2 mr-10">
              <label className="text-lg sm:text-xl my-2" htmlFor="barberPhone">
                Nombre y Apellido
              </label>
              <input
                className="text-slate-950 border rounded-lg p-1"
                type="name"
                id="clientName"
                name="clientName"
                placeholder={clientId.fullName}
                onChange={(e) =>
                  setClientToUpdate({
                    ...clientToUpdate,
                    fullName: e.target.value,
                  })
                }
                //required
                //disabled={disabled}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4">
            <div className="flex flex-col w-full sm:w-1/2 mr-10">
              <label className="text-lg sm:text-xl my-2" htmlFor="barberPhone">
                Teléfono
              </label>
              <input
                className="text-slate-950 border rounded-lg p-1"
                type="phone"
                id="clientPhone"
                name="clientPhone"
                placeholder={clientId.phone}
                onChange={(e) =>
                  setClientToUpdate({
                    ...clientToUpdate,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/2 mr-auto">
              <label className="text-lg sm:text-xl my-2" htmlFor="clientEmail">
                Email
              </label>
              <input
                className={`text-slate-950 border rounded-lg p-1 `}
                type="email"
                id="clientEmail"
                name="clientEmail"
                placeholder={clientId.email} // Usa el valor del estado clientToUpdate.email
                onChange={(e) =>
                  setClientToUpdate({
                    ...clientToUpdate,
                    email: e.target.value, // Actualiza solo la propiedad email
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-center sm:justify-end gap-2 sm:gap-6">
            <>
              <button
                className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#96B593] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
                type="submit"
              >
                Modificar
              </button>
              <button
                className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#C65F5F] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
                type="button"
                onClick={() => {setModalDeleteClient(true)}}
              >
                Eliminar
              </button>
              <button
                className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#BC8F86] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
                type="button"
                onClick={() => {
                  setShowClient(false), setCancelUpdate(true);
                }}
              >
                Cancelar
              </button>
            </>
          </div>
        </form>
      </div>
      <ClientDelete deleteSelectedClient={deleteSelectedClient} modalDeleteClient={modalDeleteClient} setModalDeleteClient={setModalDeleteClient}/>
    </div>
  ) : (
    <></>
  );
}
