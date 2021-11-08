import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../../hooks/useLogin';

const LoginForm = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({   
    mode: 'onChange',
  });
  const { mutate, isLoading } = useLogin();
  const onSubmit = data => mutate(data);  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 3 }}>
          <Controller
            name='email'
            rules={{
              required: true,
              pattern: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
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
                label='Email'
                id='email'                
                error={!!errors.email}
              />
            )}           
          />
          <Controller
            name='password'
            rules={{
              required: true,              
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
                type='password'
                label='Password'
                id='password'                
                error={!!errors.password}
              />
            )}                    
          />
          <LoadingButton loading={isLoading} fullWidth variant='contained' color='primary' type='submit'>Login / Register</LoadingButton>
      </Box>
    </form>    
  )
}

export default LoginForm;