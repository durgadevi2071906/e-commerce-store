import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [rerrors, setRErrors] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoding, setIsLoding] = useState(false);

  const register = async (registerData) => {
    try {
      setIsLoding(true);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      const res = await axios.post("http://localhost:8000/v1/signup", registerData, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': Cookies.get('XSRF-TOKEN')
        }
      });
      const data = await res.data;
      if (data.status) {
        setIsLoding(false);
        Cookies.set('token', data.token);
        setUser(data.user);
        setToken(data.token)
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

  const login = async (username, password) => {
    try {
      setIsLoding(true);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      const res = await axios.post("http://localhost:8000/v1/signin", { email: username, password: password }, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
          'Authorization': `Berear ${Cookies.get('token')}`
        }
      });
      const data = await res.data;
      if (data.status) {
        setIsLoding(false);
        Cookies.set('token', data.token);
        setUser(data.user);
        setToken(data.token)
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
      setRErrors(data.errors)
    }
  }

  const logout = async () => {

    try {
      const res = await axios.post("http://localhost:8000/v1/logout", { id: user.id }, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await res.data;
      if (data.status) {
        Cookies.remove('token');
        setUser(null);
        setToken('')
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
        navigate('/login')
      }
    } catch (err) {
      const data = err.response.data;
      console.log(data)
    }
  }

  const getAuthUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/v1/user', {
        headers: {
          'X-XSRF-Token': Cookies.get('XSRF-TOKEN'),
          'Authorization': `Bearer ${Cookies.get('token')}`,
        }
      });
      const data = res.data;
      if (data.status) {
        setUser(data.user)
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
    if(token){
      getAuthUser();
    }
  }, []);

  return <AuthContext.Provider value={{ user, token, errors, rerrors, login, logout, register, isLoding }} >
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => { return useContext(AuthContext) };
