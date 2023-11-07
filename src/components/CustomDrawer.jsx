import Drawer from '@mui/material/Drawer';
import { useState, useEffect } from 'react';
import { useScreenSizeContext } from '../hooks/useScreenSizeContext';
function CustomDrawer({ children }) {
  const [open, setOpen] = useState(true);
  const { showSidebar, dispatch } = useScreenSizeContext();

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
    if (screenSize.width > 740) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: false });
    }
    if (screenSize.width <= 740) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: true });
    }
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  if (!showSidebar && screenSize.width <= 740) {
    return (
      <Drawer
        variant='permanent'
        sx={{
          display: 'none',
          position: 'relative',
          right: 0,
          bottom: 0,
          height: '100%',

          width: 200,
          '& .MuiBackdrop-root': {
            display: 'none',
          },
          '& .MuiDrawer-paper': {
            width: 200,
            position: 'absolute',
            transition: 'none !important',
            backgroundColor: '#f5f5f5',
            borderTopLeftRadius: '0.5rem',
            borderBottomLeftRadius: '0.5rem',
          },
        }}
        open
      >
        <div className='pt-4'>{children}</div>
      </Drawer>
    );
  }
  if (screenSize.width > 740) {
    return (
      <Drawer
        variant='permanent'
        sx={{
          display: 'block',
          position: 'relative',
          right: 0,
          bottom: 0,
          height: '100%',

          width: 200,
          '& .MuiBackdrop-root': {
            display: 'none',
          },
          '& .MuiDrawer-paper': {
            width: 200,
            position: 'absolute',
            transition: 'none !important',
            backgroundColor: '#f5f5f5',
            borderTopLeftRadius: '0.5rem',
            borderBottomLeftRadius: '0.5rem',
          },
        }}
        open
      >
        <div className='pt-4'>{children}</div>
      </Drawer>
    );
  }

  if (showSidebar) {
    return (
      <>
        <Drawer
          variant='permanent'
          sx={{
            display: 'block',
            position: 'relative',
            right: 0,
            bottom: 0,
            height: '100%',

            width: '100%',
            '& .MuiBackdrop-root': {
              display: 'none',
            },
            '& .MuiDrawer-paper': {
              width: '100vw',
              position: 'absolute',
              transition: 'none !important',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <div className='pt-4'>{children}</div>
        </Drawer>
        <button className='w-12 h-12 rounded-xl bg-red-500 absolute left-0 top-0 z-20'></button>
      </>
    );
  }
}
export default CustomDrawer;
