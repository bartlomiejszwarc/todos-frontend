import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ConfirmButton from '../../components/ConfirmButton';
function Calendar({ handleDateChange, handleCloseDateMenu }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={(newDate) => handleDateChange(newDate)} />
      </LocalizationProvider>
      <div className='w-full flex justify-end'>
        <div className='w-24 pr-2'>
          <ConfirmButton buttonText={'Close'} className='w-1/3' onClick={handleCloseDateMenu} />
        </div>
      </div>
    </>
  );
}
export default Calendar;
