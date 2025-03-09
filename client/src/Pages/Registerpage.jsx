import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'
import useAuthStore from '../Context/AuthStore';

function Registerpage() {
  const [errors, setErrors] = useState({})
  const {setToken} = useAuthStore();
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [userRegiterData, setUserRegisteData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setUserRegisteData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleregister = async (event) => {
    event.preventDefault();
    try {
      setIsLoding(true);
      await axios.get('https://api.gurhatech.online/sanctum/csrf-cookie')
      const res = await axios.post("https://api.gurhatech.online/v1/signup", userRegiterData, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': Cookies.get('XSRF-TOKEN')
        }
      });
      const data = await res.data;
      if (data.status) {
        setIsLoding(false);
        setToken(data);
        toast.success(data.message,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        navigate('/')
      }
    } catch (err) {
      setIsLoding(false);
      const data = err.response.data;
      setErrors(data.errors)
    }
  }

  return (
    <section style={{ paddingTop: '90px' }} className='login'>
      <form autoComplete='off' onSubmit={handleregister}>
        <span><Link style={{ color: '#222', textDecoration: 'none' }} to='/'><i className="fa-solid fa-times"></i></Link></span>
        <h2>Sign In</h2>
        <div className="form-control">
          <label>Name</label><br />
          <input onChange={handleChange} type="text" name='name' value={userRegiterData.name} placeholder='Enter Name' />
          {errors && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div className="form-control">
          <label>Email</label><br />
          <input onChange={handleChange} type="text" name='email' value={userRegiterData.email} placeholder='Enter email' />
          {errors && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div className="form-control">
          <label>Password :</label><br />
          <input onChange={handleChange} type="password" name='password' value={userRegiterData.password} placeholder='Enter password' />
          {errors && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div className="form-control">
          <label>Confirm Password :</label><br />
          <input onChange={handleChange} type="password" name='password_confirmation' value={userRegiterData.password_confirmation} placeholder='Enter Confirm password' />
          {errors && <p style={{ color: 'red' }}>{errors.password_confirmation}</p>}
        </div>
        <div className="form-control">
          <button disabled={isLoding} type='submit'>{isLoding ? 'wait some seccond' : 'Create a Account'}</button>
        </div>
        <div className="form-control">
          <p>Don,t have a account <Link style={{ color: 'blue' }} to='/login'>Log In</Link>?</p>
        </div>
      </form>
    </section>
  )
}

export default Registerpage
