import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import {ToastContainer} from 'react-toastify'

function GuestLayout() {
    const {token} = useAuth()
    if(token){
        return <Navigate to='/user' replace />
    }
  return (
    <>
    <Header/>
    <Outlet/>
    <ToastContainer style={{ fontSize:'16px' }}/>
    <Footer/>
    </>
  )
}

export default GuestLayout
