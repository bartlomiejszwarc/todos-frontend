import { Avatar } from '@mui/material';
import { useSetDefaultBackgroundColor } from '../hooks/useSetDefaultBackgroundColor';
import { useEffect } from 'react';
function CustomAvatar({ user, size }) {
  const { color, setBackgroundColor } = useSetDefaultBackgroundColor();

  useEffect(() => {
    setBackgroundColor(user?.displayName);
  }, [user]);

  return (
    <>
      {!user?.profileImage && (
        <Avatar
          sx={{
            bgcolor: color,
            width: `${size}rem`,
            height: `${size}rem`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span
            className='uppercase text-2xl'
            style={{
              fontSize: `${size / 2}rem`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {user?.displayName.slice(0, 1)}
          </span>
        </Avatar>
      )}
      {user?.profileImage && <Avatar src={user?.profileImage} sx={{ width: `${size}rem`, height: `${size}rem` }} />}
    </>
  );
}
export default CustomAvatar;
