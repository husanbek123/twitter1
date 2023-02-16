import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom';




function ProtectedRoute({children}) {
    let navigate = useNavigate()

    let {isUserLoggedIn} = useSelector(state => state)
    console.log(isUserLoggedIn);

    useLayoutEffect(() => {
    }, [])
    
    if(!isUserLoggedIn) {
        return <Navigate to="/login" />
    }
    return children
}
export default ProtectedRoute