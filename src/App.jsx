import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HashRouter, Routes, Route } from 'react-router';
import './App.css';

import Home from './components/Home';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import YourWishlist from './components/YourWishlist';
import Tips from './components/Tips';

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
