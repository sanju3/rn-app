import axios from "axios";

export const getSingleUser = async (username) => {
  const { data } = await axios.post("http://10.0.2.2:5000/user/getsingle", {
    username: username,
  });
  return data;
};

export const signIn = async (username, password) => {
  const status = await axios.post("http://10.0.2.2:5000/user/login", {
    username: username,
    password: password,
  });
  return status.data;
};

export const signUp = async (username, fullname, password) => {
  const status = await axios.post("http://10.0.2.2:5000/user/registerApp", {
    username: username,
    fullname: fullname,
    password: password,
  });
  return status;
};
