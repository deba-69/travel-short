import React from 'react';
import '../App.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';



export default function SignUp() {

  const [form,setForm] = useState({});
  const [errors,setErrors] = useState({});
  const [showOtpForm,setOtpForm] = useState(false);
  const [showPasswordForm, setPasswordForm] = useState(false);

  const err = {};
  const handleInp = (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return passwordRegex.test(password);
  };

  const navigate = useNavigate();


  //send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    

    const response = await fetch('http://localhost:8000/sendOtp',{
      method: 'POST',
      body: JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'include',
    })

    const data = await response.json();
    console.log(data);
    if(data.authenticated)
    setOtpForm(true);
    else
    err.message = data.message;

    setErrors(err);
  }


// verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/verifyOtp',{
      method: 'POST',
      body: JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'include',
    })

    const data = await response.json();

    if(data.authenticated)
    setPasswordForm(true);
    else
    {
      err.message = data.message;
    }
    setErrors(err);
  }
 

  //handle submit registration
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const errors = {};
    if (!validatePassword(form.password)) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special symbol (@$!%*?&), and be 8 to 12 characters long';
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      //console.log('Form submitted:', formData);
      const response = await fetch('http://localhost:8000/SignUp',{
        method: 'POST',
        body: JSON.stringify(form),
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'include',
      })
      const data = await response.json();
      if(data.authenticated)
      {
        navigate('/sign-In');
      }
  
      console.log(data);
    } 
    else 
    {
      setErrors(errors);
      //alert("error");
    }

   
  }


  return (
    <div className='form-modal__container'>
      <div className='form-modal__wrapper' >
        <div className='sign-up'>
          <img src='/images/img-8.jpg' alt='Camels in the desert'></img>
        </div>
        <div className='sign-up__container'>
          <h2>Sign Up</h2>
          {!showOtpForm && !showPasswordForm && (

            <form onSubmit={sendOtp} className='sign-up__form'>
            <label>Enter Email</label>
            <input type='text' onChange={handleInp} name="email" placeholder='Enter Email'></input>
            {errors.message && <span>{errors.message}</span> }
            <button type='submit' className='btn-sign'>verify Email</button>
            </form>
          )}

          {
            showOtpForm && !showPasswordForm && (
              <form onSubmit={verifyOtp} className='sign-up__form'>
              <label>OTP</label>
              <input type='text' onChange={handleInp} name="otp" placeholder='Enter OTP'></input><br/>
              {errors.message && <span>{errors.message}</span>}
              <button type='submit' className='btn-sign'>verify OTP</button>
            </form>

            )
          }

          {
            showOtpForm && showPasswordForm && (
              <form onSubmit={handleSubmit} className='sign-up__form'>
                <label>Password</label>
                <input type='password' onChange={handleInp} name="password" placeholder='password'></input><br/>
                {errors.password && <span>{errors.password}</span>}
                <label>Confirm Password</label>
                <input type='password' onChange={handleInp} name="confirmPassword" placeholder='Confirm password'></input><br/>
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                <button type='submit' className='btn-sign'>Sign Up</button>  
              </form>
            )
          }         

          <div>
            <p className='have-account'>Have an account? <span><Link to="/sign-In" >Log In here</Link></span></p>
          </div>
          <br/>
        </div>

      </div>
    </div>
  );
}