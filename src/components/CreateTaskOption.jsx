function CreateTaskOption({ text, textIcon, onClick }) {
  return (
    <button
      className='w-auto rounded-lg border-[1px] px-2 py-1 flex justify-between space-x-2 text-neutral-500 items-center'
      onClick={onClick}
    >
      <span>{textIcon}</span>
      <span>{text}</span>
    </button>
  );
}
export default CreateTaskOption;
