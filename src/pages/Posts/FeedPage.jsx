import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchData } from '../../hooks/useFetchData';
import { useEffect, useState } from 'react';
import PostSkeleton from '../../skeletons/PostSkeleton';
import { usePostsContext } from '../../hooks/usePostsContext';

function FeedPage() {
  const { user } = useAuthContext();

  const { posts, dispatch } = usePostsContext();
  const { fetchData, data, isLoading, error } = useFetchData();
  useEffect(() => {
    if (user) fetchData(process.env.REACT_APP_API_POSTS, user.id);
  }, [user]);

  useEffect(() => {
    const concatedArrays = data?.userPosts?.concat(data?.friendsPosts);

    concatedArrays?.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    dispatch({ type: 'SET_POSTS', payload: concatedArrays });
  }, [data]);

  return (
    <div className='px-4'>
      <div className='w-full flex flex-col items-center py-3 space-y-4'>
        <CreatePost />
      </div>
      <div className={`space-y-3 flex flex-col`}>
        {!isLoading ? (
          posts?.map((post, key) => (
            <div key={key} className={`flex w-full ${user?.id === post?.owner ? 'justify-end' : 'justify-start'}`}>
              <Post key={key} post={post} />
            </div>
          ))
        ) : (
          <PostSkeleton amount={3} />
        )}
      </div>
    </div>
  );
}
export default FeedPage;
