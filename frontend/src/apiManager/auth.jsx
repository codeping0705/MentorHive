import AxiosInstances from ".";

const signin = (data) => {
  return AxiosInstances.post("/auth/signin", data); // signin endpoint
};

const signup = (data) => {
  return AxiosInstances.post("/auth/signup", data); // signup endpoint
};

export default { signin, signup };
