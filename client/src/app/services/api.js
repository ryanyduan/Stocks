import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const publicRoutes = ["/users/login", "/users/register"];

const api = axios.create({
    baseURL: "//172.96.240.11:5000"
});

api.interceptors.request.use(
    (config) => {
        const url = config.url;
        if (!publicRoutes.includes(url)) config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = (credentials) => api.post("/users/login", credentials).catch((err) => err.response);

export const logout = () => api.post("/users/logout").catch((err) => err.response);

export const register = (credentials) => api.post("/users/register", credentials).catch((err) => err.response);

export const getStocks = () => api.get("/stocks/getStocks").catch((err) => err.response);

export const addStock = (stock) => api.post("/stocks/addStock", stock).catch((err) => err.response);

export const deleteStock = (stock) => api.post("/stocks/deleteStock", stock).catch((err) => err.response);
