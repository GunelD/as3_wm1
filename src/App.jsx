import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import FlashCardsPage from './FlashcardPage';
import ContactMePage from './ContactMePage';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/flash-cards">Flash Cards</Link></li>
          <li><Link to="/contact">Contact Me</Link></li>
        </ul>
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



