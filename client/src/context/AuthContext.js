import { useState, createContext, useContext, useEffect } from 'react';
import useGetMe from '../hooks/useGetMe';

const AuthContext = createContext({
  user: null,
  isLogged: false
})
 
const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ isLogged, setLogged ] = useState(false);
  const [ token, setToken ] = useState(localStorage.getItem('token'));
  
  const { isLoading } = useGetMe(token, {     
    onSuccess: (response) => {
      setUser(response);
      setLogged(true);
    }    
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLogged(false);
    }
  }, [token])

  const value = { user, isLogged, setToken };

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;