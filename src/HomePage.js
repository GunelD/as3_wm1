import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Flash Card App!</h2>
      <p>This app allows you to create, view, edit, and delete flash cards for learning and memorization.</p>

      <h3>About Me</h3>
      <p>
        Hello! I'm Gunel Dibirova, an IT student with a love for creating innovative projects. Below are some of my projects:
      </p>

      <h4>Project 1: Mini Online Store</h4>
      <p>
        There you can filter and find the products with the help of search bar and drop-down category list. You can check it out on{' '}
        <a href="https://guneld.github.io/Assignment2_wm2/" target="_blank" rel="noopener noreferrer">
        https://github.com/GunelD/Assignment2_wm2.git
        </a>.
      </p>

      <h4>Project 2: Mini Bookstore Application</h4>
      <p>
        You can create, delete, update, retrieve the data about books, customers, authors and orders with the help of this application. You can check it out on{' '}
        <a href="https://github.com/GunelD/As2_db.git" target="_blank" rel="noopener noreferrer">
        https://github.com/GunelD 
        </a>.
      </p>

      <p>Get started by navigating to the Flash Cards page in the navigation menu.</p>
    </div>
  );
};

export default HomePage;

