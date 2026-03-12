import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/authContext'
import { toast } from 'react-toastify'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const { role } = useContext(AuthContext)

    if (!role) toast.info('Please login first...')

    return role ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoutes