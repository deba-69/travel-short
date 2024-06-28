import React from 'react';
import '../App.css';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function LogIn() {

const [form,setForm] = useState({});
const [role,setRole] = useState("");
const [key,setKey] = useState(0);
useEffect(() => {
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
  // get();
}


}, []);

const Navigate = useNavigate();
  const handleInp = (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/SignIn',{
      method: 'POST',
      body: JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    if(data.authentication)
    {
      alert(data.user);
      localStorage.setItem("user", data.user);
      localStorage.setItem('accessToken', data.accessToken);
      let type = data.isAdmin?"Admin":"User";
      
      setRole(type);
      // setKey(key+1);
      console.log(type);
      if(type === 'User')
      Navigate('/');
      
      if(type === 'Admin')
      Navigate('/Admin');
    }
    else
    {
      alert("wrong credentials")
    }

    console.log(data);
  }
  
  return (
    <div className='form-modal__container'>
      <div className='form-modal__wrapper' >
        <div className='sign-up'>
          <img src='/images/img-8.jpg' alt='Camels in the desert'></img>
        </div>
        <div className='sign-up__container'>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className='sign-up__form'>
            <label>Email</label>
            <input type='text' onChange={handleInp} name="email" placeholder='johndoe@gmail.com'></input>
            <label>Password</label>
            <input type='password' onChange={handleInp} name="password" placeholder='password'></input>
            <button type='submit' className='btn-sign'>Sign In</button>
          </form>

          <div>
            <p className='have-account'>Forgot Password? <span><Link to = "/recovery">Click here</Link></span></p>
          </div>

          <div>
            <p className='have-account'>Don't Have an account? <span><Link to="/sign-up">Register here </Link></span></p>
          </div>
        </div>

      </div>
    </div>
  );
}