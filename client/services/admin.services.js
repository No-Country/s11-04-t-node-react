import { client } from "@/config/client";

// POST request
async function createService({ name, duration, price }) {
  const res = await client.post("/api/v1/services/create", {
    name,
    duration: duration + "",
    price,
  });
  return res.data;
}

//GET request
async function getServices() {
  const res = await client.get("/api/v1/services/get-services");
  return res.data.services;
}

//GET request
async function getServiceId(_id) {
  const res = await client.get(`/api/v1/services/get-services/${_id}`);
  return res.data;
}

//PUT request
async function updateService(_id, data) {
  const res = await client.put(`/api/v1/services/modify/${_id}`, {
    ...data,
    duration: data.duration + "",
  });
  return res.data;
}

//DELETE request
async function deletedService(_id) {
  return client.delete(`/api/v1/services/delete/${_id}`);
}

export const AdminServicesService = {
  createService,
  getServices,
  getServiceId,
  updateService,
  deletedService,
};
