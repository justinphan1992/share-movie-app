import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const onRequest = (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config
}

const onResponse = (response) => {
  return response.data
}

instance.interceptors.request.use(onRequest)
instance.interceptors.response.use(onResponse)

export default instance;