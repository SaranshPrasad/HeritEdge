import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    
    localStorage.removeItem('token');
    navigate('/login');
  }
  
  return (
    <>
   <h1>Welcome</h1> 
   <button onClick={handleLogOut}>Logout</button>
    </>
  )
}

export default Home;