function PageLayout({ children }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full space-y-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 font-quicksand'>
      {children}
    </div>
  );
}
export default PageLayout;
