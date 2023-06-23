import React from 'react'
import { isLoggedIn } from '../myMethods'
import { Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './DashboardComponent/Dashboard'

function Protected({children}) {
    if(isLoggedIn())
    {
        console.log("in is logged in");
        return <Navigate to="/Dashboard"/>
    }
    else
    {
        return children
    }
    
}

export default Protected