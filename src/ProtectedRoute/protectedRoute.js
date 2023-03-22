import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
// impor { outle} 

const ProtectedRoute = ({ isAuthenticated, children, isAdminRoute='false', isAdmin='false' })=> {
console.log("isAuthenticated" + isAuthenticated)
if(!isAuthenticated)
    return <Navigate to='/login'/>

if(isAdminRoute && !isAdmin)
    return <Navigate to='/profile'/>

    return children ? children : <Outlet/>
}

export default ProtectedRoute