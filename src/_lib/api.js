import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL+"/api", // Set your base URL here
    withCredentials:true
});

export default api;