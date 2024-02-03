import React, { useState } from 'react'
import moment from 'moment';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { RoomTypeSelector } from '../common/RoomTypeSelector';
import { RoomSearchResult } from '../common/RoomSearchResult';

export const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkIn: "",
        checkOut: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const checkIn = moment(searchQuery.checkIn)
        const checkOut = moment(searchQuery.checkOut)
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please enter valid dates")
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("Check-in date must come before check-out date ")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkIn, searchQuery.checkOut, searchQuery.roomType).then((response) => {
            setAvailableRooms(response.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkIn = moment(searchQuery.checkIn)
        const checkOut = moment(searchQuery.checkOut)
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage("")
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkIn: "",
            checkOut: "",
            roomType: ""
        })
        setAvailableRooms([])
    }

    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>

                        <Col xs={12} md={3}>
                            <FormGroup controlId='checkIn'>
                                <FormLabel>Check-in date</FormLabel>
                                <FormControl type='date' name='checkIn' value={searchQuery.checkIn} onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")} />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={3}>
                            <FormGroup controlId='checkOut'>
                                <FormLabel>Check-out date</FormLabel>
                                <FormControl type='date' name='checkOut' value={searchQuery.checkOut} onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")} />
                            </FormGroup>
                        </Col>

                        <Col xs={12} md={3}>
                            <FormGroup controlId='checkOut'>
                                <FormLabel>Room Type</FormLabel>
                                <div className='d-flex'>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={searchQuery} />
                                    &nbsp;<Button variant='danger' style={{ height: "40px" }} type='submit'>Search</Button>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                {isLoading ? (
					<p className="mt-4">Finding availble rooms....</p>
				) : availableRooms ? (
					<RoomSearchResult results={availableRooms} onClearSearch={clearSearch} />
				) : (
					<p className="mt-4">No rooms available for the selected dates and room type.</p>
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Container>
        </>
    )
}
