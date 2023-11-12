import TaskCard from './TaskCard';

function TasksList({ tasks }) {
  return (
    <div className='flex flex-col space-y-2 overflow-y-auto w-full h-auto'>
      {tasks?.map((task, key) => (
        <TaskCard key={task._id} task={task} index={key} lastItemIndex={tasks.length - 1} />
      ))}
    </div>
  );
}
export default TasksList;
