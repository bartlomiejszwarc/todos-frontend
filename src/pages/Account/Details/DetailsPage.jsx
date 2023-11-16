import TextField from '@mui/material/TextField';
import ConfirmButton from '../../../components/ConfirmButton';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { usePutData } from '../../../hooks/usePutData';
import Snackbar from '@mui/material/Snackbar';
import CustomAvatar from './../../../components/CustomAvatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import 'react-phone-input-2/lib/material.css';

function DetailsPage() {
  const { userInfo, dispatch } = useAuthContext();
  const { putData, error } = usePutData();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState('');
  const [isProfileImageSet, setIsProfileImageSet] = useState(false);

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
  }, [userInfo]);

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
      id: userInfo.id,
      displayName: displayName,
      phoneNumber: phoneNumber,
      email: email,
    };
    const res = await putData(process.env.REACT_APP_API_USERS_DETAILS_UPDATE, body);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: res.user });
  };

  const handleAddPhoto = (e) => {
    setIsProfileImageSet(true);
    if (e) {
      const imageUrl = URL.createObjectURL(e);
      setProfileImage(imageUrl);
    }
  };

  if (!userInfo) return null;

  return (
    <div className='flex justify-center w-full h-auto '>
      <div className='w-[300px] h-full py-6 flex flex-col items-center justify-center space-y-4'>
        <div className='relative flex justify-center'>
          {!isProfileImageSet && <CustomAvatar user={userInfo} size={10} />}
          {isProfileImageSet && <Avatar src={profileImage} sx={{ width: '10rem', height: '10rem' }} />}
          <div className='absolute flex bottom-2 right-2'>
            <label htmlFor='photoInput'>
              <AddAPhotoIcon className='text-neutral-800 cursor-pointer' style={{ width: '30px', height: 'auto' }} />
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
