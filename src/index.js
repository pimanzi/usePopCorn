import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './components/App';
// import Stars from './Stars.js';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Stars
      maxStars={5}
      messages={['terrible', 'bad', 'okay', 'good', 'amazing']}
      defaultRating={2}
    /> */}
  </React.StrictMode>
);
