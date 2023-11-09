import ConfirmButton from './ConfirmButton';
import TextareaAutosize from 'react-textarea-autosize';
import { usePostData } from '../hooks/usePostData';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function CreatePost() {
  const { user } = useAuthContext();
  const [postText, setPostText] = useState(null);
  const handleOnChangeTextarea = (e) => {
    setPostText(e.target.value);
  };
  const { postData } = usePostData();

  const handlePostData = async () => {
    const body = {
      owner: user.id,
      text: postText,
    };
    await postData(process.env.REACT_APP_API_POSTS_CREATE, body);
  };
  return (
    <>
      <div className='w-11/12 lg:w-1/2  h-36 flex flex-col space-y-2 '>
        <TextareaAutosize
          onChange={handleOnChangeTextarea}
          autoFocus
          placeholder='Ask your friends for anything'
          minRows='5'
          style={{ resize: 'none', height: '100px' }}
          className='border-2 bg-transparent px-2 py-1 rounded-md outline-none'
        />
        <div className='w-full flex justify-end'>
          <div className='w-24 '>
            <ConfirmButton buttonText={'Ask!'} onClick={handlePostData} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatePost;
