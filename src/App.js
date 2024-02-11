import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import Services from './Components/pages/Services';
import SignUp from './Components/pages/SignUp';
import Destination from './Components/pages/Destination';
import ScrollToTop from './Components/ScrollToTop';
import './App.css';

function App() {
  return (
    
    <div className='App'>
       <Navbar />
      <ScrollToTop>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' exact element={<Services />} />
          <Route path='/sign-up' exact element={<SignUp />} />
          <Route path='/services/activity' element={<Destination />} />
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
