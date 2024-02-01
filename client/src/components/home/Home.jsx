import React from 'react'
import { Header } from '../layout/Header'
import { HotelService } from '../common/HotelService'
import { Parallax } from '../common/Parallax'

export const Home = () => {
  return (
    <section>
        <Header/>
        <section className='container'>
        <Parallax/>
            <HotelService/>
        </section>
    </section>
  )
}
