import React from 'react'
import { isLoggedIn } from '../myMethods'
import { Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './DashboardComponent/Dashboard'

function UnProtected({children}) {
    if(!isLoggedIn())
    {
        console.log("in is logged in");
        return <Navigate to="/Login"/>
    }
    else
    {
        return children
    }
    
}

export default UnProtected