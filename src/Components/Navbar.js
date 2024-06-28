import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import {SignOut} from './signOut';
import './Navbar.css'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user,setUser] = useState(sessionStorage.getItem("user"));
  const [role,setRole] = useState("User");

  const handleClick = () => setClick(!click); 
  const closeMobileMenu = () => setClick(false);

  const logout = () => {
    localStorage.clear();
    closeMobileMenu();
  }

  useEffect(()=>{

  const accessToken = localStorage.getItem('accessToken');
  console.log("bandhu");
  if (accessToken) {
    const get = async () => { 
    // Perform a request to a protected route to verify the token
    const response = await fetch('http://localhost:8000/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

      if (data.authentication) {
        // Token is valid, set the user role accordingly
        console.log(data);
        setRole(data.Role);
      } else {
        // Token is invalid, clear the token and user role
        localStorage.removeItem('accessToken');
        setRole('');
      }
  }
   get();
}

    setInterval(()=>{
      setUser(localStorage.getItem("user"));
    },5000);

  },[]);

  console.log("role : "+role);
  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/User/Home' className='navbar-logo' onClick={closeMobileMenu}>
            HIKY <i className="fab fa-gripfire"></i>
          </Link>

          <div className='menu-icon' onClick={ handleClick }>
            <i className={ click ? 'fas fa-times' : 'fas fa-bars' }></i>
          </div>

          <ul className={ click ? 'nav-menu active': 'nav-menu' }>
            <li className='nav-item'>
             { (role === "User") && <Link to='/' className='nav-links' onClick={ closeMobileMenu } >
                Home
              </Link>
              }

              {
                (role === "Admin") && <Link to='/Admin' className='nav-links' onClick={closeMobileMenu} >Add Trip</Link>
              }
            </li>
            <li className='nav-item'>
              {(role === "User") &&<Link to='/location/all' className='nav-links' onClick={ closeMobileMenu } >
                Services
              </Link>
              }
              {
                (role === "Admin") &&<Link to='' className='nav-links' onClick={ closeMobileMenu } >
                Locations
              </Link>
              }
            </li>
            <li className='nav-item'>
              { (role === "User") &&
              <Link to='/location/Trekking' className='nav-links' onClick={ closeMobileMenu } >
                Trekking
              </Link>
              }

              {(role === "Admin") &&
                <Link to='/DispTrips' className='nav-links' onClick={ closeMobileMenu } >
                Trips
              </Link>
              }
            </li>
            <li className='nav-item'>
              {
                (role === "User") &&
              <Link to='/location/Hiking' className='nav-links' onClick={ closeMobileMenu } >
                Hiking
              </Link>
              }
              {
                (role === "Admin") &&
              <Link to='' className='nav-links' onClick={ closeMobileMenu } >
                Booked Users
              </Link>
              }
            </li>
            <li className='nav-item'>
              {
                (role === "User") &&
              <Link to='/location/Camping' className='nav-links' onClick={ closeMobileMenu } >
                Camping
              </Link>
              }
            </li>
            <li>
              {
                (role === "User") &&
            <Link to='/bookingDetails' className='nav-links' onClick={ closeMobileMenu } >
                MyTrips
              </Link>
              }
            </li>
            <li className='nav-item'>
              {
                (!user) &&
              <Link to='/sign-In' className='nav-links-mobile' onClick={ closeMobileMenu } >
                Sign up
              </Link>
              }

              {
                user &&
                <Link to='/' className='nav-links-mobile' onClick={ logout } >
                Log Out
              </Link>

              }
            </li>
          </ul>
          {/* this is the children of Button component that has a buttonStyle */}
          {button&& (!user)  && <Button buttonStyle='btn--outline'>Sign Up</Button>}
          {button && (user) &&
                <SignOut buttonStyle='btn--outline' onClick={logout}>Sign out</SignOut>
              }
          </div>

      </nav>
    </>
  )
}

export default Navbar;
