import React from 'react';
import axios from 'axios';

const App = () => {

  const handleClick = () => {
    axios.get('/auth/linkedin');
  };
  return(
    <div>Hello World
      <button onClick={handleClick}>LinkedIn</button>
    </div>
  );
};

export default App;