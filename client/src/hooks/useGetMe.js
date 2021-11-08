import { useQuery } from 'react-query'
import api from '../api';

const useGetMe = (token, options) => {
  return useQuery(
    ['get-me', token], 
    () => api.getMe(),
    {
      enabled: !!token,
      ...options
    }
    
  )
}

export default useGetMe;
