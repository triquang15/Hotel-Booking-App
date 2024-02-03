import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'

export const DateSlider = ({ onDataChange, onFilterChange }) => {
    const [dataRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    })

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onDataChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDataChange(null, null)
        onFilterChange(null, null)
    }

    return (
        <>
            <h4>Filter Bookings By Date</h4>
            <DateRangePicker ranges={[dataRange]} onChange={handleSelect} className='mb-4'/>
            <button onClick={handleClearFilter} className='btn btn-danger mt-3'>Clear Filter</button>
        </>
    )
}
