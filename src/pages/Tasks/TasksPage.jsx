import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useFetchData } from '../../hooks/useFetchData';
import CircularProgress from '@mui/material/CircularProgress';
import TasksList from './TasksList';
import CreateTaskDialog from './CreateTaskDialog';
import { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { useTasksContext } from '../../hooks/useTasksContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFilterTasks } from '../../hooks/useFilterTasks';
import TaskSkeleton from './../../skeletons/TaskSkeleton';

function TasksPage({ title }) {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const { fetchData, isLoading } = useFetchData();
  const { tasks, tab } = useTasksContext();
  const { filterTasks } = useFilterTasks();
  const [tasksUpdated, setTasksUpdated] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const fetchedTasks = await fetchData(process.env.REACT_APP_API_TASKS, user?.id);
      dispatch({ type: 'SET_TASKS', payload: fetchedTasks?.tasks });
    };
    if (user) fetch();
  }, [user]);

  useEffect(() => {
    const filteredTasks = filterTasks(tasks, title);
    setTasksUpdated(filteredTasks);
  }, [tab, tasks]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const CreateNewTaskButton = () => {
    return (
      <button
        className='bg-fuchsia-700 rounded-full text-white w-12 h-12 absolute bottom-[3%] right-[5%] lg:bottom-[7%] lg:right-[7%] z-20'
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <SpeedDialIcon />
      </button>
    );
  };

  const CreateNewTaskDialog = () => {
    return (
      <Dialog
        open={dialogOpen}
        sx={{
          '& .MuiPaper-rounded': { width: '100%' },
        }}
      >
        <CreateTaskDialog onClose={handleCloseDialog} />
      </Dialog>
    );
  };

  return (
    <>
      <CreateNewTaskButton />
      {isLoading && <TaskSkeleton amount='5' />}
      {!isLoading && (
        <div className='pt-2 relative'>
          <TasksList tasks={tasksUpdated} />
        </div>
      )}
      {!isLoading && tasksUpdated?.length === 0 && (
        <div className='pt-3 relative flex w-full justify-center overflow-y-hidden px-16'>
          <p className='text-xl font-thin text-center'>You don't have any tasks here</p>
        </div>
      )}
      <CreateNewTaskDialog />
    </>
  );
}
export default TasksPage;
