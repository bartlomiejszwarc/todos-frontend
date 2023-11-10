import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
function PostSkeleton({ amount }) {
  return (
    <>
      {Array.from({ length: amount }, (_, index) => (
        <div key={index} className='border-[1px] rounded-lg w-4/5 lg:w-3/5 p-4 '>
          <Stack spacing={1}>
            <div className='flex space-x-2'>
              <Skeleton variant='circular' width={'3rem'} height={'3rem'} />
              <Stack className='w-48'>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={'60%'} />
                <Skeleton variant='text' sx={{ fontSize: '0.75rem' }} width={'30%'} />
              </Stack>
            </div>
            <Skeleton variant='rounded' width={'90%'} height={60} />
          </Stack>
        </div>
      ))}
    </>
  );
}
export default PostSkeleton;
