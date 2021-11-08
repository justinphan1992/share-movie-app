import Box from "@mui/material/Box"
import VideoItem from "./VideoItem"
import { useAuthContext } from '../../context/AuthContext';
import useVoteVideo from "../../hooks/useVoteVideo";


const ListVideo = ({ videos }) => {
  const { isLogged, user } = useAuthContext();  
  const { mutate } = useVoteVideo();
  const checkVideoVoted = (videoId) => {
    const video = user?.votes?.find(vote => vote.video_id === videoId)
    return video?.vote ?? null;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: "36px 0px", maxWidth: 1024, margin: "30px auto", marginTop: 10 }}>
      {videos.map((video) => (
        <VideoItem 
          isVoted={checkVideoVoted(video._id)} 
          showVote={isLogged} 
          key={video._id} 
          video={video} 
          onVote={mutate}
        />
      ))}
    </Box>
  )
}

export default ListVideo;

