import React from "react";

export default function CreateClient({
  createClient,
  setCreateClient,
  submitHandler,
  newClient,
  setNewClient,
  clients,
  manageNotifications,
  notifications,
}) {
  return createClient ? (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col sm:flex-row mb-4 mt-16">
        <div className="flex flex-col w-full sm:w-1/2 mr-10">
          <label className="text-lg sm:text-xl my-2" htmlFor="clientfullName">
            Nombre y Apellido
          </label>
          <input
            className="text-slate-950 border rounded-lg p-1"
            type="name"
            id="clientName"
            name="clientName"
            value={clients.fullName}
            onChange={(e) =>
              setNewClient({ ...newClient, fullName: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mb-4">
        <div className="flex flex-col w-full sm:w-1/2 mr-10">
          <label className="text-lg sm:text-xl my-2" htmlFor="clientPhone">
            Teléfono
          </label>
          <input
            className="text-slate-950 border rounded-lg p-1"
            type="phone"
            id="clientPhone"
            name="clientPhone"
            value={clients.phone}
            onChange={(e) =>
              setNewClient({ ...newClient, phone: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 mr-auto">
          <label className="text-lg sm:text-xl my-2" htmlFor="barberEmail">
            Email
          </label>
          <input
            className={`text-slate-950 border rounded-lg p-1 `}
            type="email"
            id="clientEmail"
            name="ClientEmail"
            value={clients.email}
            onChange={(e) =>
              setNewClient({ ...newClient, email: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="flex justify-center sm:justify-end gap-2 sm:gap-6">
        <>
          <button
            className="py-1 w-28 mb-6 text-sm sm:text-base text-black border-2 border-white rounded-lg bg-[#96B593] hover:bg-white hover:border-[#96B593] transition duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
            type="submit"
          >
            Guardar
          </button>
          <button
            className="py-1 w-28 mb-6 text-sm sm:text-base text-black border-2 border-white rounded-lg bg-[#BC8F86] hover:bg-white hover:border-[#BC8F86] transition duration-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
            type="button"
            onClick={() => setCreateClient(false)}
          >
            Cancelar
          </button>
        </>
      </div>
    </form>
  ) : (
    <></>
  );
}
