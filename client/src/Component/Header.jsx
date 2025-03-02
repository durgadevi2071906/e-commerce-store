import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Profile from './Profile/Profile';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
    const [toggleManu,setToggleManu] = useState(false);
    const [isSticky,setIsSticky] = useState(false);
    const {token} = useAuth();

    useEffect( () => {
       const handlenavbar = () => { setIsSticky(window.scrollY > 30) }
       window.addEventListener('scroll',handlenavbar);
       return () => window.removeEventListener('scroll',handlenavbar); 
    },[])

    const hidemanu = ()=>{
        setToggleManu(false);
    }
    // console.log('header')
  return (
    <header style={isSticky ? { background:'#fff',top:'0px',position:'fixed',boxShadow:'0 2px 4px rgba(0,0,0,0.3)' } : {  }}>
        <div className="over-lapping" style={!token ? {paddingTop:'6px'} : {}}>
            <div className="header__container">
                <i onClick={()=>setToggleManu(!toggleManu)} className={toggleManu ? `fa-solid fa-times manu` : `fa-solid fa-bars manu`}></i>
                <Link className="logo" to='/'>
                    Gurha<span>Store</span>
                </Link>
                <nav className={toggleManu ? `active` : ``}>
                    <ul>
                        <li onClick={hidemanu}><NavLink to="/">Home</NavLink></li>
                        <li onClick={hidemanu}><NavLink to="/about">About</NavLink></li>
                        <li onClick={hidemanu}><NavLink to="/shop">Shop</NavLink></li>
                        <li onClick={hidemanu}><NavLink to="/contact">Contact US</NavLink></li>
                    </ul>
                </nav>
                {token ? <div className="btn-section"><Profile/></div> : 
                <>
                <Link to='/shop' className="search-icon" style={{ marginRight:'50px' }}>
                    <i className="fa-solid fa-search"></i>
                </Link>
                <Link to='/login' className='btn' ><button>Log in</button></Link>
                </>}
            </div>
        </div>
    </header>
  )
}

export default React.memo(Header)