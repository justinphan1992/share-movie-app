import axios from '../axios';

const apis = {
  login: (email, password) => axios.post('/login', { email, password }),
  logout: () => axios.post('/logout'),
  getMe: () => axios.get('/me'),
  getVideo: (offset) => axios.get(`/video?offset=${offset}`),
  rating: (videoId, vote) => axios.post(`/video/${videoId}/rating`, { vote }),
  share: ({ url }) => axios.post(`/video`, { url }),
}

export default apis