import {  useState } from 'react';

export const useDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        start: false,
        end: false
    })

    const setDropdownState = (value, type) => {
        setIsDropdownOpen({ ...isDropdownOpen, [type]: value })
    }

    return {
        isDropdownOpen,
        setDropdownState
    }
}