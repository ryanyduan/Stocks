import axios from "axios";

const api = axios.create({
    baseURL: "//172.96.240.11:5000"
});

export const login = (credentials) =>
    api.post("/users/login", credentials).catch((err) => err.response);

export const register = (credentials) =>
    api.post("/users/register", credentials).catch((err) => err.response);
