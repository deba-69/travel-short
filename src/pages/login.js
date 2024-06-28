import React from 'react';
import '../../App.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function LogIn() {

  const [form,setForm] = useState({});

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
        Navigate('/');
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
            <input type='text' onChange={handleInp} name="email" placeholder='johndoe@gmail.com'></input><br/>
            <label>Password</label>
            <input type='password' onChange={handleInp} name="password" placeholder='password'></input><br/>
            <button type='submit' className='btn-sign'>Sign In</button>
          </form>

          <div>
            <p className='have-account'>Don't Have an account? <span><Link to="/sign-up">Register here </Link></span></p>
          </div>
        </div>

      </div>
    </div>
  );
}