import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form'
import useShareVideo from '../hooks/useShareVideo';
import useRequireLogin from '../hooks/useRequiredLogin';

const ShareVideo = () => {  
  useRequireLogin();
  const { control, handleSubmit, formState: { errors }, setError } = useForm({   
    mode: 'onChange',
  });
  const { mutateAsync, isLoading } = useShareVideo();
  const onSubmit = async (data) => {
    try {
      await mutateAsync(data)
    } catch (error) {      
      setError('url', { message: "Cannot find video or video existed."})
    }    
  };  

  return (
    <Container>
      <Box sx={{ maxWidth: 600, marginY: 10, marginX: 'auto', padding: 10, border: '1px solid #ccc', position: 'relative' }}>
          <Typography 
            sx={{ position: 'absolute', top: '-10px', paddingX: '10px', background: '#fff', left: '70px' }}
            variant="body2" 
            color="text.secondary" 
            component="span">
              Share a Youtube movive
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='url'
              rules={{
                required: {
                  value: true,
                  message: 'Url is required',
                },
                pattern: {
                  value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                  message: "Url is invalid",
                },
              }}
              control={control}
              defaultValue=''              
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  autoFocus
                  fullWidth
                  variant='outlined'
                  label='Youtube Link'
                  id='url'                
                  error={!!errors.url}
                  helperText={errors?.url?.message}
                />
              )}                   
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 3 }}>
              <LoadingButton loading={isLoading} fullWidth variant='contained' color='primary' type='submit'>Submit</LoadingButton>             
            </Box>      
          </form>
      </Box>
    </Container>
  )
}

export default ShareVideo;