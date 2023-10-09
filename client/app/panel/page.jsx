import Link from "next/link";

export default function PanelPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div>
          <h1 className="uppercase text-3xl pb-4">Bienvenido Juan</h1>
          <h3 className="pb-10">Que desea hacer:</h3>
        </div>
        <div className="flex flex-col gap-16">
          <Link href="/panel/barbero/agenda">AGENDAR TURNOS</Link>
          <Link href="/panel/barbero/cronograma">VER TURNOS</Link>
          <Link href="/panel/barbero/clientes">REGISTRAR CLIENTES</Link>
          <Link href="/panel/barbero/servicios">ATENCIONES AL CLIENTE</Link>
        </div>
      </div>
    </div>
  );
}
