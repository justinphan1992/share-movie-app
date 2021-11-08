import { useInfiniteQuery } from 'react-query'
import api from '../api';

const useGetVideos = () => {
  return useInfiniteQuery(
    'videos',
    ({ pageParam = 0 }) => api.getVideo(pageParam),
    {
      getNextPageParam: (page) => page.hasNextPage ? (page.nextPage - 1) * page.limit : false,
    }
  )
}

export default useGetVideos;