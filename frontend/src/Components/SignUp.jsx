import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [username , setName] = useState('');
    const [password , setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
            const result = await fetch("http://localhost:5000/signup" , {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username , email , password}),
            });
            const data = await  result.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                console.log('SignUp : ', data);
                alert("Sign Up successfull !")
                navigate('/');
            }
        } catch (error) {
          alert("SignUp error");
            console.log('Error : ', error);
        }

    }
  return (
    <div>
        <h1> Sign Up </h1>
        <form onSubmit={handleSignUp}>
            <input type="text" placeholder='Enter your name'  onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Submit</button>
            <p>Already have an account ? <Link to="/login">Login Now</Link> </p>
        </form>
    </div>
  )
}

export default SignUp;