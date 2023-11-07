import MenuTab from '../../components/MenuTab';
import InboxIcon from '@mui/icons-material/Inbox';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TodayIcon from '@mui/icons-material/Today';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTasksContext } from '../../hooks/useTasksContext';
import { useDashboardContentContext } from '../../hooks/useDashboardContentContext';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function DashboardTabs() {
  const { user } = useAuthContext();
  const { dispatch: tasksDispatch } = useTasksContext();
  const { dispatch: dashboardContentDispatch } = useDashboardContentContext();

  const setTaskTabTitle = (title) => {
    tasksDispatch({ type: 'SET_TAB', payload: { tab: title, contentType: 'task' } });
    dashboardContentDispatch({ type: 'TASKS', payload: { tab: title } });
  };

  const setFriendsTabTitle = (type, title) => {
    tasksDispatch({ type: 'SET_TAB', payload: { tab: title, contentType: 'people' } });
    dashboardContentDispatch({ type: type, payload: { tab: title } });
  };

  return (
    <div className='h-auto flex flex-col space-y-2'>
      <span className='pl-6'>Hello, {user?.displayName}</span>
      <span className='pl-5 pt-4 font-bold text-xl'>Tasks</span>
      <div className='flex flex-col space-y-4 '>
        <MenuTab
          text={'Inbox'}
          textIcon={<InboxIcon />}
          iconColor={'#3b82f6'}
          onClick={() => {
            setTaskTabTitle('Inbox');
          }}
        />
        <MenuTab
          text={'Today'}
          textIcon={<TodayIcon />}
          iconColor={'#22c55e'}
          onClick={() => {
            setTaskTabTitle('Today');
          }}
        />
        <MenuTab
          text={'Next 7 days'}
          textIcon={<UpcomingIcon />}
          iconColor={'#8b5cf6'}
          onClick={() => {
            setTaskTabTitle('Next 7 days');
          }}
        />
        <MenuTab
          text={'Important'}
          textIcon={<StarRateIcon />}
          iconColor={'#ec4899'}
          onClick={() => {
            setTaskTabTitle('Important');
          }}
        />
        <span className='pl-5 pt-4 font-bold text-xl'>People</span>
        <MenuTab
          text={'Find friends'}
          textIcon={<PeopleAltIcon />}
          iconColor={'#1d4ed8'}
          onClick={() => {
            setFriendsTabTitle('SEARCH_USERS', 'Find friends');
          }}
        />
        <MenuTab
          text={'Invitations'}
          textIcon={<PeopleAltIcon />}
          iconColor={'#16a34a'}
          onClick={() => {
            setFriendsTabTitle('INVITATIONS', 'Friends invitations');
          }}
        />
      </div>
    </div>
  );
}
export default DashboardTabs;
