import ConfirmButton from './ConfirmButton';
import TextareaAutosize from 'react-textarea-autosize';
import { usePostData } from '../hooks/usePostData';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';

function CreatePost() {
  const { user } = useAuthContext();
  const { dispatch } = usePostsContext();
  const [postText, setPostText] = useState('');
  const [textLength, setTextLength] = useState(0);
  const handleOnChangeTextarea = (e) => {
    setTextLength(e.target.value.length);
    setPostText(e.target.value);
  };
  const { postData, data } = usePostData();
  const maxTextLength = 200;

  const handlePostData = async () => {
    const body = {
      owner: user.id,
      text: postText,
    };
    await postData(process.env.REACT_APP_API_POSTS_CREATE, body);
    setPostText('');
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: 'ADD_POST', payload: data?.post });
    }
  }, [data]);
  return (
    <>
      <div className='w-11/12 lg:w-2/3 h-36 flex flex-col space-y-2'>
        <TextareaAutosize
          onChange={handleOnChangeTextarea}
          value={postText}
          autoFocus
          placeholder='Ask your friends for anything'
          minRows='5'
          maxLength={maxTextLength}
          style={{ resize: 'none', height: '100px' }}
          className='border-2 bg-transparent px-2 py-1 rounded-md outline-none'
        />

        <div className='w-full flex justify-between'>
          <p>
            {textLength}/{maxTextLength}
          </p>
          <div className='w-24 flex flex-col items-end'>
            <ConfirmButton buttonText={'Ask!'} onClick={handlePostData} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatePost;
