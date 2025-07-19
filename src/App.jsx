import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router';
import './App.css';

import Home from './components/Home';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import YourWishlist from './components/YourWishlist';
import Tips from './components/Tips';

function NavBar() {
  const navigate = (hashPath) => {
    window.location.hash = hashPath;
  };

  return (
    <div className="navbar">
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/about-us')}>About Us</button>
      <button onClick={() => navigate('/wishlist')}>Your Wishlist</button>
      <button onClick={() => navigate('/tips')}>Tips</button>
      <button onClick={() => navigate('/other-info')}>Other Info</button>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/other-info" element={<OtherInfo />}></Route>
        <Route path="/wishlist" element={<YourWishlist />}></Route>
        <Route path="/tips" element={<Tips />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
