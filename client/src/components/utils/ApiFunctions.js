import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

/** This function add new room */
export async function addNewRoom(image, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const res = await api.post("/api/rooms/addNewRoom", formData)
    if(res.status === 201 || res.status === 200) {
        return true
    } else {
        return false
    }
}

/** This function get rooms by type */
export async function getRoomType() {
    try {
        const res = await api.get("/api/rooms/roomTypes")
        return res.data
    } catch (error) {
        throw new Error("Error Fetching Room Types")
    }
}

/** This function get all rooms*/
export async function getAllRooms(){
    try {
        const res = await api.get("/api/rooms/allRooms")
        return res.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

/** This function delete room by id*/
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/api/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

/** This function update room*/
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("image", roomData.image)

    const res = await api.put(`/api/rooms/update/${roomId}`, formData)
    return res
}

/** This function get room By Id*/
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/api/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}