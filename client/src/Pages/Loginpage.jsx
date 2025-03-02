import React, { useState } from 'react'
import {useAuth} from '../Context/AuthContext';
import { Link } from 'react-router-dom'

function Loginpage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {rerrors,login,isLoding} = useAuth()
    const handlelogin = (event) =>{
        event.preventDefault();
        login(email,password);
    }


  return (
    <section style={{ paddingTop:'90px' }} className='login'>
      <form autoComplete='off' onSubmit={handlelogin}>
        <span><Link style={{ color:'#222',textDecoration: 'none' }} to='/'><i className="fa-solid fa-times"></i></Link></span>
        <h2>Log in</h2>
        <div className="form-control">
            <label>Email</label><br/>
            <input style={rerrors.email && { borderColor:'red',boxShadow:'0 0 5px rgba(237, 47, 5, 0.8)' }} onChange={(e) => setEmail(e.target.value)} type="text" name='email' value={email} placeholder='Enter email' />
            {rerrors && <p style={{ color:'red' }}>{rerrors.email}</p>}
        </div>
        <div className="form-control">
            <label>Password :</label><br/>
            <input style={rerrors.password && { borderColor:'red',boxShadow:'0 0 5px rgba(237, 47, 5, 0.8)' }} onChange={(e) => setPassword(e.target.value)} type="password" value={password} name='password' placeholder='Enter password' />
            {rerrors && <p style={{ color:'red' }}>{rerrors.password}</p>}
        </div>
        <div className="form-control">
          <button disabled={isLoding} type='submit'>{isLoding ? 'wait some seccond' : 'Loged In'}</button>
        </div>
        <div className="form-control">
          <p>Don,t have a account <Link style={{ color:'blue' }} to='/register'>Create a Account</Link>?</p>
        </div>
      </form>
    </section>
  )
}

export default Loginpage
