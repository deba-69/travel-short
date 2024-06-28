import '../App.css';
import './HeroSection.css';
import { useState,useEffect } from 'react';

function Option (props)
{
    return(
        <option value={props.val}>{props.val}</option>
    );
}
export default function AddTrip(){
    const [form,setForm] = useState({});
    const [trips,setTrips] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [role,setRole] = useState("User");

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
   get();
}
    },[]);
    
    useEffect(() => {
        fetch('http://localhost:8000/type-outlets?type=all',)
          .then(response => response.json())
          .then(data => setTrips(data))
          .catch(error => {
            console.error('Error fetching trips:', error);
          });
    
        //   console.log(data);
      }, []);
    
   
      console.log(trips);
    const handleInp = (e) => {
        setForm({...form,
        [e.target.id] : e.target.value
        });
    }

    
    // const get_loc = async () =>{
    //     const response = await fetch('http://localhost:8000/type-outlets?type=all');
    //     const data = await response.json();
    //     console.log(data);

    //     set_loc(data)
    //     console.log(loc);

    //     if(loc!==null)
    //     setShow(true);
    // }
    // console.log(show);
    // get_loc();

    // setInterval(()=>{
    //     setKey(key+1);
    // },8000)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        alert("form submitted");
        setForm({...form, loc_id: selectedTrip});
        console.log(form);
        const response = await fetch("http://localhost:8000/AddTrip",{
            method: "POST",
            body: JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await response.json();
        if(data.verified)
        {
            alert("successfully Added");
        }
        else
        {
            alert(data.message);
        }

        console.log(data);

    }

    const handleTripChange = event => {
        setSelectedTrip(event.target.value);
        
      };

    return(
    <>
    { (role === "Admin") &&<div className="container d-flex flex-column justify-content-center">
        <h1>ADD DETAILS</h1>
        <form className="search d-flex flex-column" onSubmit={handleSubmit}>
            <div className='d-flex mb-4 justify-content-between'>
                <div className='row-container'> 
                    <div className='search-container'>
                    <label htmlFor='loc_id'>Location Name</label>
                     <select id = "loc_id" onChange={handleInp}>
                        <option value="">Select a Location</option>
                        {trips && trips.map(trip => (
                        <option key={trip.loc_id} value={trip.name}>{trip.name}</option>
                        ))}
                    </select> 
                       
                        {/* <input id='loc_id' placeholder='Enter Location Name' onChange={handleInp}></input> */}
                        {/* </select> */}
                    </div>
                </div>
                <div className="row-container">
                    <div className="search-container">
                        <label htmlFor='From'>From</label>
                        <input id='From' type='date' min={new Date().toISOString().split('T')[0]} onChange={handleInp}/>
                    </div>
                </div>
                <div className="row-container">
                    <div className="search-container">
                        <label htmlFor='To'>To</label>
                        <input id='To' type='date' min={new Date().toISOString().split('T')[0]} onChange={handleInp}/>
                    </div>
                </div>
            </div>

            <div className='d-flex mb-4 justify-content-between'>
                <div className='row-container'> 
                    <div className='search-container'>
                        <label htmlFor='Trip_coordinator'>Trip Coord.</label>
                        <input id='Trip_coordinator' placeholder='Name' onChange={handleInp}></input>
                    </div>
                </div>
                <div className='row-container'> 
                    <div className='search-container'>
                        <label htmlFor='Coordinator_PhoneNo'>Contact No.</label>
                        <input type="tel" pattern="[0-9]{10}" id='Coordinator_PhoneNo' placeholder='Phone Number' onChange={handleInp}></input>
                    </div>
                </div>
                <div className='row-container'> 
                    <div className='search-container'>
                        <label htmlFor='vacancy'>Vacancy</label>
                        <input type="number" id='vacancy' placeholder='Vacancy' onChange={handleInp}></input>
                    </div>
                </div>
            </div>

            <div className='d-flex mb-4'>
                <textarea rows={12} cols={80} id="trip_desc" onChange={handleInp} placeholder='Give details such as Trip plan, starting date, meeting point, points of interest'></textarea>

            </div>

            <div className='row-container'>
                <button type="submit" className='btn-book'>ADD</button>
            </div>
        </form>

    </div>
}
    </>        

    );
}