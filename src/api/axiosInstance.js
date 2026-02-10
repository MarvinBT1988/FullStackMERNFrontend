import axios from 'axios';
const apiUrl = import.meta.env.VITE_APIMANT_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODEyNmE5YTBjZDViOGE5MjhlNTk2MCIsInJvbCI6IkFETUlOX1JPTEUiLCJlbWFpbCI6ImFkbWluQGNvcnJlby5jb20iLCJpYXQiOjE3NzA3NDA4MzIsImV4cCI6MTc3MDc2OTYzMn0.-xfFBA0YGunH75iTtOtbXKuhBOWKwZx_I3EV3L02sqQ';
const axiosInstance = axios.create({ 
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});
export default axiosInstance;