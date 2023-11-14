import { useTasksContext } from '../hooks/useTasksContext';
import { useScreenSizeContext } from '../hooks/useScreenSizeContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from 'react';

function Navbar() {
  const { tab } = useTasksContext();
  const { dispatch } = useScreenSizeContext();

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  const openSidebar = () => {
    dispatch({ type: 'SHOW_SIDEBAR', payload: true });
  };

  return (
    <div className=' bg-fuchsia-700 w-full py-3 items-center  lg:rounded-tr-lg pl-4 flex space-x-4'>
      {screenSize.width <= 740 && <ArrowBackIosNewIcon className='text-neutral-50' onClick={openSidebar} />}
      <span className='text-neutral-100 text-2xl'>{tab}</span>
    </div>
  );
}
export default Navbar;
