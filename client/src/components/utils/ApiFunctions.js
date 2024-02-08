import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getHearder = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

/** This function add new room */
export async function addNewRoom(image, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const res = await api.post("/api/rooms/addNewRoom", formData)
    if (res.status === 201 || res.status === 200) {
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
export async function getAllRooms() {
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

/** This function Booking Room*/
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/api/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room ${error.message}`)
        }
    }
}

/** This function Get All Booking Room*/
export async function getAllBookings() {
    try {
        const result = await api.get("/api/bookings/all-bookings")
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings ${error.message}`)
    }
}

/** This function Get Booking Room Confirm Code*/
export async function getBookingConfirmCode(confirmCode) {
    try {
        const response = await api.get(`/api/bookings/confirm/${confirmCode}`)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking ${error.message}`)
        }
    }
}

/** This function Cancel Booking Room */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/api/bookings/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error canceling booking ${error.message}`)
    }
}

/** This function get Available Rooms */
export async function getAvailableRooms(checkIn, checkOut, roomType) {
    const result = await api.get(`/api/rooms/available-rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}`)
    return result
}

/** This function register user */
export async function signUp(dataReq) {
    try {
        const response = await api.post('/api/auth/register', dataReq)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error ${error.message}`)
        }
    }
}

/** This function login user */
export async function signIn(login) {
    try {
        const response = await api.post('/api/auth/login', login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

/** This function get User Profile */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/api/users/profile/${userId}`, {
            headers: getHearder()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteUser(userId){
    try {
        const response = await api.delete(`/api/user/delete/${userId}`,{
            headers: getHearder()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

export async function getUser(userId, token) {
    try {
        const response = await api.get(`/api/users/${userId}`, {
            headers: getHearder()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/api/bookings/user/${userId}/bookings`, {
			headers: getHearder()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}