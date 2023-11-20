import { Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDeleteData } from '../../hooks/useDeleteData';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTasksContext } from './../../hooks/useTasksContext';
import EditTaskDialog from './EditTaskDialog';
import { Dialog } from '@mui/material';
import { useState } from 'react';

function TaskCard({ task, index, lastItemIndex }) {
  const { dispatch } = useTasksContext();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  function setColorByPriority(task) {
    switch (task?.priority) {
      case 1:
        return '#b91c1c';
      case 2:
        return '#f97316';
      case 3:
        return '#60a5fa';
      case 4:
        return '#a3a3a3';
    }
  }

  const { deleteData } = useDeleteData();

  const handleDeleteTask = (id) => {
    setTimeout(async () => {
      await deleteData(process.env.REACT_APP_API_TASKS, id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    }, 500);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
  };

  const TaskBody = () => {
    return (
      <div className='flex flex-col px-2  h-auto w-full cursor-pointer' onClick={() => setEditDialogOpen(true)}>
        <span className='text-2xl'>{task?.text}</span>
        <span>{task?.description}</span>
        <div className='flex items-center space-x-1' style={{ color: setColorByPriority(task) }}>
          {task?.deadline && (
            <>
              <CalendarMonthIcon />
              <span className='pt-1'>{moment(task?.deadline).format('D MMM')}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  const TaskCheckbox = () => {
    return (
      <Checkbox
        onClick={() => {
          handleDeleteTask(task._id);
        }}
        icon={<RadioButtonUncheckedIcon style={{ color: setColorByPriority(task) }} />}
        checkedIcon={<CheckCircleIcon style={{ color: setColorByPriority(task) }} />}
      />
    );
  };

  const TaskDivider = () => {
    return <>{index !== lastItemIndex && <Divider />}</>;
  };

  const EditDialog = () => {
    return (
      <Dialog
        open={editDialogOpen}
        sx={{
          '& .MuiPaper-rounded': { width: '100%' },
        }}
      >
        <EditTaskDialog task={task} onClose={handleCloseDialog} />
      </Dialog>
    );
  };

  return (
    <>
      <div className='flex items-start'>
        <TaskCheckbox />
        <TaskBody />
        <EditDialog />
      </div>
      <TaskDivider />
    </>
  );
}
export default TaskCard;
