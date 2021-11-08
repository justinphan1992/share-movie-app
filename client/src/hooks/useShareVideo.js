import { useMutation, useQueryClient } from 'react-query'
import api from '../api';
import { useNavigate } from 'react-router-dom'

const useShareVideo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (data) => api.share(data),
    {
      onSuccess: async() => {
        await queryClient.invalidateQueries(['videos'])              
        navigate('/')
      }
    }
  )
}

export default useShareVideo;