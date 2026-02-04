import axios from 'axios';
const apiUrl = import.meta.env.VITE_APIMANT_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODEyNmE5YTBjZDViOGE5MjhlNTk2MCIsInJvbCI6IkFETUlOX1JPTEUiLCJlbWFpbCI6ImFkbWluQGNvcnJlby5jb20iLCJpYXQiOjE3NzAyNDI5NTQsImV4cCI6MTc3MDI3MTc1NH0.uF-uBrnz82H-LmjziT5ilyoPjlulzfu3bx-_CCEviwo';
const axiosInstance = axios.create({ 
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});
export default axiosInstance;