import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import './App.css';

import Index from './Routes/index';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
    <Index/>
      </BrowserRouter>
    </div>
  );
}

export default App;



