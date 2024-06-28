import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Services from './Services';
import SignUp from './SignUp';
import Destination from './Destination';
import ScrollToTop from './ScrollToTop';
import LogIn from './login';
import '../App.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RecoverPass from './recoverPass';
export default function UserLogin(){

    return(
    <>
        <Navbar/>
        <ScrollToTop>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/location/:type' element={<Services />} />
            <Route path='/sign-up' exact element={<SignUp />} />
            {/* <Route path='/services/activity' element={<Destination />} /> */}
            <Route path='/sign-In' exact element={<LogIn />} />
            {/* <Route path='/Log-Out' exact element={<Logout />} /> */}
            <Route path='/place/:id' element={<Destination/>} />
            <Route path='/recovery' element={<RecoverPass/>} />
          </Routes>
        </ScrollToTop>
    </>
    );
}