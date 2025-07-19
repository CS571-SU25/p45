import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router';
import './App.css';

import Home from './components/Home';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import YourWishlist from './components/YourWishlist';
import Tips from './components/Tips';

function NavBar() {
  const goTo = (path) => {
    window.location.hash = path;
  };

  return (
    <div style={{ padding: '10px', textAlign: 'center', background: '#eee' }}>
      <button onClick={() => goTo('/')} style={{ margin: '0 10px' }}>Home</button>
      <button onClick={() => goTo('/about-us')} style={{ margin: '0 10px' }}>About Us</button>
      <button onClick={() => goTo('/wishlist')} style={{ margin: '0 10px' }}>Your Wishlist</button>
      <button onClick={() => goTo('/tips')} style={{ margin: '0 10px' }}>Tips</button>
      <button onClick={() => goTo('/other-info')} style={{ margin: '0 10px' }}>Other Info</button>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
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
