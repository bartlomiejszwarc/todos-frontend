import TextField from '@mui/material/TextField';
import ConfirmButton from '../../../components/ConfirmButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { usePutData } from '../../../hooks/usePutData';
import { useFetchData } from '../../../hooks/useFetchData';
import Snackbar from '@mui/material/Snackbar';

import 'react-phone-input-2/lib/material.css';
function DetailsPage() {
  const { user, dispatch } = useAuthContext();
  const { fetchData, data, isLoading } = useFetchData();
  const { putData, data: updatedData, error } = usePutData();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchData(process.env.REACT_APP_API_USERS_DETAILS, user?.id);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    setDisplayName(data?.user?.displayName);
    setPhoneNumber(data?.user?.phoneNumber);
    setEmail(data?.user?.email);
  }, [data]);

  const handleOnChangeDisplayName = (e) => {
    setDisplayName(e.target.value);
  };
  const handleOnChangePhoneNumber = (e) => {
    setPhoneNumber(e);
  };
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateDetails = async () => {
    const body = {
      id: user.id,
      displayName: displayName,
      phoneNumber: phoneNumber,
      email: email,
    };
    const res = await putData(process.env.REACT_APP_API_USERS_DETAILS_UPDATE, body);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: res.user });
  };

  if (isLoading) return null;

  return (
    <div className='flex justify-center w-full h-auto '>
      <div className='w-[300px] h-full py-6 flex flex-col items-center justify-center space-y-4'>
        <TextField label={user?.username} focused disabled fullWidth sx={{ bgcolor: 'white' }} />
        <TextField
          label='Name'
          fullWidth
          onChange={(e) => handleOnChangeDisplayName(e)}
          sx={{ bgcolor: 'white' }}
          value={displayName || ''}
        />
        <TextField
          label='E-mail'
          fullWidth
          onChange={(e) => handleOnChangeEmail(e)}
          sx={{ bgcolor: 'white' }}
          value={email || ''}
        />
        <PhoneInput specialLabel='' country={'pl'} onChange={(e) => handleOnChangePhoneNumber(e)} value={phoneNumber} />

        <div className='w-1/2 pt-4'>
          <ConfirmButton
            buttonText={'Change details'}
            onClick={() => {
              updateDetails();
              handleClick();
            }}
          />
        </div>
      </div>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message='Profile updated successfully'
      />
    </div>
  );
}
export default DetailsPage;
