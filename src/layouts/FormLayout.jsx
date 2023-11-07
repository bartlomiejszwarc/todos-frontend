function FormLayout({ formTitle, children }) {
  return (
    <div className='w-full flex flex-col md:w-1/3 h-full md:h-96 bg-neutral-50 md:rounded-xl items-center justify-center'>
      <span className='text-2xl font-medium text-neutral-800'>{formTitle}</span>
      {children}
    </div>
  );
}
export default FormLayout;
