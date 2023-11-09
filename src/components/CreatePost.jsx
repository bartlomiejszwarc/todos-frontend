import ConfirmButton from './ConfirmButton';
import TextareaAutosize from 'react-textarea-autosize';

function CreatePost() {
  return (
    <>
      <div className='w-11/12 lg:w-1/2  h-36 flex flex-col space-y-2'>
        <TextareaAutosize
          autoFocus
          placeholder='Ask your friends for anything'
          minRows='5'
          style={{ resize: 'none', height: '100px' }}
          className='border-2 bg-transparent px-2 py-1'
        />
        <div className='w-full flex justify-end'>
          <div className='w-24 '>
            <ConfirmButton buttonText={'Ask!'} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatePost;
