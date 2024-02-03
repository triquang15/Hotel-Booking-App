import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions'
import { RoomCard } from './RoomCard'
import { Col, Container, Row } from 'react-bootstrap'
import { RoomFilter } from '../common/RoomFilter'
import { RoomPage } from '../common/RoomPage'

export const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomPerPage] = useState(5)
    const [fitleredData, setFilteredData] = useState([{ id: "" }])

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div>Loading ...</div>
    }

    if (error) {
        return <div className='text-danger'>{error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(fitleredData.length / roomPerPage)
    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomPerPage
        const endIndex = startIndex + roomPerPage
        return fitleredData.slice(startIndex, endIndex).map((room) => <RoomCard key={room.id} room={room} />)
    }

    return (
        <Container>
            <h1 className='text-center'>Find your next stay</h1> 
            <h4 className='text-center'>Search low prices on hotels, homes and much more...</h4><br />
            <Row>
                <Col md={6} className='mb-3 mb-md-0'>
                    <RoomFilter data={data} setFilterData={setFilteredData} />
                </Col>
            </Row>
            <Row>
                {renderRooms()}
            </Row>
            <Row>
                <Col md={6} className='d-flex align-items-center justify-content-end'>
                    <RoomPage currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Col>
            </Row>
        </Container>
    )
}
