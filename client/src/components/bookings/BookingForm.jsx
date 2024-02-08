import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { BookingSummary } from './BookingSummary';

export const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const currentUser = localStorage.getItem("userId");

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        numOfChildren: "",
        numOfAdults: "",
        checkIn: "",
        checkOut: ""
    })

    const { roomId } = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
		const checkInDate = moment(booking.checkIn)
		const checkOutDate = moment(booking.checkOut)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = roomPrice ? roomPrice : 0
		return diffInDays * paymentPerDay
	}
    
    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOut).isSameOrAfter(moment(booking.checkIn))) {
            setErrorMessage("Check-out date must be after check-in date!")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmited(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmCode = await bookRoom(roomId, booking)
            setIsSubmited(true)
            navigate("/booking-success", { state: { message: confirmCode } })
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h2 className='text-center'>Let us know who you are</h2>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormLabel htmlFor='guestFullName'>Full name (*)</FormLabel>
                                    <FormControl required type='text' id='guestFullName' name='guestFullName' 
                                        value={booking.guestFullName} placeholder='Enter your full name' onChange={handleInputChange} />
                                    <Feedback type='invalid'>
                                        Please enter your full name
                                    </Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor='guestEmail'>Email (*)</FormLabel>
                                    <FormControl required type='email' id='guestEmail' name='guestEmail'
                                        value={booking.guestEmail} placeholder='Enter email address' onChange={handleInputChange} />
                                    <Feedback type='invalid'>
                                        Please enter email address
                                    </Feedback>
                                </FormGroup>

                                <fieldset style={{ border: '2px' }}>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <FormLabel htmlFor='checkIn'>Check-In (*)</FormLabel>
                                            <FormControl required type='date' id='checkIn' name='checkIn'
                                                value={booking.checkIn} placeholder='Check-In Date'
                                                min={moment().format("MMM Do, YYYY")} onChange={handleInputChange} />
                                            <Feedback type='invalid'>
                                                Please select check-in date
                                            </Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <FormLabel htmlFor='checkOut'>Check-Out (*)</FormLabel>
                                            <FormControl required type='date' id='checkOut' name='checkOut'
                                                value={booking.checkOut} placeholder='Check-Out Date' 
                                                min={moment().format("MMM Do, YYYY")} onChange={handleInputChange} />
                                            <Feedback type='invalid'>
                                                Please select check-out date
                                            </Feedback>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <FormLabel htmlFor='numOfAdults'>Adults (*)</FormLabel>
                                            <FormControl required type='number' id='numOfAdults' name='numOfAdults'
                                                value={booking.numOfAdults} min={1} onChange={handleInputChange} />
                                            <Feedback type='invalid'>
                                                Please select at least 1 adult
                                            </Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <FormLabel htmlFor='numOfChildren'>Children (*)</FormLabel>
                                            <FormControl required type='number' id='numOfChildren' name='numOfChildren'
                                                value={booking.numOfChildren} min={0} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <p>By proceeding with this booking, I agree to Hotel’s <a href="">Terms of Use and Private Police</a></p>
                                    <button type='submit' className='btn btn-danger'>NEXT:FINAL STEP</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {isSubmited && (
                            <BookingSummary booking={booking} 
                            payment={calculatePayment()} 
                            isFormValid={isValidated} 
                            onConfirm={handleBooking}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
