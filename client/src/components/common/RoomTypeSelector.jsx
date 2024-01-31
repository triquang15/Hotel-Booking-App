import React, { useEffect, useState } from 'react'
import { getRoomType } from '../utils/ApiFunctions';

export const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showRoomType, setShowRoomType] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomType().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowRoomType(false)
        }
    }
    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select class="form-select" name="roomType" id="roomType" value={newRoom.roomType} onChange={(e) => {
                        if (e.target.value === "Add New") {
                            setShowRoomType(true)
                        } else {
                            handleRoomInputChange(e)
                        }
                    }}>
                        <option value={""}>Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <br />
                    {showRoomType && (
                        <div className='input-group'>
                            <input className='form-control' type="text" required placeholder='Enter a new room type'
                                onChange={handleNewRoomChange} />
                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
