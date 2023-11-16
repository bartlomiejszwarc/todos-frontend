function ConfirmButton({
  buttonText,
  onClick
}) {
  return <>
      <button className='w-full px-4 py-1 rounded-full bg-fuchsia-700 text-neutral-50 font-medium' onClick={onClick}>
        {buttonText}
      </button>
    </>;
}

export default ConfirmButton;