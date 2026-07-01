import axios from "axios";

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:4000/api/v1" : "/api/v1"

const api = axios.create({
  baseURL : BASE_URL
})

api.interceptors.request.use((config) =>{  // ← CORRECT
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) =>{  // ← Also change this
  return response;
}, async(error) =>{
  const originalRequest = error.config;

  if(error.response.status === 401 && !originalRequest._retry){
    originalRequest._retry = true;

    try {
      const response = await axios.post(
          `${BASE_URL}/users/refresh-token`,
          { refreshToken: sessionStorage.getItem('refresh_token') }
        );

        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('refresh_token', response.data.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return api(originalRequest);
      
    } catch (refreshError) {
      sessionStorage.clear();
      window.location.href = '/login'
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error)
})

export default api;