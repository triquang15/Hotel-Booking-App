import React from 'react'
import {Link} from 'react-router-dom'

export const Admin = () => {
  return (
    <section className='container mt-5'>
        <br />
        <h2 className='text-center'>Welcome to Admin Panel</h2>
        <hr />
        <Link to={'/add-room'}>Manage Rooms</Link>
    </section>
  )
}
