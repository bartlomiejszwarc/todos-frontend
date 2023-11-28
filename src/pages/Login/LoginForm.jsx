import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import FormLayout from '../../layouts/FormLayout';
import ConfirmButton from '../../components/ConfirmButton';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <FormLayout formTitle={'Sign in'}>
      <div className='space-y-6'>
        <div className='flex flex-col items-center space-y-4'>
          <TextField variant='standard' label='Username' onChange={(e) => setUsername(e.target.value)} />
          <TextField
            variant='standard'
            label='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='text-red-700'>{error}</span>
        </div>
        <ConfirmButton buttonText={'Sign in'} onClick={handleSubmit} />
        <Divider>
          <span className='text-neutral-600'>or</span>
        </Divider>
      </div>
      <Link to='/signup' className='text-sky-700 font-medium pt-2'>
        Sign up here
      </Link>
    </FormLayout>
  );
}
export default LoginForm;
