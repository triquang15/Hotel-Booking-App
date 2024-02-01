import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick =() => {
        setShowAccount(!showAccount)
    }
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span className='hotel-color'>Booking Hotel</span>
                </Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll' aria-controls='navbarScroll'
                    aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-srcoll'>
                        <li className='nav-item'>
                            <NavLink to={"/all-rooms"} className='nav-link' aria-current='page'>All Rooms</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to={"/admin"} className='nav-link' aria-current='page'>Admin</NavLink>
                        </li>
                    </ul>
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={"/find-booking"}>Find My Booking</NavLink>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                            href='' role='button' data-bs-toggle='dropdown' aria-expanded='false' onClick={handleAccountClick}>{""}My Account</a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby='navbarDropdown'>
                                <li>
                                    <Link to={'/login'} className='dropdown-item'>Login</Link>
                                </li>
                                <li>
                                    <Link to={'/profile'} className='dropdown-item'>Profile</Link>
                                </li>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <li>
                                    <Link to={'/logout'} className='dropdown-item'>Logout</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}