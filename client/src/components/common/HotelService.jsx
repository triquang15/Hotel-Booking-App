import React from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap'
import { HeaderPage } from './HeaderPage'
import { FaAirFreshener, FaClock, FaCocktail, FaParking, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

export const HotelService = () => {
    return (
        <>
            <Container className='mb-2'>
                <h1 className='text-center'>Our Services</h1>
                <hr />
                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaWifi/> Wifi
                                </CardTitle>
                                <CardTitle>
                                    <CardText> Stay connect with high-speed internet access.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaUtensils/> Breakfast
                                </CardTitle>
                                <CardTitle>
                                    <CardText>Start your day with a delicious breakfast buffet.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaTshirt/> Laundry
                                </CardTitle>
                                <CardTitle>
                                    <CardText>Keep your clothes clean and fresh with our laundry service.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaCocktail/> Mini Bar
                                </CardTitle>
                                <CardTitle>
                                    <CardText>Enjoy a refreshing drink or snack from our in-room mini bar.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaParking/> Parking
                                </CardTitle>
                                <CardTitle>
                                    <CardText>Park your car conveniently in our on-site parking lot.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaAirFreshener/> Air conditioning
                                </CardTitle>
                                <CardTitle>
                                    <CardText>Stay cool and comfortable with our air conditioning system.</CardText>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
