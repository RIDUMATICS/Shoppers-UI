import axios from 'axios';
import router from './router';
import store from './store';
import shoppersError from './service/customError';

const axiosInstance = axios.create({
  baseURL: 'https://shoppers-api.herokuapp.com',
  headers: {
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (err) => {
  // token has expire
  const { data: { error }, status} = err.response;
  if(status === 401) {
    const path = router.currentRoute.value.fullPath;
    store.commit('popupAlert', { head: 'Session has expired', body: 'please login to continue', status: 'error'})
    store.dispatch('logoutUser')
    router.push({ name: 'login', query: { redirect: path } })
  }
  else if(status === 404) {
    router.push({ name: 'not-found' })
  }
  return Promise.reject(new shoppersError(error, status));
});

export default axiosInstance;