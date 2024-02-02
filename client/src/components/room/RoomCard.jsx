import React from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const RoomCard = ({room}) => {
  return (
    <Col className='mb-4' key={room.id} xs={12}>
        <Card>
            <CardBody className='d-flex flex-wrap align-items-center'>
                <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
                <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                    <CardImg variant='top' src={`data:image/*;base64, ${room.image}`} alt='Room photo' 
                    style={{width:'100%', maxWidth: '200px', height: 'auto'}}/>
                    </Link>
                </div>
                <div className='flex-grow-1 ml-3 px-5'>
                    <CardTitle className='hotel-color'>{room.roomType}</CardTitle>
                    <CardTitle className='room-price'>${room.roomPrice} / night</CardTitle>
                    <CardText>Hotel is part of Booking Holdings Inc., the world leader in online travel & related services.</CardText>
                </div>
                <div className='flex-shrink-0 mt-3'>
                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                        Book Now
                    </Link>
                </div>
            </CardBody>
        </Card>
    </Col>
  )
}
