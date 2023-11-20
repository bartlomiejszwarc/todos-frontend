import CloseIcon from '@mui/icons-material/Close';
import CreateTaskOption from '../../components/CreateTaskOption';
import EventIcon from '@mui/icons-material/Event';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FlagIcon from '@mui/icons-material/Flag';
import Menu from '@mui/material/Menu';
import PriorityList from './PriorityList';
import Calendar from './Calendar';
import { useState, useEffect } from 'react';
import { usePutData } from '../../hooks/usePutData';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTasksContext } from '../../hooks/useTasksContext';
import ConfirmButton from './../../components/ConfirmButton';
function EditTaskDialog({ task, onClose }) {
  const { dispatch } = useTasksContext();
  const { putData } = usePutData();
  const [anchorPriorityElement, setAnchorPriorityElement] = useState(null);
  const openPriorityMenu = Boolean(anchorPriorityElement);
  const [anchorDateElement, setAnchorDateElement] = useState(null);
  const openDateMenu = Boolean(anchorDateElement);
  const [taskTitle, setTaskTitle] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const [taskDeadline, setTaskDeadline] = useState();
  const [priority, setPriority] = useState(0);
  const [priorityText, setPriorityText] = useState('');
  const [priorityColor, setPriorityColor] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.text);
      setTaskDescription(task.description);
      setTaskDeadline(task.deadline);
      setPriority(task.priority);
      setPriorityText('Priority ' + task.priority);
      setPriorityColorValue(task.priority);
    }
  }, [task]);

  const setPriorityColorValue = (p) => {
    if (p === 1) setPriorityColor('#dc2626');
    if (p === 2) setPriorityColor('#f97316');
    if (p === 3) setPriorityColor('#2563eb');
    if (p === 4) setPriorityColor('#a3a3a3');
  };

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
    setPriority(option?.value);
    setPriorityText(option?.text);
    setPriorityColorValue(option?.value);
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

  const handleEditData = async () => {
    const body = {
      _id: task._id,
      text: taskTitle,
      description: taskDescription,
      priority: priority,
      deadline: taskDeadline,
    };
    const res = await putData(process.env.REACT_APP_API_TASKS, body);
    dispatch({ type: 'EDIT_TASK', payload: res.task });
    handleDialogClose();
  };

  return (
    <div className='rounded-lg h-96 flex flex-col px-3 pt-4'>
      <CloseIcon className='absolute right-4 top-4 cursor-pointer' onClick={handleDialogClose} />
      <div className='absolute bottom-3 right-3'>
        <ConfirmButton buttonText={'Save'} onClick={handleEditData} />
      </div>
      <p className='text-2xl font-thin'>Edit your task</p>
      <div className='flex flex-col space-y-6 pt-8'>
        <input
          placeholder='Task title'
          className='placeholder:text-2xl outline-none border-b-[1px] text-2xl font-bold placeholder:pl-1'
          defaultValue={taskTitle}
          onChange={(e) => handleTaskTitleChange(e)}
        />
        <input
          placeholder='Description'
          className='placeholder:text-lg outline-none placeholder:pl-1'
          defaultValue={taskDescription}
          onChange={(e) => handleTaskDescriptionChange(e)}
        />
      </div>
      <div className='flex space-x-3 pt-8'>
        <CreateTaskOption text={'Date'} textIcon={<EventIcon />} onClick={handleDateMenuOpen} />
        <CreateTaskOption
          text={priority ? priorityText : 'Priority'}
          textIcon={<FlagIcon style={{ color: `${priorityColor}` }} />}
          onClick={handlePriorityMenuOpen}
        />
      </div>
      <Menu id='priority-menu' anchorEl={anchorPriorityElement} open={openPriorityMenu} onClose={handleMenuClose}>
        <PriorityList onClose={handleMenuClose} handleChooseOption={handleChooseOption} />
      </Menu>
      <Menu id='date-menu' anchorEl={anchorDateElement} open={openDateMenu} onClose={handleMenuClose}>
        <Calendar handleDateChange={handleDateChange} handleCloseDateMenu={handleMenuClose} />
      </Menu>
    </div>
  );
}
export default EditTaskDialog;
