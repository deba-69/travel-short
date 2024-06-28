import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import Services from './Components/Services';
import SignUp from './Components/SignUp';
import Destination from './Components/Destination';
import ScrollToTop from './Components/ScrollToTop';
import LogIn from './Components/login';
import './App.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RecoverPass from './Components/recoverPass';
import Form from './Components/form';
import UserLogin from './Components/UserLogin';
import UserBooking from './Components/userBooking';
import Admin from './Components/Admin';
import Disp_trips from './Components/dispTrips';

function Logout()
{  
  localStorage.clear();
  return(
    <>
    <Home></Home>
    </>
  )
}

function App() {
  const [key,setKey] = useState(0);

 
  // const [user,setuser] = useState("Guest");

  // if(sessionStorage.getItem("user")!== null)
  // setuser(sessionStorage.getItem("user"));
  // else
  // setuser("Guest");

  // useEffect(()=>{
  //   setKey(key+1);
  // },[key]);


  return (
  //   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height:"100vh", width:"100vw"}}>
  //    <TileLayer
  //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   />
   
  // </MapContainer>
    
    <div className='App'>
        <Navbar/>
      <ScrollToTop>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/location' element={<Services />} >
            <Route path=':type' element={<Services></Services>} />
          </Route>
          <Route path='/sign-up' exact element={<SignUp />} />
          <Route path='/sign-In' exact element={<LogIn />} />
          <Route path='/place/:id' element={<Destination/>} />
          <Route path='/Book/:loc' element={<Form/>} />
          <Route path='/recovery' element={<RecoverPass/>} />
          <Route path='/bookingDetails' element = {<UserBooking/>} />
          <Route path='/Admin' element={<Admin></Admin>} />
          <Route path='/DispTrips' element = {<Disp_trips />} />
        </Routes>
      </ScrollToTop> 
      {/* <SignUp /> */}
      {/* <Routes>
      <Route path='/sign-up' exact element={<SignUp />} />
      <Route path='/' exact element={<LogIn />} />
        <Route path='User' element = {<Navbar/>} >
        <Route path='./home' element={<Home />} />
          <Route path='./location' element={<Services />} >
            <Route path='./:type' element={<Services></Services>} />
          </Route>
        </Route> */}
      {/* </Route> */}
      {/* <Route path='/User' exact element = {<UserLogin/>} /> */}
      {/* </Routes> */}
      {/* <UserLogin/> */}

      
    </div>
  );
}

export default App;
