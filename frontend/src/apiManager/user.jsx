import AxiosInstances from ".";

const uploadImage = async (formData) => {
  return await AxiosInstances.post("/user/upload-photo", formData);
};

const getUser = async () => {
  return await AxiosInstances.get("/user");
};

const updatedUser = async (data) => {
  return await AxiosInstances.put("/user/update-profile", data);
};

const userAPI = { updatedUser, uploadImage, getUser };

export default userAPI;
