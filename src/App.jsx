import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import FlashCardsPage from './FlashCardsPage';
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
      <Route path="/" exact component={HomePage} />
      <Route path="/flash-cards" component={FlashCardsPage} />
      <Route path="/contact" component={ContactMePage} />
    </Router>
  );
};

export default App;

