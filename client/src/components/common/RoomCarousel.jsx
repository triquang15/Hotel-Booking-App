import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardImg, CardTitle, Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap'

export const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{id: "", roomType:"", roomPrice:"", image:""}])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setRooms(data)
            setIsLoading(false)
        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className='mt-5'>Loading...</div>
    }

    if (errorMessage) {
        return <div className='text-danger mb-5 mt-5'>Error {errorMessage}</div>
    }
    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <h1 className='text-center'>Offers</h1>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <CarouselItem key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <CardImg variant='top' src={`data:image/*;base64, ${room.image}`}
                                                    className='w-100' style={{ height: '200px' }} alt='Room Photo'>
                                                </CardImg>
                                            </Link>
                                            <CardBody>
                                                <CardTitle className='hotel-color'>{room.roomType}</CardTitle>
                                                <CardTitle className='room-price'>${room.roomPrice} / night</CardTitle>
                                                <div className='flex-shrink-0 mt-3'>
                                                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </CarouselItem>
                    ))}
                </Carousel>
            </Container>
        </section>
    )
}
