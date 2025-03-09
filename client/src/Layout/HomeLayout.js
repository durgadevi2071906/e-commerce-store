import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import {ToastContainer} from 'react-toastify'
function HomeLayout() {
    const {token} = useAuth();
    if(!token){
        return <Navigate to='/login' replace />
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

export default HomeLayout
