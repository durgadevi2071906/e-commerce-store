import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  // console.log('footer')
  return (
    <footer>
      <div className="footer__container">
        <div className="col details">
          <Link className="logo">
            Gurha<span>Store</span>
          </Link>
          <h4>About Us.</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit recusandae 
            excepturi ullam. A laborum esse quis ex accusantium, maxime est.
          </p>
        </div>
        <div className="col">
          <h4>Navlink</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contaxt US</Link>
        </div>
        <div className="col">
          <h4>Usefull link</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/contact">Contaxt US</Link>
        </div>
        <div className="col details">
          <h4>Get in Touch</h4>
          <div className="social">
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-square-youtube"></i>
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer