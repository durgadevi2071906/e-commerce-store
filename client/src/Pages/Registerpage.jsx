import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom'

function Registerpage() {
  const { token, errors, register, isLoding } = useAuth()
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
    register(userRegiterData);
  }
  if (token) {
    // return navigate('/')
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
