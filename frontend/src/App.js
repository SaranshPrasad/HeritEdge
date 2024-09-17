
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Login from './Components/Login';
import VendorLogin from './Components/VendorLogin';
import VendorSignUp from './Components/VendorSignUp';
import Footer from './Components/Footer';
import Header from './Components/Header';


function App() {

  return (
    <Router>
    <div className="App">       
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='vendor/login' element={<VendorLogin />} />
            <Route path='vendor/signup' element={<VendorSignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
