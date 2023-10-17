"use client";
import { ServiceTimeList } from "@/components/shared/service/ServiceTimeList";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AdminServicesService } from "@/services/admin.services";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";

const getServicesKey = "services";

export default function ServiceRegistrationPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { data: services, mutate } = useSWR(
    getServicesKey,
    AdminServicesService.getServices
  );
  // console.log(services);

  return (
    <>
      <div className="bg-[#D9D9D9] sm:bg-white">
        <div className="flex flex-col min-h-screen p-4 md:p-14 bg-[#D9D9D9] rounded-t-2xl">
          <div
            inert={showModal ? "" : undefined}
            className={showModal ? "blur-sm" : ""}
          >
            <h1 className="max-sm:hidden sm:text-4xl sm:pb-10">Servicios</h1>

            <ServiceForm
              onDone={() => {
                // Refrescar la tabla
                mutate();
              }}
            />

            {/* Tabla */}
            <div className="overflow-auto rounded-md">
              <table className="table-auto px-4 py-8 w-full">
                <thead className="bg-white border-b-4 border-gray-300">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Servicios
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Precio
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Tiempo
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Editar
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Eliminar
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {services?.map((service) => (
                    <tr key={service._id} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {service.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span>$</span>
                        {service.price}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {service.duration}
                        <span>min</span>
                      </td>

                      <td className="px-6 py-1 text-gray-700 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setShowModal(true);
                          }}
                          className="text-amber-500 hover:text-amber-700 flex items-center transition text-3xl"
                        >
                          <TbEdit />
                        </button>
                      </td>

                      <td className="px-6 py-1 text-gray-700 whitespace-nowrap">
                        <ServiceFormDeleted service={service} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Boton Editar */}
      <Modal
        onDone={() => {
          mutate();
        }}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      >
        <ServiceForm
          key={selectedService}
          service={selectedService}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
}

const ServiceForm = ({ service, onDone, onCancel }) => {
  const methods = useForm({ defaultValues: service || { duration: "15 min" } });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);

    try {
      if (service) {
        // Llamar el Endpoint de editar
        await AdminServicesService.updateService(service._id, data);
        toast.success("Servicio editado correctamente!");
      } else {
        // Llamar el Endpoint de creación
        await AdminServicesService.createService(data);
        toast.success("Servicio creado correctamente!");
        // Despues de llamar al Endpoint resetear
        reset();
      }

      onDone?.();
      // Mostrar toast
    } catch (error) {
      console.error(error);
      toast.error("Ocurrio un error.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:justify-between gap-2 sm:gap-4 pb-8">
          <div>
            <label className="flex flex-col gap-2 pb-1">
              <span className="sm:text-2xl">Servicio</span>
              <input
                {...register("name", { required: true })}
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 text-black"
                type="text"
                placeholder="Ingrese nombre del servicio"
              />
            </label>
            {errors.name && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
          </div>

          <div>
            <label className="flex flex-col gap-2 pb-1">
              <span className="sm:text-2xl">Precio</span>
              <input
                {...register("price", {
                  required: true,
                  setValueAs: (v) => v + "",
                })}
                className="py-1.5 px-3 rounded-md shadow-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-300 text-black"
                type="text"
                placeholder="Ingrese el precio"
              />
            </label>
            {errors.price && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
          </div>

          <label className="flex flex-col gap-2">
            <span className="sm:text-2xl">Tiempo</span>
            <ServiceTimeList />
          </label>
        </div>

        <div className="flex justify-end gap-4 pb-8">
          <div className="p-0.5 bg-white rounded-md flex items-center self-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#96B593] border-[#96B593] hover:bg-white hover:border-[#96B593] border-2 transition duration-300"
            >
              {!service ? "Guardar" : "Modificar"}
            </button>
          </div>
          {service && (
            <div className="p-0.5 bg-white rounded-md flex items-center self-end">
              <button
                onClick={() => onCancel?.()}
                type="button"
                className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#BC8F86] border-[#BC8F86] hover:bg-white hover:border-[#BC8F86] border-2 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

const ServiceFormDeleted = ({ service }) => {
  const [deletedModal, setDeletedModal] = useState(false);
  const { mutate } = useSWRConfig();

  return (
    <>
      <button
        onClick={() => setDeletedModal(true)}
        className="text-red-500 hover:text-red-700 flex items-center transition text-3xl"
      >
        <MdOutlineDoNotDisturbOn />
      </button>

      <Modal
        isVisible={deletedModal}
        onClose={() => setDeletedModal(false)}
        message={
          <div className="flex flex-col">
            <h2 className="text-center text-2xl">
              ¿Desea eliminar el servicio?
            </h2>
            <div className="flex justify-end gap-4 py-9">
              <div className="p-0.5 bg-white rounded-md flex items-center self-end">
                <button
                  className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#BC8F86] border-[#BC8F86] hover:bg-white hover:border-[#BC8F86] border-2 transition duration-300"
                  onClick={async () => {
                    await AdminServicesService.deletedService(service._id);
                    await mutate(getServicesKey);
                    setDeletedModal(false);
                    toast.success("Servicio Eliminado!");
                  }}
                >
                  Eliminar
                </button>
              </div>
              <div className="p-0.5 bg-white rounded-md flex items-center self-end">
                <button
                  onClick={() => setDeletedModal(false)}
                  type="button"
                  className="w-full flex items-center justify-center py-0.5 px-6 rounded-md text-xl text-black hover:text-black bg-[#96B593] border-[#96B593] hover:bg-white hover:border-[#96B593] border-2 transition duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
