function ContentLayout({ children }) {
  return (
    <div className='w-full overflow-y-auto'>
      <div className='w-full relative'>
        <div className=' lg:rounded-tr-lg'></div>
      </div>
      {children}
    </div>
  );
}
export default ContentLayout;
