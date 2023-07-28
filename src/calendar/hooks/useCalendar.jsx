import { useEffect, useState } from 'react';
import moment from 'moment';
import { DATE_FORMAT, DAYS_OF_WEEK, TYPES } from '../../datepicker/datepicker';

const NEXT_X_MONTHS_NUMBER = 12;

export const useCalendar = () => {
    const [nextXMonth, setnextXMonth] = useState([])
  const [selectedMonth, setSelectedMonth] = useState({
    start: moment(),
    end: moment()
  })
  const [daysOfMonth, setDaysOfMonth] = useState({
    start: [[]],
    end: [[]]
  })
  const [isMissingPrevMonth, setIsMissingPrevMonth] = useState({
    start: true,
    end: true
  })
  const [isMissingNextMonth, setIsMissingNextMonth] = useState({
    start: false,
    end: false
  })
  const [isCurrentMonth, setIsCurrentMonth] = useState({
    start: true,
    end: true
  })
  const [isCalanderDisabled, setIsCalanderDisabled] = useState({
    start: false,
    end: true
  })
  const [calStartingDate, setCalStartingDate] = useState({
    start: moment(),
    end: moment()
  })
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    end: null
  })

  useEffect(() => {
    let currentDate = moment();

    let nextXMonths = [];

    for (let i = 0; i < NEXT_X_MONTHS_NUMBER; i++) {
      let nextMonth = currentDate.clone().add(i, 'months');
      nextXMonths.push(nextMonth);
    }

    setnextXMonth(nextXMonths);
  }, [])

  useEffect(() => {
    setDaysOfMonth({ start: getNumberOfDaysOfMonth(selectedMonth.start), end: getNumberOfDaysOfMonth(selectedMonth.end) })
  }, [selectedMonth])


  const chunkArray = (arr, n) => {
    return Array.from({ length: Math.ceil(arr.length / n) }, (_, index) =>
      arr.slice(index * n, index * n + n)
    );
  };

  function getNumberOfDaysOfMonth(selectedMonth) {
    let year = moment(selectedMonth).clone().year();
    let month = moment(selectedMonth).clone().month();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    const nullArray = Array(getFirstDayOfMonth(selectedMonth)).fill(null);

    return chunkArray(nullArray.concat(daysArray), DAYS_OF_WEEK.length);
  }


  const getFirstDayOfMonth = (month) => {
    return moment(month).clone().startOf('month').day();
  }

  const handleDateSelection = (date, type) => {
    setSelectedDate({ ...selectedDate, [type]: date })
    if (type === TYPES.start) {
      setIsCalanderDisabled({ ...isCalanderDisabled, [TYPES.end]: false })
      setCalStartingDate({ ...calStartingDate, end: moment(date).clone().add(1, 'd') });
      chooseMonth(moment(date).clone().add(1, 'd'), TYPES.end)
    }
    else {
      console.log(`START: ${new Date(selectedDate[TYPES.start])}\nEND: ${new Date(date)}`)
    }
  };


  const chooseMonth = (month, type) => {
    setSelectedMonth({ ...selectedMonth, [type]: month })
    setIsMissingNextMonth({ ...isMissingNextMonth, [type]: isPassNextMonth(month) });
    setIsMissingPrevMonth({ ...isMissingPrevMonth, [type]: isBeforePrevMonth(month) });
    setIsCurrentMonth({ ...isCurrentMonth, [type]: month.clone().format(DATE_FORMAT) === moment().format(DATE_FORMAT) });
  }

  const chooseNextMonth = (type) => {
    if (isMissingNextMonth[type]) {
      return;
    }

    let nextSelectedMonth = selectedMonth[type].clone().add(1, 'month');
    chooseMonth(nextSelectedMonth, type);
  }

  const choosePrevMonth = (type) => {
    if (isMissingPrevMonth[type]) {
      return;
    }

    let prevSelectedMonth = selectedMonth[type].clone().subtract(1, 'month');
    chooseMonth(prevSelectedMonth, type);
  }


  const isPassNextMonth = (month) => {
    let nextSelectedMonth = month.clone().add(1, 'month');
    const lastMonth = moment(nextXMonth[nextXMonth.length - 1]);

    return nextSelectedMonth.isAfter(lastMonth);
  }

  const isBeforePrevMonth = (month) => {
    let prevSelectedMonth = month.clone().subtract(1, 'month');
    const firstMonth = moment(nextXMonth[0]);

    return moment(prevSelectedMonth).startOf('day').isBefore(moment(firstMonth).startOf('day'));
  }

  return {
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
  }
}