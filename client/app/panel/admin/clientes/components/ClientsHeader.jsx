import React from "react";
import "./ClientsHeader.css";

export default function ClientsHeader({
  createClient,
  setCreateClient,
  setSearchClient,
}) {
  return (
    <div className="flex justify-between">
      <div id="clients-title-container" className="flex pt-10 px-10">
        <h1 className="text-3xl sm:text-4xl">Clientes</h1>
        <button
          className="text-sm sm:text-base text-slate-950 mb-6 border border-black rounded-lg py-2 w-28 bg-[#96B593] disabled:bg-slate-200 disabled:text-slate-400 disabled:border-white ml-10 mt-1"
          onClick={() => setCreateClient(true)}
        >
          Crear Cliente
        </button>
      </div>
      <div id="form-search-container" className="pt-10 px-10">
        <form class="form">
          <button>
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input
            class="input"
            placeholder="Buscar Cliente"
            required=""
            type="text"
            onChange={(e) => setSearchClient(e.target.value)}
          />
          <button class="reset" type="reset">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
