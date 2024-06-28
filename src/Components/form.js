import React, { useState } from 'react';
import './Form.css'; // Import your CSS file for styling
import { useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Form = (props) => {

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
  const navigate = useNavigate();
  // const [fullName, setFullName] = useState('');
  // const [gender, setGender] = useState('');
  // const [age, setAge] = useState('');
  // const [medicalCondition, setMedicalCondition] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [email, setEmail] = useState('');
  // const [groupSize, setGroupSize] = useState(1);
  // const [price, setPrice] = useState(props.price);
  const [location,setLocation] = useState(obj);
  const [form,setForm] = useState({});
  const [ageValidationError, setAgeValidationError] = useState('');
  const [trips,setTrips] = useState([]);
  const [vac,setVacancy] = useState(0);

  const {loc} = useParams();
  //console.log("id : "+id);
  useEffect(()=>{
    const loc_data = async () => {
       const response = await fetch(`http://localhost:8000/outlets?id=${loc}`);
       const data = await response.json();
       setLocation(data);
       console.log(data);
       setForm({...form,Place: data.name, Price: data.Info.Price, loc_id : loc, email : localStorage.getItem('user')});

    };
    loc_data();

    fetch(`http://localhost:8000/FindTrip?id=${loc}`)
          .then(response => response.json())
          .then(data => setTrips(data))
          .catch(error => {
            console.error('Error fetching trips:', error);
          });

  },[loc]);


  console.log(trips.length);
  const handleInp = (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement further validation logic here if needed
    // setPrice(props.price * groupSize);
    
    if (form.age < 16) {
      setAgeValidationError('Must be 16 years or older to register!');
      return;
    }
    // alert('Form submitted successfully!'); // Placeholder for form submission action

    const BookTrek = async () => {
      const response = await fetch('http://localhost:8000/Booktrip',{
        method: 'POST',
        body: JSON.stringify(form),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data = await response.json();
      alert(data.message);
    }
    BookTrek();
    // setForm({...form, Price: location.Info.Price});
    console.log(location.Info.Price);
    console.log(form);
    // Redirect to payment page
    // window.location.href = '/payment';
    navigate("/");
  };

  const handleLoc = (e) => {
    setForm({...form,
    [e.target.name]: e.target.value});
    const selectedOption = e.target.options[e.target.selectedIndex];
    const optionInfo = selectedOption.getAttribute('data-vacancy');
    setVacancy(optionInfo);
    console.log(optionInfo);
  }

  const handleAgeChange = (e) => {
    const ageValue = parseInt(e.target.value);
    // setAge(ageValue);
    if (ageValue < 16) {
      setAgeValidationError('Must be 16 years or older to register!');
    } else {
      setAgeValidationError('');
    }
  };

  return (
    <div className="background">
      <div className="form-container">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="Book-Date">Select Trip Date:</label>
            <select
              type="text"
              id="Book-Date"
              name='tripDate'
              // onChange={(e) => setFullName(e.target.value)}
              // required
              // onChange={}
              onChange={handleLoc}
            >
              <option value="">Select Date</option>
              {trips && trips.map(trip => (
                <option data-vacancy={trip.vacancy} value={trip.tripId}>{trip.startDate.split('T')[0].split("-")[2]+"-"+trip.startDate.split('T')[0].split("-")[1]+"-"+trip.startDate.split('T')[0].split("-")[0]}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name='fullname'
              value={form.fullName}
              onChange={handleInp}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className='row'>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleInp}
                />
                Male
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleInp}
                />
                Female
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={form.gender === 'others'}
                  onChange={handleInp}
                />
                Others
              </label>
            </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              onChange={handleInp}
              required
            />
            {ageValidationError && <p className="error-message">{ageValidationError}</p>}
          </div>
          {/* <div className="form-group">
            <label htmlFor="medicalCondition">Medical Condition:</label>
            <textarea
              id="medicalCondition"
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name='phoneNumber'
              value={form.phoneNumber}
              pattern="[0-9]{2}-[0-9]{10}"
              onChange={handleInp}
              required
            />
            <small>Format: +91-1234567890</small>
          </div>
          {/* <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="groupSize">Solo or Group:</label>
            <input type='number'
              id="groupSize"
              value={groupSize}
              onChange={handleInp}
            /> */}
              {/* <option value="1">Solo</option>
              <option value="2">Group of 2</option>
              <option value="3">Group of 3</option>
              <option value="4">Group of 4</option> */}
              {/* Add more options as needed */}
            {/* </select> */}
          {/* </div> */}
          <div className="form-group">
            <p>{vac} seats left</p>

          </div>
          <div className='row'>
         { (trips.length!==0) && <button type="submit" className='btn-cnfbook'>Book Now</button>}
         {(trips.length === 0 ) && <button type='submit' className='btn-cnfbook' disabled>Trip Full</button>}
          <span>INR {location.Info.Price}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;



