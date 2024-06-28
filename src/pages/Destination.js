import React from 'react';
import Footer from '../Footer';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Destination() {

  var obj = {
    loc_id: -1,
    name: '',
    type: '',
    place: {
      city: '',
      state: ''
    },
    coordinate: [
    ],
    imgname: '',
    Info: {
      highlight: [
    ],
      fulldescription: "",
      Duration: '',
      Distance: '',
      Difficulty: '',
      Price: 1299    
    }               
  }
  

  const[location,setLocation] = useState(obj);
  const navigate = useNavigate();

  const {id} = useParams();
  //console.log("id : "+id);
  useEffect(()=>{
    const loc_data = async () => {
       const response = await fetch(`http://localhost:8000/outlets?id=${id}`);
       const data = await response.json();
       setLocation(data);
       console.log(data.name);
    };
    loc_data();

  },[id]);

  return (
    <>
      <div className='destination'>
      </div>
      <div className='destination-container'>
        <div className='info-wrapper'>
          <h2>{location.name}</h2>
          <p>Visit the Amazon Jungle, admire the hidden waterfalls, and enjoy a kayak tour while gliding through the pea-green water and vines to reach glistening rocks and water vapour glinting in the sunlight. Join this real adventurous thrill with us!</p>

          <h3>Experience</h3>
          <h4>Highlights</h4>
          <ul>
            {
              location.Info.highlight.map((inf) => <li>{inf}</li>)
            }
            
            <li>Difficulty : {location.Info.Difficulty} </li>
            <li>Distance : {location.Info.Distance}</li>
            <li>Duration : {location.Info.Duration} </li>
          </ul>
          <h4>Full description</h4>
          <p>{location.Info.fulldescription}</p>
        </div>
        
      
        <div className='booking-container'>
          <div className='booking-wrapper'>
            <section className='booking-info'>
              <h5>From</h5>
              <p className='price'>&#x20B9; {location.Info.Price}</p>
              <p className='per-person'>per person</p>
            </section>
            <button type='button' className='btn-book'>Book now</button>
          </div>
        </div>
      
      </div>
      {/* <Footer /> */}
    </>
  );
}
