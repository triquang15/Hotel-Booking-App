import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import Col from 'react-bootstrap/Col';
import { RoomFilter } from '../common/RoomFilter';
import { RoomPage } from '../common/RoomPage';
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const ExistingRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [filterRooms, setFilterRoom] = useState([]);
    const [selectRoomType, setSelectRoomType] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMes, setErrorMsg] = useState("");

    useEffect(() => {
        fetRooms()
    }, [])

    const fetRooms = async () => {
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
        if (selectRoomType === "") {
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

    const handleDeleteRoom = async (roomId) => {
        try {
            const res = await deleteRoom(roomId)
            if (res === "") {
                setSuccessMsg(`Room No ${roomId} was delete`)
                fetRooms()
            } else {
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
        <div className='container col-md-8 col-lg-6'>
            {successMsg && <p className='alert alert-success mt-5'>{successMsg}</p>}
            {errorMes && <p className='alert alert-danger mt-5'>{errorMes}</p>}
        </div>
            {isLoading ? (
                <p className='text-danger'>Loading Rooms...</p>
            ) : (
                <>
                    <div className='mt-5 mb-5 container'>
                        <h3 className='text-center mb-5 mt-5'>Manage Rooms</h3>
                        <Link to={"/add-room"}>
                            <FaPlus/>Add New Room
                        </Link> <br /><br />
                        <Col md={6} className='mb-3 mb-md-0'>
                            <RoomFilter data={rooms} setFilterData={setFilterRoom} />
                        </Col>
                        <div className='d-flex justify-content-center mb-3 mt-5'>
                            <table className='table table-bordered table-hover'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>ID</th>
                                        <th>Room Type</th>
                                        <th>Room Price</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRooms.map((room) => (
                                        <tr key={room.id} className='text-center'>
                                            <td>#{room.id}</td>
                                            <td>{room.roomType}</td>
                                            <td>${room.roomPrice}</td>
                                            <td>
                                            <img src={`data:image/*;base64, ${room.image}`} style={{maxWidth: '100px', maxHeight: '100px'}} className='mb-3' alt="Room Image" />
                                            </td>
                                            <td className='gap-2'>
                                                <Link to={`/edit-room/${room.id}`}>
                                                    <span className='btn btn-info btn-sm'><FaEdit /></span>
                                                </Link>
                                                &nbsp;
                                                <button className='btn btn-danger btn-sm'
                                                    onClick={() => handleDeleteRoom(room.id)}><FaTrashAlt /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <RoomPage currentPage={currentPage} totalPages={calculateTotalPages(filterRooms, roomPerPage, rooms)}
                            onPageChange={handlePageClick} />
                    </div>
                </>
            )}
        </>
    )
}
