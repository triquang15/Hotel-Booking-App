import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import { HeaderPage } from '../common/HeaderPage'
import { BookingTable } from './BookingTable'

export const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")
    
    useEffect(() => {
		setTimeout(() => {
			getAllBookings()
				.then((data) => {
					setBookingInfo(data)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error.message)
					setIsLoading(false)
				})
		}, 1000)
	}, [])

    const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingId)
			const data = await getAllBookings()
			setBookingInfo(data)
		} catch (error) {
			setError(error.message)
		}
	}

  return (
    <section className='container' style={{backgroundColor: "whitesmoke"}}>
        <HeaderPage title={"Manage Bookings"}/> <br />
        {error && (<div className='text-danger'>{error}</div>)}
        {isLoading ? (
            <div className='text-danger'>Loading bookings...</div>
        ): (
            <BookingTable 
            bookingInfo={bookingInfo} 
            handleCancelBooking={handleBookingCancellation}/>
        )}
    </section>

  )
}
