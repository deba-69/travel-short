import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import Footer from './Footer';

import '../App.css';
import './Cards.css';
import './Services.css';
import { useParams } from 'react-router-dom';

export default function Services(props) {
  const[locations,setlocations] = useState([]);

  const[diffloc,setdiffLoc] = useState([]);

  const[k,setKey] = useState(0); 
  const {type} = useParams();
  // console.log(type);
  useEffect(()=>{
    const getLoc = async () =>{
      const loc = await fetch(`http://localhost:8000/type-outlets?type=${type}`,{
        method: 'GET',
      });

      const data = await loc.json();

       setlocations(data);
      // setKey(k => k+1);
      console.log(locations);
    }

    getLoc();
  },[props.type]);

  return (
    <>
      <h1 className='services'>{type === 'all' ? 'Destinations' : type}</h1>
      <section className='heading'>
        <h2>Activities we think you would enjoy</h2>
        <div className='services-container'>
          <div className='services-wrapper'> 
          <ul className='services-items'>

            {
            
            locations.map((d) => 
              <CardItem
              key = {d.loc_id}
              src={d.imgname}
              text={d.name}
              label={d.type}
              path={`/place/${d.loc_id}`}
            ></CardItem>)
              
            }
            {/* <CardItem 
              src="Kalsubai.jpg"
              text="Highest Peak of Maharashtra!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Harishchandra.png"
              text="Strongly Fortified "
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Aadrai.jpg"
              text="Unexplored jungle Trek!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Sondai.png"
              text="Hidden gem in Karjat!"
              label="Adventure"
              path="/services/activity"
            ></CardItem> */}
          </ul>
          </div>
        </div>
      </section>

      {/* <section className='heading'>
        <h2>Explore these destinations</h2>
        <div className='services-container'>
          <div className='services-wrapper'> 
          <ul className='services-items'>
          <CardItem 
              src="kothaligad.png"
              text="Kothaligad"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="kothaligad.png"
              text="Kothaligad"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="kothaligad.png"
              text="Kothaligad"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="kothaligad.png"
              text="Kothaligad"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="Ratangad.jpg"
              text="Ratangad"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="destination-3.jpg"
              text="Kalsubai.jpg"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
            <CardItem 
              src="kalsubai.jpg"
              text="kavnai"
              label = "Maharashtra"
              path="/place/activity"
            ></CardItem>
          </ul>
          </div>
        </div>
      </section> */}
      {/* <Footer /> */}
    </>
  
  
  );
}