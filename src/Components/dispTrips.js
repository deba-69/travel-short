import { useEffect,useState } from "react";
import "./userBooking.css";


function Trips(props)
{

    const handleCancel = (e) =>{
        // alert(e.target);
        const selectedOption = e.target;
        const optionInfo = selectedOption.getAttribute('data-place');
        console.log(optionInfo);
        var ans = window.confirm("Do you want to remove the Trip ? ");
    
        if(ans)
        {
          fetch(`http://localhost:8000/removeTrip?t_id=${optionInfo}`)
          .then(response => response.json())
          .then(data => alert(data.message))
          .catch(err => {
            console.log(err);
          });
    
        }
        else
        {
          console.log("no");
        }
    }
    
    return(
        <div className="trip">
          <h3>Trip to {props.val.locationName}</h3>
          <div className="row1">
          <p>Start Date: {props.val.startDate.split("T")[0].split('-')[2]}-{props.val.startDate.split("T")[0].split('-')[1]}-{props.val.startDate.split("T")[0].split('-')[0]}</p>
          <p>End Date: {props.val.endDate.split("T")[0].split('-')[2]}-{props.val.endDate.split("T")[0].split('-')[1]}-{props.val.endDate.split("T")[0].split('-')[0]} </p>
          </div>
          <div className="row1">
          <p>Coordinator : {props.val.tripCoordinatorName}</p>
          <p>Contact : {props.val.tripCoordinatorContactNumber}</p>
          </div>
          <div className="row1">
          {/* <p>Price: INR {props.val.Price}</p> */}
          <p>vacancy: {props.val.vacancy}</p>
          </div>
          <div className="btn">
          <button className="btn btn-success mx-4">Update</button>
          <button className="btn btn-danger" data-place={props.val.tripId} onClick={handleCancel}>Remove</button>
          </div>
        </div>
    );
}
export default function Disp_trips(){

    const [trips,setTrips] = useState([]);
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
        fetch("http://localhost:8000/AdminTrips")
        .then(response => response.json())
        .then(data => setTrips(data))
        .catch(err => {
            console.log(err);
        });

    },[])

    console.log(trips);

    return(
      <>
      {
      (role==="Admin") &&
        <div className="trip-history my-3">
          <h1>Trip Details</h1>
          {
            trips &&
            trips.map(ele => (<Trips val = {ele}></Trips>))
          }  
        </div>
      }
      </>
    );
}