
import './userBooking.css';
import { useEffect, useState } from 'react';

function TripDetails(props)
{

  const handleCancel = (e) =>{
    // alert(e.target);
    const selectedOption = e.target;
    const optionInfo = selectedOption.getAttribute('data-place');
    console.log(optionInfo);
    var ans = window.confirm("Do you want to cancel the Booking ? ");

    if(ans)
    {
      fetch(`http://localhost:8000/cancelBooking?b_id=${optionInfo}`)
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
          <h3>Trip to {props.val.Place}</h3>
          <div className="row1">
          <p>Date: {props.val.Date.split("T")[0].split('-')[2]}-{props.val.Date.split("T")[0].split('-')[1]}-{props.val.Date.split("T")[0].split('-')[0]}</p>
          <p>Coordinator : {props.val.Coordinator_name}</p>
          </div>
          <div className="row1">
            <p>Price: INR {props.val.Price}</p>
          <p>Contact : {props.val.ContactNo}</p>
          </div>
          <div className="btn">
          <button className="btn btn-success mx-4">Pay Now</button>
          <button className="btn btn-danger" data-place={props.val.bookingId} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        
  );
}
export default function UserBooking(){

  const [trips,setTrips] = useState([]);
  

  useEffect(()=>{
    fetch(`http://localhost:8000/userBooking?email=${localStorage.getItem("user")}`)
    .then(response => response.json())
    .then(data => setTrips(data))
    .catch(err => console.log(err))
  },[]);

  console.log(trips);
    return(
        <div className="trip-history my-3">
          <h1>Booking Details</h1>
        {/* <div className="trip">
          <h3>Trip to Destination A</h3>
          <div className="row1">
          <p>Date: January 1, 2024</p>
          <p>Coordinator : Debasish</p>
          </div>
          <div className="row1">
            <p>Price: INR 100</p>
          <p>Contact : 9890073804</p>
          </div>
          <div className="btn">
          <button className="btn btn-success mx-4">Pay Now</button>
          <button className="btn btn-danger">Cancel</button>
          </div>
        </div>
         */}
       {
        trips && trips.map(ele => (<TripDetails val = {ele}/>))
       }
      </div>
    );
}