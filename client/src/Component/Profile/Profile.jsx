import React, { useState } from 'react'
import './profile.css'
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useCarts } from '../../Context/Carts';

function Profile() {
  const [profileToggle,setProfileToggle] = useState(false);
  const {logout,user} = useAuth();
  const {carts} = useCarts();
  
  const hideprofile = () =>{
    setProfileToggle(false);
  }


  return (
    <>
      <Link to='/shop' className="search-icon">
        <i className="fa-solid fa-search"></i>
      </Link>
      <Link to='/product/cart' className="cart-icon">
        <i className="fa-solid fa-cart-shopping"></i>
        {carts.length > 0 && <span>{carts.length}</span>}
      </Link>
      
      <div id="user-profile-wrapper" className={profileToggle ? "active" : ""}>
        <div id="user-profile-container">
          <div id="user-profile-content">
            <div onClick={()=> setProfileToggle(!profileToggle)} className='user-profile-section'>
              <div className="user-profile-value">
                <div className="profile-value user-profile-value-account">
                <i className="fa-solid fa-user user-logo"></i>Account
                </div>
              </div>
              <div className="user-profile-value">
                <div className="profile-value user-profile-value-photo">
                    {user && user.avatar ? <img src={'https://api.gurhatech.online/public/user/'+user.avatar} alt="" /> : <img src='https://api.gurhatech.online/public/user/UIMG2025030167c34c22498ab.jpg' alt=''/>}
                </div>
              </div>
            </div>
            <div className="user-profile-list-section">
              <div className="user-profile-list-items">
                <div className="user-profile-list-item one">
                  <div className="upl-list-item-logo"><i className="fas fa-id-card"></i></div>
                  <div onClick={hideprofile} className="upl-list-item-content"><Link to="/user/profile" className="upl-list-item-link">Profile</Link></div>
                </div>
                <div className="user-profile-list-item two">
                  <div className="upl-list-item-logo"><i className="fas fa-upload"></i></div>
                  <div onClick={hideprofile} className="upl-list-item-content"><Link to="/product/order" className="upl-list-item-link">Order</Link></div>
                </div>
                <div className="user-profile-list-item tree">
                  <div className="upl-list-item-logo"><i className="fas fa-id-card"></i></div>
                  <div onClick={hideprofile} className="upl-list-item-content"><Link to="/product/cart" className="upl-list-item-link">Cart</Link></div>
                </div>
                <div className="user-profile-list-item three">
                  <div className="upl-list-item-logo">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  <div className="upl-list-item-content">
                    <div onClick={()=> logout()} className="logout-form">
                      <Link to='#' style={{ cursor:'pointer' }} className="upl-list-item-link">Logout</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(Profile)
