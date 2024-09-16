
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VendorSignUp = () => {
  const [username, setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    alert(username);
    try {
      const result = await fetch("http://localhost:5000/vendor/signup" , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username , email , password}),
    });
    const data = await  result.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        // localStorage.setItem('username', )
        console.log('SignUp : ', data);
        alert("Sign Up successfull !")
        navigate('/');
    }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
    <h1>Vendor Sign Up</h1>
    <form onSubmit={handleSignUp}>
      <input type="text" placeholder='Enter your name' onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
<button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default VendorSignUp