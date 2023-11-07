function ConfirmButton({ buttonText, onClick }) {
  return (
    <>
      <button
        className='w-full px-4 py-1 bg-red-500 rounded-full bg-gradient-to-l from-pink-800 via-purple-800 to-indigo-800 text-neutral-50 font-medium'
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
export default ConfirmButton;
