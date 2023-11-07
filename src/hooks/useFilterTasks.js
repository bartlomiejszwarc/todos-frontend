import dayjs from 'dayjs';
export const useFilterTasks = () => {
  const filterTasks = (tasks, tab) => {
    switch (tab) {
      case 'Inbox':
        return tasks;
      case 'Today':
        return tasks.filter(
          (task) => task?.deadline && dayjs(task?.deadline).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY'),
        );
      case 'Next 7 days':
        const week = dayjs().add(7, 'days');
        return tasks.filter((task) => dayjs(task?.deadline).isBetween(dayjs(), week));
      case 'Important':
        return tasks.filter((task) => task.priority === 1);
      default:
        return tasks;
    }
  };
  return { filterTasks };
};
