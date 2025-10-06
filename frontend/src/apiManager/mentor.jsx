import AxiosInstances from ".";

const getAllMentors = () => {
  return AxiosInstances.get("/mentors"); // ✅ match backend
};

const getMentorByUsername = (username) => {
  return AxiosInstances.get(`/mentor/${username}`);
};

const mentorApi = {
  getAllMentors,
  getMentorByUsername,
};

export default mentorApi;
