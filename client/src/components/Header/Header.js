import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import LoggedMenu from './LoggedMenu';
import LoginForm from './LoginForm';

const Header = () => {
  const { isLogged, user } = useAuthContext()
  return(
    <Box component="header" sx={{ flexGrow: 1, mt: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center" sx={{ gap: 1}}>
              <ThumbUpAltIcon fontSize="large" />
              <Typography variant="h4" component="span">Funny Movies</Typography>
            </Box>            
          </Grid>
          <Grid item>
            {
              isLogged ? <LoggedMenu user={user} /> : <LoginForm />
            }
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Header;