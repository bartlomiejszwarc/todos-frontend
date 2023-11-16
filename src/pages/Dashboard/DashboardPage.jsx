import DashboardTabs from './DashboardTabs';
import CustomDrawer from '../../components/CustomDrawer';
import { useDashboardContentContext } from '../../hooks/useDashboardContentContext';
import ContentLayout from '../../layouts/ContentLayout';
import Navbar from '../../components/Navbar';
import { Route, Routes, Outlet } from 'react-router-dom';
import TasksPage from '../Tasks/TasksPage';

function DashboardPage() {
  const { content } = useDashboardContentContext();

  return (
    <>
      <div className='w-full lg:w-4/5 lg:rounded-lg h-screen lg:h-4/5 bg-neutral-50 flex'>
        <div>
          <CustomDrawer>
            <DashboardTabs />
          </CustomDrawer>
        </div>
        <div className='w-full flex flex-col '>
          <Navbar />
          <ContentLayout> {content}</ContentLayout>
        </div>
      </div>
    </>
  );
}
export default DashboardPage;
