import React, { useState } from 'react'
import { cancelBooking, getBookingConfirmCode } from '../utils/ApiFunctions'
import moment from "moment"

export const FindBooking = () => {
    const [confirmCode, setConfimCode] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        room: { id: "" },
        bookingCode: "",
        roomType: "",
        checkIn: "",
        checkOut: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: "",
        roomName: "",
        description: ""
    })

    const clearBookingInfo = {
        id: "",
        room: { id: "" },
        bookingCode: "",
        roomType: "",
        checkIn: "",
        checkOut: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: "",
        roomName: "",
        description: ""
    }

    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (e) => {
        setConfimCode(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingConfirmCode(confirmCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(clearBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(clearBookingInfo)
            setConfimCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input className='form-control' id='bookingCode' name='bookingCode' value={confirmCode} type="text" required
                            onChange={handleInputChange} placeholder='Enter the booking confirmation code' />
                        <button className='btn btn-hotel input-group-text'>Find Booking</button>
                    </div>
                </form>
                {isLoading ? (
                    <div className='text-secondary'>Finding Booking ...</div>
                ) : error ? (
                    <div className='text-danger'>{error}</div>
                ) : bookingInfo.bookingCode ? (
                    <div className='col-md-6 mt-4 mb-5'>
                        <h3>Booking Information</h3>
                        <p>Confirmation Code: {bookingInfo.bookingCode}</p>
                        <p>Booking Id: {bookingInfo.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>Check-in date: {" "} {moment(bookingInfo.checkIn).subtract(1, "month").format("MMM Do, YYYY")}</p>
                        <p>Check-out date: {" "} {moment(bookingInfo.checkOut).subtract(1, "month").format("MMM Do, YYYY")}</p>
                        <p>Guest Name: {bookingInfo.guestFullName}</p>
                        <p>Guest Email: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Chldren: {bookingInfo.numOfChildren}</p>
                        <p>Total Guests: {bookingInfo.totalNumOfGuest}</p>

                        {!isDeleted && (
                            <button className='btn btn-danger' onClick={() => handleCancelBooking(bookingInfo.id)}>Cancel Booking</button>
                        )}
                    </div>
                ) : (
                    <div className='text-secondary'>Finding Booking ...</div>
                )}
                {isDeleted && (
                    <div className='alert alert-success mt-3' role='alert'>{successMessage}</div>
                )}
            </div>
        </>
    )
}
