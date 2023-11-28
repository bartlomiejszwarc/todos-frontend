import FormLayout from '../../layouts/FormLayout';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import ConfirmButton from '../../components/ConfirmButton';
import { useState, useEffect } from 'react';
import { useRegister } from '../../hooks/useRegister';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, displayName, password);
  };

  return (
    <FormLayout formTitle={'Sign up'}>
      <div className='space-y-6'>
        <div className='flex flex-col items-center space-y-4'>
          <TextField variant='standard' label='Username' onChange={(e) => setUsername(e.target.value)} />
          <TextField variant='standard' label='Display name' onChange={(e) => setDisplayName(e.target.value)} />
          <TextField
            variant='standard'
            label='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='text-red-700'>{error}</span>
        </div>

        <ConfirmButton buttonText={'Sign up'} onClick={handleSubmit} />
      </div>
      <div className='pt-6 space-x-1'>
        <span>Already have an account?</span>
        <Link to='/' className='text-sky-700 font-medium'>
          Sign in
        </Link>
      </div>
    </FormLayout>
  );
}
export default RegisterForm;
