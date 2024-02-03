import React from 'react'
import { Header } from '../layout/Header'
import { HotelService } from '../common/HotelService'
import { Parallax } from '../common/Parallax'
import { RoomCarousel } from '../common/RoomCarousel'
import { RoomSearch } from '../room/RoomSearch'

export const Home = () => {
  return (
    <section>
        <Header/>
        <section className='container'>
        <RoomSearch/>
        <RoomCarousel/>
        <Parallax/>
        <HotelService/>
        </section>
    </section>
  )
}
