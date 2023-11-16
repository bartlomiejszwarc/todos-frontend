import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import SearchUsersList from './SearchUsersList';
import { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { useAuthContext } from '../../hooks/useAuthContext';

function FriendsSearchPage() {
  const { fetchData, data, isLoading, error } = useFetchData();
  const { user } = useAuthContext();
  const [inputValue, setInputValue] = useState('');
  const [submitInputValue, setSubmitInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setSubmitInputValue(inputValue);
    const response = await fetchData(process.env.REACT_APP_API_USERS, inputValue);
    if (response?.users) {
      const filteredResponse = response?.users.filter((item) => item?._id !== user?.id);
      setUsers(filteredResponse);
    }
  };
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center pt-4 w-10/12 lg:w-2/3 space-y-2'>
        <TextField
          fullWidth
          label='Search'
          placeholder='Enter at least 3 characters'
          id='input-with-icon-adornment'
          className='pl-1'
          color='secondary'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon onClick={handleSearchSubmit} />
              </InputAdornment>
            ),
            sx: { borderRadius: '10px' },
          }}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        {users.length > 0 && <SearchUsersList users={users} />}
        {data && users.length === 0 && (
          <span className='text-2xl'>'{submitInputValue}' not found. Try searching for someone else.</span>
        )}
      </div>
    </div>
  );
}
export default FriendsSearchPage;
