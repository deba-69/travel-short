import React, { useState } from 'react'
import Map from './map';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './HeroSection.css';
import Cards from './Cards';
import CardItem from './CardItem';
function HeroSection() {
  //let navigate = useNavigate();
  const[coordinates, setCoords] = useState([51.505,-0.09]);
  const[mapKey,setMapKey] = useState(0);
  const[locations,setlocations] = useState([]);

  const routeChange = async (e) => { 
    // let path = '/'; 
    // navigate(path);
    e.preventDefault();
    const type = document.getElementById("type").value;
    const dist = document.getElementById("radius").value;
    console.log(type, dist);
    try{
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude,longitude} = position.coords;
        setCoords([latitude, longitude]);
        setMapKey(mapKey => mapKey + 1);
        console.log(coordinates);
      },error => console.log(error),{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

      const response = await fetch(`http://localhost:8000/locationOutlets?latitude=${coordinates[0]}&longitude=${coordinates[1]}&radius=${dist}&type=${type}`);

      const data = await response.json();
      console.log(data);
       setlocations(data);
    }
    catch(error)
    {
      console.log("error fetching location");
    }
  }


  return (
    <>
    <div className='hero-container'>
      <video src='./videos/video-1.mp4' autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>

      <form className='search'>
        {/* <div className='search'></div> */}
          {/* <div className='search-container'>
            <label >Search By Place</label>
            <input id='location' type='text' placeholder='Search your location' />
          </div> */}
           <div className='row-container'>

            <div className='search-container'>
              {/* <label>From</label>
              <input id='check-in' type='date' /> */}
              <label >Search By type</label>
              <select id='type'>
                <option value="all" selected>All</option>
                <option value="Trekking">Trekkking</option>
                <option value="Camping">Camping</option>
                <option value="Hiking">Hiking</option>
                
              </select>
            {/* <input id='location' type='text' placeholder='what you want to look for?' /> */}
            </div>
            <div className='search-container'>
              {/* <label>To</label>
              <input id='check-out' type='date' /> */}
              <label >Enter Search Limit</label>
              <select id='radius'>
                <option value={1000} selected>All</option>
                <option value={50}>50km</option>
                <option value={75}>70km</option>
                <option value={100}>100km</option>
                <option value={150}>150km</option>
               
              </select>
            {/* <input id='location' type='number' placeholder='Radius' />*/}
            </div> 

          </div> 
          <div className='search-container'>
              <button
                className='hero-btn'
                type='submit'
                onClick={routeChange}
              >
                Explore
              </button>
          </div>
      </form>
    </div>

    <Map loc = {coordinates} cnt={mapKey} lcs = {locations}/>
    <div className='cards'>
      <h1>Check out these epic destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {/* <Cards></Cards> */}
            {/* { <CardItem 
           src="Devkund.png"
           text="Unexplored jungle Trek!"
           label="Adventure"
            path="/place/1"
            ></CardItem> 
             } */}

             {
              // locations.map(loc => <CardItem
              // src = {loc.imgname}
              // text = {loc.name}
              // label = {loc.type}
              // path = {`/place/${loc.loc_id}`}
              // ></CardItem>)
              locations.map((d) => 
              <CardItem
              key = {d.loc_id}
              src={d.imgname}
              text={d.name}
              label={d.type}
              path={`/place/${d.loc_id}`}
            ></CardItem>)
            }
          </ul>
          </div>
      </div>
    </div>
    </>
  )
}

export default HeroSection;