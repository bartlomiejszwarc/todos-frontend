import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useFetchTasks } from '../../hooks/useFetchTasks';
import CircularProgress from '@mui/material/CircularProgress';
import TasksList from './TasksList';

import CreateTaskDialog from './CreateTaskDialog';
import { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { useTasksContext } from '../../hooks/useTasksContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFilterTasks } from '../../hooks/useFilterTasks';

function TasksPage({ title }) {
  const { user } = useAuthContext();
  const { data, isLoading } = useFetchTasks(process.env.REACT_APP_API_TASKS + user?.id);
  const { tasks, tab } = useTasksContext();
  const [tasksUpdated, setTasksUpdated] = useState(tasks);
  const { filterTasks } = useFilterTasks();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const filteredTasks = filterTasks(tasks, title);
    setTasksUpdated(filteredTasks);
  }, [tab, tasks]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <button
        className='bg-fuchsia-700 rounded-full text-white w-12 h-12 absolute bottom-[3%] right-[5%] lg:bottom-[12%] lg:right-[14%] z-20'
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <SpeedDialIcon />
      </button>

      {isLoading && (
        <div className='w-full flex justify-center pt-6'>
          <CircularProgress sx={{ color: '#a21caf' }} />
        </div>
      )}
      {!isLoading && (
        <div className='pt-2 relative'>
          <TasksList tasks={tasksUpdated} />
        </div>
      )}

      <Dialog
        open={dialogOpen}
        sx={{
          '& .MuiPaper-rounded': { width: '100%' },
        }}
      >
        <CreateTaskDialog onClose={handleCloseDialog} />
      </Dialog>
    </>
  );
}
export default TasksPage;
