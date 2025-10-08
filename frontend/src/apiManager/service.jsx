import AxiosInstances from ".";

const createService = async (data) => {
  return await AxiosInstances.post("/service", data);
};

const editService = async (id, data) => {
  return await AxiosInstances.put("/service" + id, data);
};

const getAllService = async () => {
  return await AxiosInstances.get("/service");
};

const getServicesByMentor = async () => {
  return await AxiosInstances.post("/service");
};

const getServiceById = async (id) => {
  return await AxiosInstances.get(`/service/${id}`);
};

export default {
  getAllService,
  getServiceById,
  getServicesByMentor,
  createService,
  editService,
};
