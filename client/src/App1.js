import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Shop from './Pages/Shop/Shop'
import Contact from './Pages/Contact'
import Faq from './Pages/Faq'
import Service from './Pages/Service'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import Registerpage from './Pages/Registerpage'
import Loginpage from './Pages/Loginpage'
import BothLayout from './Layout/BothLaout'
import GuestLayout from './Layout/GuestLayout'
import HomeLayout from './Layout/HomeLayout'
import Checkout from './Pages/Checkout/Checkout'
import Order from './Pages/Order/Order'
import Cart from './Pages/Cart/Cart'
import Profilepage from './Pages/Profilepage/Profilepage'


function App() {
    return (
        <>
            <Routes>
                {/* Guest And User Both Access */}
                <Route exact path='/' element={<BothLayout/>} >
                    <Route path='/product/:id' element={<SingleProduct/>} />
                    <Route path='/service' element={<Service/>} />
                    <Route path='/faq' element={<Faq/>} />
                    <Route path='/about' element={<About />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/contact' element={<Contact />} />
                </Route>
                {/* Only Guest Access */}
                <Route exact path='/' element={<GuestLayout />} >
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Loginpage />} />
                    <Route path='/register' element={<Registerpage />} />
                </Route>
                {/* Only User Access */}
                <Route exact path='/' element={<HomeLayout />} >
                    <Route path='user' element={<Home />} />
                    <Route path='user/profile' element={<Profilepage/>} />
                    <Route path='user/cart' element={<Cart/>} />
                    <Route path='user/order' element={<Order/>} />
                    <Route path='user/checkout' element={<Checkout/>} />
                </Route>

            </Routes>
        </>
    )
}

export default App
