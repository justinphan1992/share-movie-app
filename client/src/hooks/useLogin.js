import { useMutation } from 'react-query'
import api from '../api';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const { setToken } = useAuthContext();
  return useMutation(
    ({ email, password }) => api.login( email, password ),
    {
      onSuccess: (response) => {
        setToken(response.token)
        localStorage.setItem('token', response.token)
      }
    }
  )
}

export default useLogin;
