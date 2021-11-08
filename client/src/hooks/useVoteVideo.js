import { useMutation, useQueryClient } from 'react-query'
import api from '../api';

const useVoteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ video, vote }) => api.rating(video, vote),
    {
      onSuccess: async() => {
        await Promise.all([
          queryClient.refetchQueries(['get-me']),
          queryClient.refetchQueries(['videos']),
        ])                
      }
    }
  )
}

export default useVoteVideo;