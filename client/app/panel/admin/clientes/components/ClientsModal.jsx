import React from "react";

export default function ClientsModal({ showClient, setShowClient }) {
  return showClient ? (
    <div
      id="modal-clients-container"
      className="bg-[#292D33] text-white border rounded-lg p-5 absolute top-[12vh] sm:top-1/2 h-[75vh] sm:h-fit overflow-hidden overflow-y-scroll left-1/2 -translate-x-1/2 sm:-translate-x-1/4 sm:-translate-y-1/2"
    >
      <div>
        <button onClick={() => setShowClient(false)}>X</button>
      </div>
      <div>
        <form /*onSubmit={submitHandler}*/>
          <div className="flex flex-col sm:flex-row mb-4">
            <div className="flex flex-col w-full sm:w-1/2 mr-10">
              <label className="text-lg sm:text-xl my-2" htmlFor="barberPhone">
                Nombre
              </label>
              <input
                className="text-slate-950 border rounded-lg p-1"
                type="name"
                id="clientName"
                name="clientName"
                //value={barber.phone}
                //onChange={(e) => setBarber({ ...barber, phone: e.target.value })}
                //required
                //disabled={disabled}
              />
            </div>

            <div className=" flex flex-col w-full sm:w-1/2  mr-auto">
              <label className="text-lg sm:text-xl my-2" htmlFor="barberEmail">
                Apellido
              </label>
              <input
                className="text-slate-950 border rounded-lg p-1"
                type="surname"
                id="clientSurname"
                name="clientSurname"
                //value={barber.email}
                //onChange={(e) => setBarber({ ...barber, email: e.target.value })}
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
                //value={barber.phone}
                //onChange={(e) => setBarber({ ...barber, phone: e.target.value })}
                //required
                //disabled={disabled}
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
                // value={barber.email}
                // onChange={(e) => setBarber({ ...barber, email: e.target.value })}
                // required
              />
            </div>
          </div>
          <div className="flex justify-center sm:justify-end gap-2 sm:gap-6">
            <>
              <button
                className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#96B593] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
                type="submit"
                // disabled={disabled}
              >
                Guardar
              </button>
              <button
                className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-1 w-28 bg-[#BC8F86] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white"
                type="button"
                onClick={() => setCreateClient(false)}
              >
                Cancelar
              </button>
            </>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
