import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VendorLogin = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/vendor/login', {email:email , password:password});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.v_name);
            alert('Vendor Login Successfull');
            console.log(response.data)
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <>
    <h1>Vendor Login</h1>
    <form onSubmit={handleLogin}>
        <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default VendorLogin