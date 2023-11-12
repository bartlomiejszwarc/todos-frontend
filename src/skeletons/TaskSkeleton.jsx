import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Checkbox from '@mui/material/Checkbox';
import { Divider } from '@mui/material';

function TaskSkeleton({ amount }) {
  return (
    <>
      {Array.from({ length: amount }, (_, index) => (
        <div className='flex items-start ' key={index}>
          <Checkbox icon={<RadioButtonUncheckedIcon />} disabled />
          <div className='flex flex-col px-2  h-auto w-full'>
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} width='60%' />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='80%' />
            {index !== amount - 1 && <Divider sx={{ color: 'red', marginTop: '10px', marginBottom: '10px' }} />}
          </div>
        </div>
      ))}
    </>
  );
}
export default TaskSkeleton;
