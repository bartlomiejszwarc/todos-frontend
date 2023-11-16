function UserInfoCardField({ fieldTitle, fieldText }) {
  return (
    <div className='w-full flex flex-col m-0 font-quicksand'>
      <p className='text-sm text-neutral-500'>{fieldTitle}</p>
      {fieldText ? (
        <p className='text-lg text-neutral-900 font-[600]'>{fieldText}</p>
      ) : (
        <p className='text-lg text-neutral-900 font-[600]'>Not available</p>
      )}
    </div>
  );
}
export default UserInfoCardField;
