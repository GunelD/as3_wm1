import React from 'react';
import './Home.css';

const HomePage = () => {
  return (
    <div className='home'>
      <h1>Welcome to My Flash Card App!</h1>
      <p>This app allows you to create, view, edit, and delete flash cards for learning and memorization.</p>

      <h2>About Me</h2>
      <p>
        Hello! I'm Gunel Dibirova, an IT student at ADA University with a love for creating innovative projects. Below are some of my projects:
      </p>
      <br></br>

      <h2>Project 1: Mini Online Store App</h2>
      <p>
        There you can filter and find the products with the help of search bar and drop-down category list. You can check it out on:  {' '}
        <a href="https://guneld.github.io/Assignment2_wm2/" target="_blank" rel="noopener noreferrer">
        https://github.com/GunelD/Assignment2_wm2.git
        </a>
      </p>
      <br></br>
      <h2>Project 2: Mini Bookstore Application</h2>
      <p>
        You can create, delete, update, retrieve the data about books, customers, authors and orders with the help of this application. You can check it out on: {' '}
        <a href="https://github.com/GunelD/As2_db.git" target="_blank" rel="noopener noreferrer">
        https://github.com/GunelD 
        </a>
      </p>
<br></br>
      <p id='readdress'>Get Started by Navigating to the Flash Cards Page in the Navigation Bar!</p>
    </div>
  );
};

export default HomePage;

