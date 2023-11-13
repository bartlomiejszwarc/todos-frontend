import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import ConfirmButton from './../../../components/ConfirmButton';
function SettingsPage() {
  return (
    <div className='w-full flex justify-center py-6 h-auto'>
      <div className='w-2/3 lg:w-1/3 flex flex-col items-center text-xl space-y-3'>
        <div className='w-full flex justify-between items-center'>
          <p>Show e-mail address</p>
          <Switch color='secondary' />
        </div>
        <div className='w-full flex justify-between items-center'>
          <p>Show phone number</p>
          <Switch color='secondary' />
        </div>
        <div className='w-full flex flex-col items-center space-y-6'>
          <div className='w-full pt-6 flex flex-col space-y-2'>
            <p className='font-[600]'>Change your password</p>
            <TextField size='small' placeholder='Enter new password' />
            <TextField size='small' placeholder='Re-enter new password' />
          </div>
          <div className='w-1/2'>
            <ConfirmButton buttonText={'Change'} />
          </div>
        </div>
        <div className='pt-12 flex flex-col items-center space-y-4'>
          <p className='border-b-[1px] font-bold'>Logout</p>
          <p className='text-base text-red-800 border-b-[1px] font-bold'>Delete your account</p>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
