import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await  axios.post("http://localhost:5000/login", {email:email , password:password});
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.user.username);
          alert('Login Successfull');
          console.log(response.data)
          navigate('/');
        } catch (error) {
          alert('Login Failed !')
          console.error('Login error:', error.response ? error.response.data : error.message);
        }
    }
  return (
    <>
    <h1>Login</h1>
    <form  onSubmit={handleLogin}>
      <input type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Enter Password'  onChange={(e) => setPassword(e.target.value)}/>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default Login;