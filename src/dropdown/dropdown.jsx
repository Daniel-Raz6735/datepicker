import React, { useContext } from 'react';
import { DATE_FORMAT, DatePickerContext } from '../datepicker/datepicker';
import './dropdown.css';

export const Dropdown = (props) => {
    const { states, functions } = useContext(DatePickerContext)

    return (
        <div className="col c-dropdown" onClick={() => functions.setDropdownState(!states.isDropdownOpen[props.type], props.type)}>
            <div tabIndex="-1" className="dp-dropdown" >
                <div className='wrap'  >
                    <div className="selected">{states.selectedMonth && states.selectedMonth[props.type].format(DATE_FORMAT)}</div>
                    <div className="arrow"></div>
                    {
                        states.isDropdownOpen[props.type] &&
                        <div className="options">
                            <div className="wrap">
                                <ul>
                                    {states.nextXMonth.map(month => (<li key={month.format(DATE_FORMAT)} onClick={() => functions.chooseMonth(month, props.type)}>{month.format(DATE_FORMAT)}</li>))}
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}