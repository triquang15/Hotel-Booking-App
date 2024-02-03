import React from 'react'
import {Link} from 'react-router-dom'

export const Admin = () => {
  return (
    <section className='container mt-5'>
        <br />
        <h2 className='text-center'>Welcome to Admin Panel</h2>
        <hr />
        <Link to={'/rooms'} className='btn btn-primary'>Manage Rooms</Link>&nbsp;&nbsp;
        <Link to={'/bookings'} className='btn btn-primary'>Manage Bookings</Link>    
    </section>
  )
}
