import axios from 'axios';
const apiUrl = import.meta.env.VITE_APIMANT_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODEyNmE5YTBjZDViOGE5MjhlNTk2MCIsInJvbCI6IkFETUlOX1JPTEUiLCJlbWFpbCI6ImFkbWluQGNvcnJlby5jb20iLCJpYXQiOjE3NzAzMjA3MDksImV4cCI6MTc3MDM0OTUwOX0.asmNGs_Q8pQctqf8IHSzNmbj0vBnczKmKuGhPGMFX30';
const axiosInstance = axios.create({ 
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});
export default axiosInstance;