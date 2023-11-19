import CustomAvatar from './CustomAvatar';
import { useFetchData } from '../hooks/useFetchData';
import { useDeleteData } from '../hooks/useDeleteData';
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from './DialogContent';

function Post({ post }) {
  const { fetchData, data, isLoading } = useFetchData();
  const [open, setOpen] = useState(false);
  const { dispatch } = usePostsContext();
  const { deleteData } = useDeleteData();
  const { user, userInfo } = useAuthContext();

  useEffect(() => {
    if (post) fetchData(process.env.REACT_APP_API_USERS_DETAILS, post?.owner);
  }, [post]);

  const handleDeletePost = async (id) => {
    await deleteData(process.env.REACT_APP_API_POSTS, id);
    setTimeout(() => {
      dispatch({ type: 'DELETE_POST', payload: id });
      setOpen(false);
    }, 500);
  };

  return (
    <div
      className={`border-[1px] h-auto w-4/5 lg:w-3/5 flex flex-col space-y-2 px-3 py-3 rounded-lg ${
        post?.owner === user?.id ? 'bg-indigo-100' : 'bg-pink-100'
      }`}
    >
      <div className='flex justify-between'>
        <div className='flex space-x-2'>
          <CustomAvatar size='3' user={data?.user} />
          <div className='flex flex-col'>
            <p>
              {data?.user.displayName} <span className='text-xs text-neutral-700'>({data?.user.username})</span>
            </p>
            <p className='text-sm text-neutral-600'>
              <ReactTimeAgo date={Date.parse(post?.date)} locale='en-US' />
            </p>
          </div>
        </div>
        {post?.owner === userInfo?._id && (
          <DeleteIcon
            className='text-neutral-500 cursor-pointer'
            sx={{ width: '20px' }}
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      <div>{post?.text}</div>
      <Dialog open={open}>
        <DialogContent>
          <div className='flex flex-col space-y-3'>
            <span className='text-2xl font-[600]'>Delete post?</span>
            <span className='text-xl font-[300]'>
              This can't be undone and it will be removed from your and your friends feed.
            </span>
            <div className='flex justify-around pt-3'>
              <button
                className='border-b-[1px] text-red-700 font-medium text-xl'
                onClick={() => handleDeletePost(post._id)}
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
    </div>
  );
}
export default Post;
