import AxiosInstances from ".";

const createSchedule = async (data) => {
  return await AxiosInstances.post("/schedule", data);
};

const getSchedulesByMentor = async () => {
  return await AxiosInstances.get("/schedule");
};

const updateSchedule = async (id, data) => {
  return await AxiosInstances.put(`/schedule/${id}`, data);
};

export default {
  createSchedule,
  getSchedulesByMentor,
  updateSchedule,
};
