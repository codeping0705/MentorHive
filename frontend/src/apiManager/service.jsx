import AxiosInstances from ".";

// Create a service
const createService = async (data) => {
  return await AxiosInstances.post("/service", data);
};

// Edit a service
const editService = async (id, data) => {
  return await AxiosInstances.put("/service/" + id, data);
};

// Get all services
const getAllService = async () => {
  return await AxiosInstances.get("/service");
};

// Get services by mentor
const getServicesByMentor = async () => {
  return await AxiosInstances.get("/service");
};

// Get service by ID
const getServiceById = async (id) => {
  return await AxiosInstances.get(`/service/${id}`);
};

export default {
  createService,
  editService,
  getAllService,
  getServicesByMentor,
  getServiceById,
};
