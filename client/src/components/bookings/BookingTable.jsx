import { parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DateSlider } from './DateSlider'

export const BookingTable = ({bookingInfo, handleCancelBooking}) => {
    const [filteredBooking, setFilteredBooking] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkIn)
                const bookingEndDate = parseISO(booking.checkOut)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBooking(filtered)
    }

    useEffect(() => {
        setFilteredBooking(bookingInfo)
    },[bookingInfo])


    console.log('filterBookings',bookingInfo);

  return (
    <section className='p-4'>
        <DateSlider onDataChange={filterBookings} onFilterChange={filterBookings}/>
        <table className='table table-bodered table-hover showdow'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Room Type</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Guest Name</th>
                    <th>Guest Mail</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredBooking.map((booking) => (
                   <tr key={booking.id}>
                        <td>#{booking.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>{booking.checkIn}</td>
                        <td>{booking.checkOut}</td>
                        <td>{booking.guestFullName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numOfAdults}</td>
                        <td>{booking.numOfChildren}</td>
                        <td>{booking.totalNumOfGuest}</td>
                        <td>{booking.bookingCode}</td>
                        <td>
                            <button className='btn btn-danger btn-sm' onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filterBookings.length === 0 && <p>No Booking Found</p>}
    </section>

  )
}
