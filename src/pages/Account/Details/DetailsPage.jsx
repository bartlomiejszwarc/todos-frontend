import TextField from '@mui/material/TextField';
import ConfirmButton from '../../../components/ConfirmButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { usePutData } from '../../../hooks/usePutData';
import Snackbar from '@mui/material/Snackbar';
import CustomAvatar from './../../../components/CustomAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import 'react-phone-input-2/lib/material.css';

function DetailsPage() {
  const { user, userInfo, dispatch } = useAuthContext();
  const { putData, error } = usePutData();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [profileImage, setProfileImage] = useState('');

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
    setDisplayName(userInfo?.displayName);
    setPhoneNumber(userInfo?.phoneNumber);
    setEmail(userInfo?.email);
    setCountry(userInfo?.country);
    setCity(userInfo?.city);
    setProfileImage(userInfo?.profileImage);
  }, [userInfo]);

  const handleOnChangeDisplayName = (e) => {
    setDisplayName(e.target.value);
  };
  const handleOnChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleOnChangePhoneNumber = (e) => {
    setPhoneNumber(e);
  };
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateDetails = async () => {
    const body = {
      id: userInfo.id,
      displayName: displayName,
      phoneNumber: phoneNumber,
      email: email,
      country: country,
      city: city,
    };
    const res = await putData(process.env.REACT_APP_API_USERS_DETAILS_UPDATE, body);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: res?.user });
  };

  const handleAddPhoto = async (e) => {
    if (e) {
      try {
        const formData = new FormData();
        formData.append('file', e);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            userId: user.id,
            username: user.username,
          },
        };
        const res = await axios.put(process.env.REACT_APP_API_USERS_CHANGE_PROFILE_IMAGE, formData, config);
        dispatch({ type: 'UPDATE_USER_DETAILS', payload: res?.data?.user });
      } catch (e) {}
    }
  };

  if (!userInfo) return null;

  return (
    <div className='flex justify-center w-full h-auto '>
      <div className='w-[300px] h-full py-6 flex flex-col items-center justify-center space-y-4'>
        <div className='relative flex justify-center'>
          <CustomAvatar user={userInfo} size={10} />
          <div className='absolute flex bottom-2 right-2'>
            <label htmlFor='photoInput'>
              <AddAPhotoIcon
                className='text-neutral-700 cursor-pointer hover:opacity-90'
                style={{ width: '35px', height: 'auto' }}
              />
              <input
                id='photoInput'
                onChange={(e) => handleAddPhoto(e.target.files[0])}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        <TextField label={userInfo?.username} focused disabled fullWidth sx={{ bgcolor: 'white' }} />
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
        <TextField
          label='Country'
          fullWidth
          onChange={(e) => handleOnChangeCountry(e)}
          sx={{ bgcolor: 'white' }}
          value={country || ''}
        />
        <TextField
          label='City'
          fullWidth
          onChange={(e) => handleOnChangeCity(e)}
          sx={{ bgcolor: 'white' }}
          value={city || ''}
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
