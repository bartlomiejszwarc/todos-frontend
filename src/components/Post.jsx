import CustomAvatar from './CustomAvatar';
import { useFetchData } from '../hooks/useFetchData';
import { useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useAuthContext } from '../hooks/useAuthContext';
function Post({ post }) {
  const { fetchData, data, isLoading } = useFetchData();
  const { user } = useAuthContext();

  useEffect(() => {
    if (post) fetchData(process.env.REACT_APP_API_USERS_DETAILS, post?.owner);
  }, [post]);

  if (isLoading) return null;
  return (
    <div
      className={`border-[1px] h-auto w-4/5 lg:w-3/5 flex flex-col space-y-2 px-3 py-3 rounded-lg ${
        post?.owner === user?.id ? 'bg-indigo-100' : 'bg-pink-100'
      }`}
    >
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
      <div>{post?.text}</div>
    </div>
  );
}
export default Post;
