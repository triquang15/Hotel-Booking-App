import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

export const EditRoom = () => {

  const [room, setRoom] = useState({
    image: null,
    roomType: "",
    roomPrice: ""
  })

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {roomId} = useParams();

  const hanleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setRoom({ ...room, image: selectedImage })
    setImagePreview(URL.createObjectURL(selectedImage))
    console.log("Image", selectedImage);
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setRoom({ ...room, [name]: value })
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setImagePreview(roomData.image)
      } catch (error) {
        console.error(error);
      }
    }
    fetchRoom()
  },[roomId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await updateRoom(roomId, room)
      if (success.status === 200) {
        setSuccessMessage("Room updated sucessfully!")
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setImagePreview(updatedRoomData.image)
        setErrorMessage("")
      } else {
        setErrorMessage("Error updating room")
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message)
    }

    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  return (
    <div className='container mt-5 mb-5'>
      <h3 className='text-center mb-5 mt-5'>Update Room</h3>
    <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
            
            {successMessage && (
                <div className='alert alert-success' role='alert'>{successMessage}</div>
            )}

            {errorMessage && (
                <div className='alert alert-danger' role='alert'>{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='roomType' className='form-label hotel-color'>Room Type</label>
                    <input type="text" className='form-control' id='roomType' name='roomType' value={room.roomType} onChange={handleInputChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor='roomPrice' className='form-label hotel-color'>Room Price</label>
                    <input className='form-control' required id='roomPrice' name='roomPrice'
                    value={room.roomPrice} onChange={handleInputChange} type='number'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='image' className='form-label hotel-color'>Image</label>
                    <input type="file" id='image' name='image' className='form-control ' required
                    onChange={hanleImageChange} />
                    {imagePreview && (
                        <img src={`data:image/*;base64, ${imagePreview}`} style={{maxWidth: '400px', maxHeight: '400px'}} className='mb-3' alt="Room Image" />
                    )}
                </div>
                <div className='d-grid gap-2 d-md-flex mt-2'>               
                    <button type='submit' className='btn btn-outline-success'> 
                       Update
                    </button>
                    <Link to={"/rooms"} className='btn btn-outline-danger ml-5'>Cancel</Link>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}
