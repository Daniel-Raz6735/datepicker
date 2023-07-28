import React from 'react';
import moment from 'moment';
import { Calendar } from '../calendar/calendar';
import { useDropdown } from '../dropdown/hooks/useDropdown';
import { useCalendar } from '../calendar/hooks/useCalendar';
import 'moment/locale/he';
import './datepicker.css';
moment.locale('he-il');

export const DATE_FORMAT = 'MMMM YYYY'
export const DAYS_OF_WEEK = moment.weekdaysShort()
export const TYPES = {
  start: "start",
  end: "end"
}
const START_CALANDER_LABEL = "תאריך יציאה";
const END_CALANDER_LABEL = "תאריך חזרה";

export const DatePickerContext = React.createContext();

const DatePicker = () => {
  const { isDropdownOpen, setDropdownState } = useDropdown();
  const {
    nextXMonth,
    daysOfMonth,
    selectedMonth,
    selectedDate,
    calStartingDate,
    isCurrentMonth,
    isMissingNextMonth,
    isMissingPrevMonth,
    isCalanderDisabled,
    handleDateSelection,
    chooseMonth,
    chooseNextMonth,
    choosePrevMonth,
    setCalStartingDate
  } = useCalendar()


  return (
    <DatePickerContext.Provider
      value={
        {
          states: {
            nextXMonth: nextXMonth,
            daysOfMonth: daysOfMonth,
            selectedMonth: selectedMonth,
            selectedDate: selectedDate,
            calStartingDate: calStartingDate,
            isCurrentMonth: isCurrentMonth,
            isDropdownOpen: isDropdownOpen,
            isMissingNextMonth: isMissingNextMonth,
            isMissingPrevMonth: isMissingPrevMonth,
            isCalanderDisabled: isCalanderDisabled
          },
          functions: {
            handleDateSelection: handleDateSelection,
            setDropdownState: setDropdownState,
            chooseMonth: chooseMonth,
            chooseNextMonth: chooseNextMonth,
            choosePrevMonth: choosePrevMonth,
            setCalStartingDate: setCalStartingDate
          }
        }
      }
    >
      <div className="datepicker-ui" >

        <div className="wrap">
          <div className="btn-close"></div>

          <div>
            <Calendar
              type={TYPES.start}
              calName={START_CALANDER_LABEL}
            />

            <Calendar
              type={TYPES.end}
              calName={END_CALANDER_LABEL}
            />
          </div>


          <div className="cal-agenda">
            <div className="agenda-item available">
              בחר תאריכי יציאה וחזרה
            </div>
            <div className="agenda-item charter">אפשרית טיסת צ'רטר בתאריכים אלו</div>
          </div>
        </div>
      </div>
    </DatePickerContext.Provider>
  );
};


export default DatePicker;