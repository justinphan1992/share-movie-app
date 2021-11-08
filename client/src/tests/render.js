import { render as rtlRender } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

export const render = (
  ui,
  {    
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    ...options
  } = {}
) => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }) => (    
    <QueryClientProvider client={queryClient}>   
      <MemoryRouter history={history}>
        <AuthProvider>
            {children}
        </AuthProvider>              
      </MemoryRouter>   
    </QueryClientProvider>      
  )

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),   
    history,
  }
}