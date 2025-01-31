import React from 'react';
import './Web.css'; // Импортируем стили

function App() {
  return (
    <div className="background">
      <div className="container">
        <div className="centered-div"></div>
      </div>
    </div>
  );
}

export default App;

import backgroundImage from './assets/image.png';

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="background">
      <div className="container">
        <div className="centered-div"></div>
      </div>
    </div>
  );
}
