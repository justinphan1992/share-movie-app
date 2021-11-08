import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useRequireLogin = () => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged, navigate])
}

export default useRequireLogin