import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import Col from 'react-bootstrap/Col';
import { RoomFilter } from '../common/RoomFilter';
import { RoomPage } from '../common/RoomPage';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

export const ExistingRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [filterRooms, setFilterRoom] = useState([]);
    const [selectRoomType, setSelectRoomType] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMes, setErrorMsg]= useState("");

    useEffect(() => {
        fetRooms()
    }, [])

    const fetRooms = async() => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    useEffect(() => {
        if(selectRoomType === "") {
            setFilterRoom(rooms)
        } else {
            const filterRooms = rooms.filter((room) => room.roomType === selectRoomType)
            setFilterRoom(filterRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectRoomType])

    const calculateTotalPages = (filterRooms, roomPerPage, rooms) => {
        const totalRooms = filterRooms.length > 0 ? filterRooms.length : rooms.length
        return Math.ceil(totalRooms / roomPerPage)
    }

    const lastRoomIndex = currentPage * roomPerPage
    const indexOffFirstRoom = lastRoomIndex - roomPerPage
    const currentRooms = filterRooms.slice(indexOffFirstRoom, lastRoomIndex)

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDeleteRoom = async(roomId) => {
        try {
            const res = await deleteRoom(roomId)
            if(res === "") {
                setSuccessMsg(`Room No ${roomId} was delete`)
                fetRooms()
            }else {
                console.error(`Error deleting room: ${res.message}`);
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
        setTimeout(() => {
            setSuccessMsg("")
            setErrorMsg("")
        }, 3000)
    }

  return (
    <>
        {isLoading ? (
            <p>Loading rooms</p>
        ) : (
            <>
                <section className='mt-5 mb-5 container'>
                    <div className='d-flex justify-content-center mb-3 mt-5'>
                        <h2>Rooms</h2>
                        <Col md={6} className='mb-3 mb-md-0'>
                            <RoomFilter data={rooms} setFilterData={setFilterRoom}/>
                        </Col>
                
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                   <th>ID</th>
                                   <th>Room Type</th>
                                   <th>Room Price</th>
                                   <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className='text-center'>
                                         <td>#{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className='gap-2'>
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className='btn btn-info btn-sm'><FaEye/></span>
                                                <span className='btn btn-warning btn-sm'><FaEdit/></span>
                                            </Link>
                                           
                                            <button className='btn btn-danger btn-sm'
                                             onClick={() => handleDeleteRoom(room.id)}><FaTrashAlt/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPage currentPage={currentPage} totalPages={calculateTotalPages(filterRooms, roomPerPage, rooms)}
                        onPageChange={handlePageClick}/>
                    </div>
                </section>
            </>
        )}
    </>
  )
}
