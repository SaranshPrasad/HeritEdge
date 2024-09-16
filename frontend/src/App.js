
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Login from './Components/Login';
import VendorLogin from './Components/VendorLogin';
import VendorSignUp from './Components/VendorSignUp';


function App() {

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='vendor/login' element={<VendorLogin/>}></Route>
        <Route path='vendor/signup' element={<VendorSignUp/>}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
