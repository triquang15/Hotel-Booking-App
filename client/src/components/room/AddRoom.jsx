import React, { useState } from 'react'
import { addNewRoom } from '../utils/ApiFunctions';
import { RoomTypeSelector } from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom';

export const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        image: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }

        setNewRoom({ ...newRoom, [name]: value })
    }

    const hanleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, image: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addNewRoom(newRoom.image, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccessMessage("A new room was added")
                setNewRoom({ image: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <div className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add a New Room</h2>
                        {successMessage && (
                            <div className='alert alert-success fade show'>{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div className='alert alert-danger fade show'>{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-label'>Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomChange} newRoom={newRoom} />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label'>Room Price</label>
                                <input className='form-control' required id='roomPrice' name='roomPrice'
                                    value={newRoom.roomPrice} onChange={handleRoomChange} type='number' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='image' className='form-label'>Image</label>
                                <input type="file" id='image' name='image' className='form-control'
                                    onChange={hanleImageChange} />
                                {imagePreview && (
                                    <img src={imagePreview} style={{ maxWidth: '400px', maxHeight: '400px' }} className='mb-3' alt="Room Image" />
                                )}
                            </div>
                            <div className='d-grid gap-2 d-md-flex mt-2'>
                                <button type='submit' className='btn btn-outline-success'>
                                    Submit
                                </button>
                                <Link to={"/rooms"} className='btn btn-outline-danger ml-5'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
