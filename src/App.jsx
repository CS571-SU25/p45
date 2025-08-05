import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router';
import './App.css';

import Home from './components/Home';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import YourWishlist from './components/YourWishlist';
import Tips from './components/Tips';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="light" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand href="#/">U.S. Travel Wishlist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/about-us">About Us</Nav.Link>
            <Nav.Link href="#/wishlist">Your Wishlist</Nav.Link>
            <Nav.Link href="#/tips">Tips</Nav.Link>
            <Nav.Link href="#/other-info">Other Info</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
