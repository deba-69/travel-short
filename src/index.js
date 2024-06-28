import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import Map from './Components/map';
// import HeroSection from './Components/HeroSection';
import Find from './Components/find';
import Form from './Components/form';
import AddTrip from './Components/Admin';
import DemoSelect from './Components/demoSelect';
import UserBooking from './Components/userBooking';
import DispTrips from './Components/dispTrips';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
   <React.StrictMode>
    <BrowserRouter>
        <App></App>     
     </BrowserRouter>

     {/* <DispTrips></DispTrips> */}
     {/* <UserBooking /> */}
     {/* <Form price={200}/> */}
     {/* <AddTrip></AddTrip> */}
     {/* <DemoSelect></DemoSelect> */}
   </React.StrictMode>
    {/* <Find></Find> */}

   {/* <Map></Map>  */}
   {/* <HeroSection></HeroSection> */}

  {/* <MapEg></MapEg> */}
  </>

);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
