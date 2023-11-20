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
    <div className='flex flex-col space-y-2 px-5 py-2' onClick={onClose}>
      {options.map((option, key) => (
        <div key={key} className={`cursor-pointer rounded-lg `}>
          <div
            className='flex items-center text-lg font-thin space-x-2'
            onClick={() => {
              handleChooseOption(option);
            }}
          >
            <FlagIcon style={{ color: `${option.color}` }} />
            <span>{option.text}</span>
          </div>
          <div className='w-full flex justify-center'>
            {key !== options.length - 1 && <Divider sx={{ width: '75%', paddingTop: '8px' }} />}
          </div>
        </div>
      ))}
    </div>
  );
}
export default PriorityList;
