import AxiosInstances from ".";

const getAllMentors = () => {
  return AxiosInstances.get("/mentor");
};

const getMentorByUsername = (username) => {
  return AxiosInstances.get("/mentor" + username);
};

const mentorApi = {
  getAllMentors,
  getMentorByUsername,
};

export default mentorApi;
