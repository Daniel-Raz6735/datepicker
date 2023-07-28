import React, { useContext } from 'react';
import { DAYS_OF_WEEK, DatePickerContext } from '../datepicker/datepicker';
import moment from 'moment';
import { Dropdown } from '../dropdown/dropdown';
import './calendar.css';

export const Calendar = (props) => {

    const { states, functions } = useContext(DatePickerContext)
    const isCalanderDisabled = states.isCalanderDisabled[props.type]
    const isMissingPrevMonth = states.isMissingPrevMonth[props.type]
    const isMissingNextMonth = states.isMissingNextMonth[props.type]
  
  
    return (
      <div className="dp-calendar">
        <div className="cal-name">{props.calName}</div>
        <div className="cal-body">
  
          <div className="m-picker clearfix">
  
            <div className="col c-btn">
              <div
                className={`btn-month-change prev ${isMissingPrevMonth ? "disabled" : ""}`}
                onClick={() => functions.choosePrevMonth(props.type)}
              ></div>
            </div>
  
            <Dropdown {...props} />
  
            <div className="col c-btn">
              <div
                className={`btn-month-change next ${isMissingNextMonth ? "disabled" : ""}`}
                onClick={() => functions.chooseNextMonth(props.type)}
              ></div>
            </div>
  
          </div>
  
          <div className="dp-month">
            <div className="dp-header clearfix">
              {
                DAYS_OF_WEEK.map(day => (<div key={"selectorHeader" + day} className="day">{day}</div>))
              }
            </div>
  
            {states.daysOfMonth[props.type].map((week, weekIndex) => (
  
              <div className="week clearfix" key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const currentDay = moment(states.selectedMonth[props.type].clone()).startOf('day').set("date", day);
                  const dayAfterStartingDay = moment(states.calStartingDate[props.type]).startOf('day').isAfter(currentDay);
                  const isSelectedDate = moment(currentDay).isSame(moment(states.selectedDate[props.type]).startOf('day'))
  
                  return (
                    <div
                      key={"day" + dayIndex}
                      className={`day ${day === null || dayAfterStartingDay || isCalanderDisabled ? 'NA' : 'AVAILABLE'} ${isSelectedDate ? "selected": ""}`}
                      onClick={() => functions.handleDateSelection(moment(states.selectedMonth[props.type].clone()).set("date", day), props.type)}
                    >
                      {day}
                    </div>
                  )
                }
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }