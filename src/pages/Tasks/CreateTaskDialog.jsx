import CloseIcon from '@mui/icons-material/Close';
import CreateTaskOption from '../../components/CreateTaskOption';
import EventIcon from '@mui/icons-material/Event';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlagIcon from '@mui/icons-material/Flag';
import Menu from '@mui/material/Menu';
import PriorityList from './PriorityList';
import Calendar from './Calendar';
import { useState, useEffect } from 'react';
import { usePostData } from '../../hooks/usePostData';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTasksContext } from '../../hooks/useTasksContext';

function CreateTaskDialog({ onClose }) {
  const { user } = useAuthContext();
  const { dispatch } = useTasksContext();
  const [anchorPriorityElement, setAnchorPriorityElement] = useState(null);
  const openPriorityMenu = Boolean(anchorPriorityElement);
  const [anchorDateElement, setAnchorDateElement] = useState(null);
  const openDateMenu = Boolean(anchorDateElement);
  const [taskTitle, setTaskTitle] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const [taskDeadline, setTaskDeadline] = useState();
  const [priority, setPriority] = useState(0);

  const { postData, data, error } = usePostData();
  const handleCreateTask = async () => {
    const body = {
      owner: user.id,
      text: taskTitle,
      description: taskDescription,
      priority: priority?.value,
      deadline: taskDeadline,
    };
    await postData(process.env.REACT_APP_API_TASKS_CREATE, body);
    setTimeout(() => {
      handleDialogClose();
    }, 200);
  };
  useEffect(() => {
    if (data) dispatch({ type: 'ADD_TASK', payload: data?.task });
  }, [data]);

  const handleDialogClose = () => {
    onClose();
  };
  const handlePriorityMenuOpen = (e) => {
    setAnchorPriorityElement(e.currentTarget);
  };
  const handleDateMenuOpen = (e) => {
    setAnchorDateElement(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorDateElement(null);
    setAnchorPriorityElement(null);
  };

  const handleChooseOption = (option) => {
    setPriority(option);
  };

  const handleDateChange = (date) => {
    setTaskDeadline(date);
  };

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const CreateTaskButton = () => {
    return (
      <div
        className={`absolute bottom-3 right-3 cursor-pointer rounded-full w-12 h-12 flex items-center justify-center ${
          taskTitle ? 'bg-fuchsia-700' : 'bg-neutral-300'
        }`}
        onClick={handleCreateTask}
      >
        <ArrowUpwardIcon className='text-neutral-100' style={{ fontSize: '1.5rem' }} />
      </div>
    );
  };

  return (
    <div className='rounded-lg h-96 flex flex-col px-3 pt-4'>
      <CloseIcon className='absolute right-4 top-4 cursor-pointer' onClick={handleDialogClose} />
      <CreateTaskButton />
      <p className='text-2xl font-bold'> Create new task </p>
      <div className='flex flex-col space-y-6 pt-8'>
        <input
          placeholder='Task title'
          className='placeholder:text-2xl outline-none border-b-[1px] text-2xl font-bold placeholder:pl-1'
          onChange={(e) => handleTaskTitleChange(e)}
        />
        <input
          placeholder='Description'
          className='placeholder:text-lg outline-none placeholder:pl-1'
          onChange={(e) => handleTaskDescriptionChange(e)}
        />
      </div>
      <div className='flex space-x-3 pt-8'>
        <CreateTaskOption
          text={taskDeadline ? `${taskDeadline.$d.toLocaleDateString('es-CL')}` : 'Date'}
          textIcon={<EventIcon />}
          onClick={handleDateMenuOpen}
        />
        <CreateTaskOption
          text={'Priority'}
          textIcon={<FlagIcon style={{ color: `${priority.color}` }} />}
          onClick={handlePriorityMenuOpen}
        />
      </div>
      <Menu id='priority-menu' anchorEl={anchorPriorityElement} open={openPriorityMenu} onClose={handleMenuClose}>
        <PriorityList onClose={handleMenuClose} handleChooseOption={handleChooseOption} />
      </Menu>
      <Menu id='date-menu' anchorEl={anchorDateElement} open={openDateMenu} onClose={handleMenuClose}>
        <Calendar handleDateChange={handleDateChange} handleCloseDateMenu={handleMenuClose} />
      </Menu>
      {error && <span className='pt-3 pl-1 text-red-700'> {error}</span>}
    </div>
  );
}
export default CreateTaskDialog;
