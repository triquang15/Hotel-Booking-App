import React from 'react'
import {Container} from 'react-bootstrap'

export const Parallax = () => {
  return (
    <div className='parallax mb-5'>
        <Container className='text-center px-5 py-5 justify-content-center'>
            <div className='animated-texts bounceIn'>
            <h1><span className='hotel-color'>Take your longest holiday yet</span></h1>
            </div>
            <h3>Browse properties offering long-term stays, many at reduced monthly rates.</h3>
        </Container>
    </div>
  )
}
