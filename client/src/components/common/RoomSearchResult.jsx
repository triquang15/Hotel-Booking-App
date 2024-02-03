import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { RoomCard } from '../room/RoomCard'
import { RoomPage } from './RoomPage'

export const RoomSearchResult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 5
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResults = results.slice(startIndex, endIndex)

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className='text-center mt-5'>Seach Result</h5>
                    <Row>
                        {paginatedResults.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>
                    <Row>
                        {totalResults > resultPerPage && (
                            <RoomPage currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        )}
                        <div className="d-flex justify-content-center">
                        <Button  variant='danger' style={{width:'120px'}} onClick={onClearSearch}>
                            Clear Search
                        </Button>
                        </div>
                    </Row>
                </>
            ) : (
                <p></p>
            )}

        </>
    )
}
