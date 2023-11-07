import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import PendingFriendsRequestList from '../Requests/PendingFriendsRequestList';
import IncomingFriendsRequestsList from './IncomingFriendsRequestsList';
import { useFetchData } from '../../../hooks/useFetchData';
import { useAuthContext } from '../../../hooks/useAuthContext';
import FriendsList from './FriendsList';
import { useFriendsContext } from '../../../hooks/useFriendsContext';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function FriendsRequestsPage() {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);
  const { fetchData, data, isLoading, error } = useFetchData();
  const { user } = useAuthContext();
  const [detailsArray, setDetailsArray] = useState([]);
  const { incoming, dispatch } = useFriendsContext();

  useEffect(() => {
    const fetch = async () => {
      await fetchData(process.env.REACT_APP_API_USERS_REQUESTS, user.id);
    };
    fetch();
  }, []);

  useEffect(() => {
    const incomingRequestsArray = data?.requests?.incomingRequests;
    const fetchDataForAllRequests = async () => {
      if (incomingRequestsArray?.length > 0) {
        const results = await Promise.all(
          incomingRequestsArray.map(async (userDetails) => {
            const userData = await fetchData(process.env.REACT_APP_API_USERS_DETAILS, userDetails);
            return userData.user;
          }),
        );
        dispatch({ type: 'SET_INCOMING_INVITATIONS', payload: results });
      }
    };

    fetchDataForAllRequests();
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        centered
        variant='fullWidth'
        value={value}
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='secondary tabs example'
      >
        <Tab value={0} label='Your friends' {...a11yProps(0)} />
        <Tab value={1} label='Incoming' {...a11yProps(1)} />
        <Tab value={2} label='Pending' {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <FriendsList friendsList={data?.requests?.friends} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IncomingFriendsRequestsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PendingFriendsRequestList pendingRequestsArray={data?.requests?.pendingRequests} />
      </CustomTabPanel>
    </Box>
  );
}
export default FriendsRequestsPage;
