import './App.css'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Shop from './Pages/Shop/Shop'
import Service from './Pages/Service'
import Faq from './Pages/Faq'
import Contact from './Pages/Contact'
import Loginpage from './Pages/Loginpage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import Profilepage from './Pages/Profilepage/Profilepage'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/Order/Order'
import ProtectedRoute from './Route/ProtectedRoute'
import { ToastContainer} from 'react-toastify'
import Checkout from './Pages/Checkout/Checkout'
import Registerpage from './Pages/Registerpage'
import Success from './Route/Success'
import Cancel from './Route/Cancel'
import axios from 'axios'
import useAuthStore from './Context/AuthStore'

axios.defaults.withCredentials = true ;
const App = () => {
const {Token} = useAuthStore();

  return (
    
    <>
      <Header/>
      <Routes basename='/'>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/faq' element={<Faq/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={Token ? <Navigate to='/' replace/> : <Loginpage/>} />
        <Route path='/register' element={Token ? <Navigate to='/' replace/> : <Registerpage/>}></Route>
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/user/profile' element={<ProtectedRoute><Profilepage/></ProtectedRoute>} />
        <Route path='/user/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='/user/order' element={<ProtectedRoute><Order/></ProtectedRoute>} />
        <Route path='/user/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
        <Route path='/order/success' element={<Success/>} />
        <Route path='/order/cancel' element={<Cancel/>} />
        <Route element={<h1>Page not Found</h1>}/>
      </Routes>
      <ToastContainer style={{ fontSize:'16px' }}/>
      <Footer/>
    </>
  )
}

export default App