import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'

export const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkIn = moment(booking.checkIn)
    const checkOut = moment(booking.checkOut)
    const numOfDays = checkOut.diff(checkIn, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessPayment, setIsProcessPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessPayment(true)
        setTimeout(() => {
            setIsProcessPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className='card card-body mt-5'>
            <h3>Your booking details</h3>
            <p>Lead Guests: <strong>{booking.guestFullName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-in: <strong>{moment(booking.checkIn).format("MMM Do YYYY")}</strong> From 15:00</p>
            <p>Check-out: <strong>{moment(booking.checkOut).format("MMM Do YYYY")}</strong> Until 12:00</p>
            <p>Reservation: 1 room, <strong>{numOfDays}</strong> night</p>
            <div>
                <h5>Number of Guests</h5>
                <strong>Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong> &nbsp;&nbsp;
                <strong>Children: {booking.numOfChildren}</strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>Your price summary: <strong>${payment}</strong></p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button variant='primary' onClick={handleConfirmBooking}>
                            {isProcessPayment ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2' role='status'
                                        aria-hidden="true"></span>&nbsp;
                                     Booking Confirmed, redirecting to payment ...
                                </>
                            ) : (
                                "COMPLETE BOOKING"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className='d-flex justify-content-center align-items-center' role='status'>
                            <div className='spinner-border text-primary'>
                                <span className='sr-only'>Loading ...</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>Check-out date must be after check-in date ! </p>
            )}
        </div>
    )
}
