
import './App.css';
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Result from './Result';

function App() {
  
  return (
    <Router>
      <div className="App">
        
        <header className="App-header">
          <Routes>
            <Route path="/login" element = {<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
      </header>
      </div>
    </Router>
  );
}

export default App;
