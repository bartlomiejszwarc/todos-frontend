import { Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDeleteData } from '../../hooks/useDeleteData';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTasksContext } from './../../hooks/useTasksContext';

function TaskCard({ task, index, lastItemIndex }) {
  const { dispatch } = useTasksContext();

  function setColorByPriority(task) {
    switch (task.priority) {
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

  const handleDeleteTask = async (id) => {
    await deleteData(process.env.REACT_APP_API_TASKS, id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <>
      <div className='flex items-start '>
        <Checkbox
          onClick={() => {
            handleDeleteTask(task._id);
          }}
          icon={<RadioButtonUncheckedIcon style={{ color: setColorByPriority(task) }} />}
          checkedIcon={<CheckCircleIcon style={{ color: setColorByPriority(task) }} />}
        />

        <div className='flex flex-col px-2  h-auto w-full'>
          <span className='text-2xl'>{task.text}</span>
          <span>{task.description}</span>
          <div className='flex items-center space-x-1' style={{ color: setColorByPriority(task) }}>
            {task?.deadline && (
              <>
                <CalendarMonthIcon />
                <span className='pt-1'>{moment(task.deadline).format('D MMM')}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {index !== lastItemIndex && <Divider />}
    </>
  );
}
export default TaskCard;
