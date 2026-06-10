import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use((config) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.email && user?.password) {
    config.headers.Authorization =
      "Basic " + btoa(user.email + ":" + user.password);
  }

  return config;
});

export default api;