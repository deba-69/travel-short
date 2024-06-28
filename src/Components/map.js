import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css"
export default function Map(props){
 
  // const[coordinates, setCoords] = useState([51.505,-0.09]);
  // const[mapKey,setMapKey] = useState(0);
  //  const place = {lat :51.505, lng: -0.09}
  //   console.log("hello");
    // const MyComponent = ()=> {
    //   const map = useMap()
    //   console.log('map center:', map.getCenter())
    //   return null;
    // }

    // useEffect(()=>{
    //   console.log("coords changed");
    // },[coordinates]);
 
  // const routeChange = async () => { 
    
  //   // let path = '/'; 
  //   // navigate(path);
  //   try{
  //     navigator.geolocation.getCurrentPosition(position => {
  //       const {latitude,longitude} = position.coords;
       
  //       setCoords([latitude, longitude]);
  //       setMapKey(mapKey => mapKey + 1);
  //       console.log(coordinates);
  //     },error => console.log(error),{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

      /*const response = await fetch(`http://localhost:8000/location-outlets?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=${50}`);

      const data = await response.json();*/
      //setLocationOutlets(data);
  //   }
  //   catch(error)
  //   {
  //     console.log("error fetching location");
  //   }
  // }

  const trekIcon = new Icon({
    iconUrl: require('../../src/icons8-trekking-50.png'),
    iconSize: [38,38]
  });
  const campIcon = new Icon({
    iconUrl: require('../../src/icons8-camping-52.png'),
    iconSize: [38,38]
  });
  const hikingIcon = new Icon({
    iconUrl: require('../../src/icons8-hiking-48.png'),
    iconSize: [38,38]
  });

  const userIcon  = new Icon({
    iconUrl: require('../../src/placeholder_684908.png'),
    iconSize: [30,30]
  });

  const icon_identifier = {
    Trekking : trekIcon,
    Camping : campIcon,
    Hiking : hikingIcon
  };
    
  // console.log("locaitons : " + props.lcs[0].name);

  // const markers = [
  // {
  //   loc:[18.4759,73.4592],
  //   name: "Tamhini Ghat",
  //   img: "Sondai.png",
  //   type: trekIcon
  // },
  // {
  //   loc:[18.9921,73.5130],
  //   name: "Kothaligadh",
  //   img: "kothaligad.png",
  //   type: campIcon
  // },
  // {
  //   loc:[19.5001,73.7023],
  //   name: "Ratangadh",
  //   img: "Ratangad.jpg",
  //   type: trekIcon
  // },
  // {
  //   loc:[19.6012,73.7092],
  //   name: "Kalsubai Peak",
  //   img: "kalsubai.jpg",
  //   type: hikingIcon
  // },
  // {
  //   loc:[19.3864,73.7781],
  //   name: "HarishChandragadh",
  //   img: "harishchandra.png",
  //   type: campIcon
  // },
  // ];
  
    return(
     <>
    
          {/* <div className='search-container'>
              <button
                className='hero-btn'
                onClick={routeChange}
              >
                Explore
              </button>
          </div> */}
          <div className='container'>
          <div className='map'>
       <MapContainer key = {props.cnt} center={props.loc} zoom={8} style={{height:"100%", width:"100%"}}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={props.loc} icon={userIcon}>

      </Marker>


      {/* <Marker position={[18.4599,73.3895]} icon={trekIcon}>
        <Popup>
          <div className='cont'>
          <h2>Devkund</h2>
          <img src="./images/Devkund.png" style={{height:"60px", width:"80px"}}></img>
          </div>
        </Popup>
      </Marker> */}

      {
        props.lcs.map((ele) => (
          // console.log("done");
          <Marker position={ele.coordinate} icon={icon_identifier[`${ele.type}`]}>
            <Popup>
              <div className='cont'>
                <h2>{ele.name}</h2>
                <img src={`./images/${ele.imgname}`} style={{height:"60px",width:"80px"}}></img>
              </div>
            </Popup>
          </Marker>
        ))
      }
        
      </MapContainer>
      </div>
      </div>
      
 </>    
    );
}