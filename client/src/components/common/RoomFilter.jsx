import React, { useState } from "react";

export const RoomFilter = ({ data, setFilterData }) => {
    const [filter, setFilter] = useState("");
    const handleSelectChange = (e) => {
        const selectRoomType = e.target.value;
        setFilter(selectRoomType);
        const filterRooms = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectRoomType.toLowerCase()))
        setFilterData(filterRooms)
    };

    const clearFilter = () => {
        setFilter("")
        setFilterData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

    return (
    <div className="input-group mb-3">
        <span className="input-group-text" id="room-type">All Rooms</span>
        <select className="form-select" value={filter} onChange={handleSelectChange}>
            <option value={""}>Select a room type...</option>
            {roomTypes.map((type, index) => (
                <option key={index} value={String(type)}>{String(type)}</option>
            ))}
        </select>
        <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear</button>
    </div>
    );
};
