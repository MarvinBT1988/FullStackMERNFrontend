import axios from 'axios';
const apiUrl = import.meta.env.VITE_APIMANT_URL;
const axiosInstance = axios.create({ 
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;