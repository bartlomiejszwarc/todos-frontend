function CreateTaskOption({ text, textIcon, onClick }) {
  return (
    <div
      className='w-auto rounded-lg border-[1px] px-2 py-1 flex justify-between space-x-2 text-neutral-500 items-center'
      onClick={onClick}
    >
      <span className=''>{textIcon}</span>
      <span className=''>{text}</span>
    </div>
  );
}
export default CreateTaskOption;
