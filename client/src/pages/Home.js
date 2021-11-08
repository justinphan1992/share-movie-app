import React from 'react';
import Container from '@mui/material/Container';
import ListVideo from '../components/ListVideo';
import LoadingButton from '@mui/lab/LoadingButton';
import useGetVideos from '../hooks/useGetVideos';
import Box from '@mui/material/Box';

const Home = () => {

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetVideos()
  
  const videos = data?.pages?.flatMap(page => page.docs) || [];

  return (
    <Container maxWidth="xl">
      <ListVideo videos={videos} />
      {
        hasNextPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <LoadingButton variant="contained" loading={isFetchingNextPage} onClick={() => fetchNextPage()}>Load more</LoadingButton>
          </Box>      
        )
      }      
    </Container>
  )
}

export default Home;