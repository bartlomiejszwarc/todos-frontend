import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import ConfirmButton from './../../../components/ConfirmButton';
import { useAuthContext } from './../../../hooks/useAuthContext';
import { usePutData } from '../../../hooks/usePutData';
import { useLogout } from '../../../hooks/useLogout';
import { useDeleteData } from '../../../hooks/useDeleteData';
import Dialog from '@mui/material/Dialog';
import DialogContent from '../../../components/DialogContent';
import Snackbar from '@mui/material/Snackbar';

function SettingsPage() {
  const { userInfo, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const { putData } = usePutData();
  const { deleteData } = useDeleteData();
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPhoneNumberEnabled, setShowPhoneNumberEnabled] = useState(false);
  const [showEmailEnabled, setShowEmailEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    openSnackbar: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, openSnackbar } = state;

  const handleClick = () => {
    setState({ ...state, openSnackbar: true });
  };

  const handleClose = () => {
    setState({ ...state, openSnackbar: false });
  };

  useEffect(() => {
    setShowPhoneNumberEnabled(userInfo?.showPhoneNumber);
    setShowEmailEnabled(userInfo?.showEmail);
  }, [userInfo]);

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRepeatPasswordOnChange = (e) => {
    setRepeatedPassword(e.target.value);
  };

  const handleSubmitPasswordChange = async () => {
    setError(false);
    try {
      if (password !== repeatedPassword) throw new Error('Passwords do not match');
      const body = {
        password: password,
        repeatedPassword: repeatedPassword,
      };
      await putData(process.env.REACT_APP_API_USERS_CHANGE_PASSWORD, body);
      handleClick();
    } catch (e) {
      setError(true);
    }
  };

  const handleDeleteAccount = async () => {
    await deleteData(process.env.REACT_APP_API_USERS, userInfo?._id);
    setOpen(false);
    logout();
  };

  const handleShowPhoneNumberOnChange = async () => {
    setShowPhoneNumberEnabled(!showPhoneNumberEnabled);
    const body = {
      showPhoneNumber: !showPhoneNumberEnabled,
    };
    await putData(process.env.REACT_APP_API_USERS_DETAILS_UPDATE, body);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: body });
  };
  const handleShowEmailOnChange = async () => {
    setShowEmailEnabled(!showEmailEnabled);
    const body = {
      showEmail: !showEmailEnabled,
    };
    await putData(process.env.REACT_APP_API_USERS_DETAILS_UPDATE, body);
    dispatch({ type: 'UPDATE_USER_DETAILS', payload: body });
  };

  const SettingsSwitches = () => {
    return (
      <>
        <div className='w-full flex justify-between items-center'>
          <p>Show e-mail address</p>
          <Switch color='secondary' checked={showEmailEnabled || false} onClick={handleShowEmailOnChange} />
        </div>
        <div className='w-full flex justify-between items-center'>
          <p>Show phone number</p>
          <Switch color='secondary' checked={showPhoneNumberEnabled || false} onClick={handleShowPhoneNumberOnChange} />
        </div>
      </>
    );
  };

  const AccountManagementButtons = () => {
    return (
      <div className='pt-12 flex flex-col items-center space-y-4'>
        <p className='border-b-[1px] font-bold cursor-pointer' onClick={logout}>
          Logout
        </p>
        <p className='text-base text-red-800 border-b-[1px] font-bold cursor-pointer' onClick={() => setOpen(true)}>
          Delete your account
        </p>
      </div>
    );
  };

  const DeleteAccountDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>
          <div className='flex flex-col space-y-3'>
            <span className='text-2xl font-[600]'>Delete account?</span>
            <span className='text-xl font-[300]'>This can't be undone and it will be gone forever.</span>
            <div className='flex justify-around pt-3'>
              <button
                className='border-b-[1px] text-red-700 font-medium text-xl'
                onClick={() => handleDeleteAccount(userInfo?._id)}
              >
                Delete
              </button>
              <button className='text-neutral-400 text-xl' onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className='w-full flex justify-center py-6 h-auto'>
      <div className='w-2/3 lg:w-1/3 flex flex-col items-center text-xl space-y-3'>
        <div className='w-full flex flex-col items-center space-y-6'>
          <SettingsSwitches />
          <div className='w-full pt-6 flex flex-col space-y-2'>
            <p className='font-[600]'>Change your password</p>
            <TextField
              size='small'
              type='password'
              placeholder='Enter new password'
              onChange={handlePasswordOnChange}
            />
            <TextField
              size='small'
              type='password'
              placeholder='Re-enter new password'
              onChange={handleRepeatPasswordOnChange}
            />
          </div>
          {error && <p className='text-sm text-red-600'>Passwords are not the same</p>}
          <div className='w-1/2'>
            <ConfirmButton buttonText={'Change'} onClick={handleSubmitPasswordChange} />
          </div>
        </div>
        <AccountManagementButtons />
      </div>
      <DeleteAccountDialog />
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        onClose={handleClose}
        message='Password changed successfully'
      />
    </div>
  );
}
export default SettingsPage;
