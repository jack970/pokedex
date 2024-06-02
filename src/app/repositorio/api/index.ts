import axios, { AxiosError } from "axios";

const apiClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
})

apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default apiClient;