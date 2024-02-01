import React from 'react'

export const Header = () => {
  return (
    <header className='header-banner'>
        <div className='overlay'></div>
        <div className='animated-texts overlay-content'>
            <h1>Welcome to <span className='hotel-color'>Booking Hotel</span></h1>
            <h4>Booking Hotel is part of Booking Holdings Inc., the world leader in online travel and related services.</h4>
        </div>
    </header>
  )
}
