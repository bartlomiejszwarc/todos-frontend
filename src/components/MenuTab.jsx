import { useTasksContext } from '../hooks/useTasksContext';
import { useScreenSizeContext } from '../hooks/useScreenSizeContext';
function MenuTab({ text, textIcon, iconColor, onClick }) {
  const { dispatch } = useScreenSizeContext();

  const { tab } = useTasksContext();
  const checkIfCurrent = () => {
    if (text === tab) return true;
    else return false;
  };

  const closeSidebar = () => {
    dispatch({ type: 'SHOW_SIDEBAR', payload: false });
  };
  return (
    <div
      className={`w-11/12 px-5 py-1 rounded-tr-lg rounded-br-lg flex flex-row space-x-1 items-center hover:bg-neutral-200 cursor-pointer ${
        checkIfCurrent() ? 'bg-neutral-200' : 'bg-transparent'
      }`}
      onClick={() => {
        onClick();
        closeSidebar();
      }}
    >
      <span style={{ color: `${iconColor}` }}>{textIcon}</span>
      <span className='text-xl'>{text}</span>
    </div>
  );
}
export default MenuTab;
