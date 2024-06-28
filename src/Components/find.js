import { useState } from "react";
import Map from './map';
import { Link } from 'react-router-dom';
// import './find.css';
// import '../App.css';
import './Cards.css';
import './Services.css';
// import './pages/Services.css';
// import CardItem from "./CardItem";
import Services from "./Services";
import Cards from "./Cards";


function CardItem(props) {
    return (
      <>
        <li className='cards__item'>
           {/* <Link to={props.path} className='cards__item__link'>  */}
            <figure data-category={props.label} className='cards__item__pic-wrap'>
              <img src={`images/${props.src}`} alt="Travel destination" className='cards__item__img'/>
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          {/* </Link> */}
        </li>
      </>
    )
  }

export default function Find()
{

const[coordinates, setCoords] = useState([51.505,-0.09]);
  const[mapKey,setMapKey] = useState(0);

  const routeChange = async (e) => { 
    // let path = '/'; 
    // navigate(path);
    e.preventDefault();
    try{
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude,longitude} = position.coords;
        setCoords([latitude, longitude]);
        setMapKey(mapKey => mapKey + 1);
      },error => console.log(error),{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

      // const response = await fetch(`http://localhost:8000/location-outlets?latitude=${coords.latitude}&longitude=${coords.longitude}&radius=${50}`);

      // const data = await response.json();
      //setLocationOutlets(data);
    }
    catch(error)
    {
      console.log("error fetching location");
    }
  }

    return(
        <>
            <form className='search'>
          <div className='search-container'>
            <label >Search By Place</label>
            <input id='location' type='text' placeholder='Search your location' />
          </div>
           <div className='row-container'>

            <div className='search-container'>
              {/* <label>From</label>
              <input id='check-in' type='date' /> */}
              <label >Search By type</label>
              <select id='type'>
                <option value="all" selected>All</option>
                <option value="trekking">Trekkking</option>
                <option value="camping">Camping</option>
                <option value="hiking">Hiking</option>
                
              </select>
            {/* <input id='location' type='text' placeholder='what you want to look for?' /> */}
            </div>
            <div className='search-container'>
              {/* <label>To</label>
              <input id='check-out' type='date' /> */}
              <label >Enter Search Limit</label>
              <select id='radius'>
                <option val={-1} selected>All</option>
                <option value={5}>5km</option>
                <option value={10}>10km</option>
                <option value={15}>15km</option>
                <option value={25}>25km</option>
                <option value={50}>50km</option>
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
      <Map loc = {coordinates} cnt={mapKey}/>
       <section className='heading'>
        <h2>Activities we think you would enjoy</h2>
        <div className='services-container'>
          <div className='services-wrapper'> 
         <ul className='services-items'>
           <CardItem 
              src="Devkund.png"
              text="Explore the hidden waterfall deep inside Devkund!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Devkund.png"
              text="Explore the hidden waterfall deep inside Devkund!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Devkund.png"
              text="Explore the hidden waterfall deep inside Devkund!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            <CardItem 
              src="Devkund.png"
              text="Explore the hidden waterfall deep inside Devkund!"
              label="Adventure"
              path="/services/activity"
            ></CardItem>
            </ul> 
          </div>
        </div>
      </section> 
      {/* <Services/> */}
    {/* <Cards></Cards> */}
        </>
    );
}