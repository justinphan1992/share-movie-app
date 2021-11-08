import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';

const VideoItem = ({ video, showVote = false, onVote, isVoted = null }) => {

  const shortedDesc = video.description.split(" ").splice(0, 50).join(" ");

  return (
    <Card sx={{ display: 'flex', gap: 4, border: 0, boxShadow: 'none' }}>
      <CardMedia
        component="iframe"
        sx={{ width: 800 }}
        src={`https://www.youtube.com/embed/${video.youtube_id}`}        
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
       <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 550 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6" color="primary">
              {video.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Shared by: {video.shared_by.email}
            </Typography>
            {
              showVote && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>            
                  <Typography variant="body2" component="span">
                    {video.up_vote}
                  </Typography>
                  <IconButton disabled={isVoted === true} onClick={() => onVote({video: video._id, vote: true})}>
                    <ThumbUpIcon color={isVoted === true ? 'primary' : 'default'} fontSize="small" />
                  </IconButton>                  
                  <Typography variant="body2" component="span">
                    {video.down_vote}
                  </Typography>
                  <IconButton disabled={isVoted === false} onClick={() => onVote({video: video._id, vote: false})}>
                    <ThumbDownIcon color={isVoted === false ? 'primary' : 'default'} fontSize="small" />
                  </IconButton>                              
                </Box>
              )
            }           
            <Typography component="div" variant="body1">
              Description
            </Typography>
            <Typography 
              component="div" 
              variant="body2" 
              dangerouslySetInnerHTML={{ __html: shortedDesc }}
            />                      
          </CardContent>
        </Box>     
    </Card>
  )
}

export default VideoItem;
