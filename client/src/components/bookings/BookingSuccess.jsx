import React from 'react'
import { useLocation } from 'react-router-dom'
import { HeaderPage } from '../common/HeaderPage'

export const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

  return (
    <div className='container'>
        <br />
        {message ? (
            <HeaderPage title="Booking Success"/>
        ): (
             <HeaderPage title="Booking Failed"/>
        )}

        <div className='mt-5 confirmed'>
            {message ? (
                <div>
                    <h3 className='text-success text-center'>Your booking is now confirmed!</h3>
                    <p className='text-success text-center'>{message}</p>
                </div>
            ) : (
                <div>
                    <h3 className='text-danger text-center'>Error Booking Room!</h3>
                    <p className='text-danger text-center'>{error}</p>
                </div>
            )}
        </div>
    </div>
  )
}
