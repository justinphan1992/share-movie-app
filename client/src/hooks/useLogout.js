import { useMutation } from 'react-query'
import api from '../api';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const { setToken } = useAuthContext();
  return useMutation(
    () => api.logout(),
    {
      onMutate: () => {
        setToken(null)        
      },     
      onSuccess: () => {
        localStorage.removeItem('token');
      }
    }
  )
}

export default useLogout;
