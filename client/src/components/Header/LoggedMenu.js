import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useLogout from '../../hooks/useLogout';
import {useNavigate} from 'react-router-dom';

const LoggedMenu = ({ user }) => {
  const { mutate } = useLogout();
  const navigate = useNavigate()

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 3 }}>
      <Typography variant="body1">Welcome {user?.email}</Typography>
      <Button onClick={() => navigate('/share-video')} variant="contained" color="success">Share a Movie</Button>
      <Button onClick={mutate} variant="contained" color="error">Logout</Button>
    </Box>
  )
}

export default LoggedMenu;