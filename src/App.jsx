import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import FlashCardsPage from './FlashcardPage';
import ContactMePage from './ContactMePage';
import './App.css'; 

const App = () => {
  return (
    <Router basename="https://github.com/GunelD/as3_wm1.git">
      <nav className="navbar">
        <button className="nav-button"><Link to="/">Home</Link></button>
        <button className="nav-button"><Link to="/flash-cards">Flash Cards</Link></button>
        <button className="nav-button"><Link to="/contact">Contact Me</Link></button>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flash-cards" element={<FlashCardsPage />} />
        <Route path="/contact" element={<ContactMePage />} />
      </Routes>
    </Router>
  );
};

export default App;

