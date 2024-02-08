import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const user = localStorage.getItem("userId")
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}
