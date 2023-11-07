import FlagIcon from '@mui/icons-material/Flag';
import { Divider } from '@mui/material';

function PriorityList({ onClose, handleChooseOption }) {
  const options = [
    { text: 'Priority 1', value: 1, color: '#dc2626' },
    { text: 'Priority 2', value: 2, color: '#f97316' },
    { text: 'Priority 3', value: 3, color: '#2563eb' },
    { text: 'Priority 4', value: 4, color: '#a3a3a3' },
  ];

  return (
    <div className='flex flex-col pr-10 space-y-4 ml-3 py-2' onClick={onClose}>
      {options.map((option, key) => (
        <div key={key}>
          <div
            className='flex items-center px-2 text-lg font-thin'
            onClick={() => {
              handleChooseOption(option);
            }}
          >
            <FlagIcon className='mr-3' style={{ color: `${option.color}` }} />
            <span>{option.text}</span>
          </div>
          {key !== options.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
export default PriorityList;
