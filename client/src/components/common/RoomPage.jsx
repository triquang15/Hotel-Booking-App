import React from 'react'

export const RoomPage = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1)
  return (
    <nav>
        <ul className='pagination justify-content-center'>
            {pageNumbers.map((pageNum) => (
                <li className={`page-item  ${currentPage === pageNum ? "active" : ""}`} key={pageNum}>
                    <button className='page-link ' onClick={() => onPageChange(pageNum)}>
                        {pageNum}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}
