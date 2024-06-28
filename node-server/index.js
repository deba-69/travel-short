const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./UserSchema');
const Location = require('./locationSchema');
const Trip = require('./tripSchema');
const Booking = require('./bookingSchema');
const moment = require('moment');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const server = express();
// console.log(Location.find({}));
const crypto = require('crypto');

// Generate a random secret key
const secretKey = 'b35c985d8acfcfa80bc440371a2dcfc7bf6df8363b08560e0bc10fc79aacb30b';
console.log(secretKey);

server.use(cors({
   origin: ['http://localhost:3000'],
   methods: ["POST","GET"], 
   credentials: true 
  }));
server.use(bodyParser.json());

server.use(cookieParser());
server.use(session({
  secret: 'anjsa-sahd-sdw',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none', // required for cross-origin requests
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24
  },

}));


const otpMap = new Map();

const verifyToken = (req, res, next) => {

  try
  {
    const bearerHeader = req.headers['authorization'];
    console.log("token : "+bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        console.log(decoded);
        next();
      });
    } else {
      res.status(403).json({ message: 'Token not provided' });
    }
  }
  catch(err)
  {
    console.log(err);
  }
};

server.get('/verify', verifyToken, (req, res) => {
  // Token is valid, return user's role
  try {
  console.log("aDMIN" + req.user.isAdmin);
  res.status(200).json({Role: req.user.isAdmin?"Admin":"User",authentication:true});
  // res.sendStatus(200);
  }
  catch(err)
  {
    console.log(err);
  }
  // res.sendStatus(200);
});


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deba.mailtest@gmail.com',
    pass: 'aaor nqwj vwca tfzt',
  },
});


main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/myproject'); 
    console.log("db conn");
}

function hidePassword(req, res, next) {
    if (res.locals.user) {
      res.locals.user.password = undefined;
    }
    next();
}


server.post('/recoversendOtp', async (req,res) => {
  try{
    const{email} = req.body;

    let user = await User.findOne({email});
    if(!user)
    {
      res.status(400).json({message:"User Doesn't Exist. Register to continue",authenticated: false});
    }
    else
    {
      const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    
      const mailOptions = {
        from: 'deba.mailtest@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for email verification is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        console.log("hello");
        if (error) {
          console.log(error);
          res.status(500).json({message : 'Error sending OTP', authenticated: false});
        }    
        else {
          console.log('Email sent: ' + info.response);

          req.session.OTP = {user: email, Otp : otp, createdAt : moment()};
          otpMap.set(email, { otp, createdAt: moment() });
          console.log(req.session.OTP)

          res.status(200).json({authenticated : true, message: 'OTP sent successfully'});
        }
      });
    }
  }
  catch(error)
  {
    console.log(error);
  }
});


server.post('/UpdatePassword', async (req,res) => {
  const{email,password} = req.body;

  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
          // res.redirect('/Generate-OTP');
          //create new user
    let result = await User.updateOne({email:email},{$set : {password: hashedPassword}});
    // await res.save();
    console.log(result);        
          //hide pass from res
    // user.password = undefined;

    res.status(201).json({authenticated : true,message: "Password Updated Successfully."});
  }
  catch(error)
  {
    console.log(error);

  }
});

server.post('/sendOtp', async (req,res) => {
  

  try{
    const {email} = req.body;
    let user = await User.findOne({email});
    if(user)
    {
        res.status(400).json({message:'User Already exists. Login to continue!!',authenticated: false});
    }
    else{
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    
    const mailOptions = {
      from: 'deba.mailtest@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for email verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log("hello");
      if (error) {
        console.log(error);
         res.status(500).json({message : 'Error sending OTP', authenticated: false});
      } else {
        console.log('Email sent: ' + info.response);

        req.session.OTP = {user: email, Otp : otp, createdAt : moment()};
        otpMap.set(email, { otp, createdAt: moment() });
        console.log(req.session.OTP)

        res.status(200).json({authenticated : true, message: 'OTP sent successfully'});
      }
    })
  }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({message:'Please Enter valid Mail Address',authenticated: false});
  }

});

server.post('/verifyOtp', async (req,res) => {

  try
  {
    // const {otp} = req.body;
    const { email, otp } = req.body;
    const storedOTP = otpMap.get(email);

    // const info = req.session.OTP;
    console.log(email,otp);

    if (!storedOTP) {
      return res.status(400).json({message :'OTP not found. Please request a new OTP.',authenticated: false});
    }
  
    if (otp === storedOTP.otp) {
      // Check if OTP is still valid (within a time limit)
      const timeDifference = moment().diff(storedOTP.createdAt, 'minutes');
      if (timeDifference > 5) {
        return res.status(400).send({message :'OTP has expired. Please request a new OTP.',message:false});
      }
  
      // OTP is valid
      // Clear the OTP from the map
      otpMap.delete(email);
      res.json({message :'OTP verified successfully',authenticated: true});
    }
    
  }
  catch(error)
  {
    console.log(error);
  }

})

server.post('/SignIn', async (req,res) => {
    try{
        const {email,password} = req.body;
        let user = await User.findOne({email});
        console.log(user);
        
        if(user)
        {
         
            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword)
            {
               res.status(401).json({authentication: false, message: "wrong Password"});
            }
            console.log(user.password);
            const accessToken = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, secretKey);
            // console.log(accessToken);
            req.session.user = {email: email};
            console.log(req.session.user);
            res.status(200).json({accessToken, user: user.email, isAdmin: user.isAdmin, authentication: true });
            //  res.status(200).json({authentication: true, user: email});
        }
        else
          res.status(401).json({authentication: false});
    }catch(err){
        console.log("error : " + err);
        // res.status(500).json({authentication:false, err: 'Server Error'});
    }
});

server.post('/SignUp',async (req,res)=>{
    try{
        const {email,password} = req.body;

        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({msg:'User Already exists'});
        }

        //Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // res.redirect('/Generate-OTP');
        //create new user
        user = new User({email,password: hashedPassword});
        await user.save();
       
         //hide pass from res
         user.password = undefined;

         res.status(201).json({authenticated : true});
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


server.get('/locationOutlets', async (req, res) => {
    const { latitude, longitude, radius, type } = req.query;

   
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    // const tp = parseFloat(type);
    console.log(type);
    
  if(type === 'all')
  {
    try {
      // Convert radius to radians
      const radiusInRadians = parseFloat(radius) / 6371.0;  // Earth radius in km
      console.log(lat, long, radiusInRadians);
  
      // Query the database using geospatial indexing
      const locationOutlets = await Location.find({
        coordinate: {
          $geoWithin: {
            $centerSphere: [
              [lat, long],
              radiusInRadians,
            ],
          },
        },
      });
      // console.log(locationOutlets);
      res.json(locationOutlets);
    } catch (error) {
      console.error('Error retrieving location outlets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  else
  {

    try {
      // Convert radius to radians
      const radiusInRadians = parseFloat(radius) / 6371.0;  // Earth radius in km
      console.log(lat, long, radiusInRadians);
  
      // Query the database using geospatial indexing
      const locationOutlets = await Location.find({$and : [
        {coordinate: {
          $geoWithin: {
            $centerSphere: [
              [lat, long],
              radiusInRadians,
            ],
          },
        }},
        {
          type : type
        }
      ]});
      console.log(locationOutlets);
      res.json(locationOutlets);
    } catch (error) {
      console.error('Error retrieving location outlets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }
  });

server.get('/outlets', async (req,res) => {
  const {id} = req.query;
  try{
    const loc = await Location.findOne({loc_id:id});
    res.json(loc);
  }
  catch(error){
    console.error(error);
  }

});

server.get('/type-outlets', async (req,res) => {
  const {type} = req.query;
  console.log(type);
  if(type === 'all')
  {
    try{
      const loc = await Location.find({});
       console.log(loc);
      res.json(loc);
    }
    catch(error){
      console.error(error);
    }

  }
  else
  {
    try{
      const loc = await Location.find({type:type});
      // console.log(loc);
      res.json(loc);
    }
    catch(error){
      console.error(error);
    }
  }

});

server.post('/BookTrip', async (req,res) => {

  const {Place,Price,age,email,fullname,gender,loc_id,phoneNumber,tripDate} = req.body;
  console.log(req.body);
  try
  {
    const book_Status = await Booking.find({$and : [{userEmail:email},{tripId:tripDate}]});
    console.log("loc"+book_Status.length);
    let trip = await Trip.find({tripId:tripDate});
    console.log(trip[0].vacancy);
    if(book_Status.length === 0 && trip[0].vacancy > 0)
    {
      console.log("booked");
      let book = new Booking({locationName:Place, price:Price, age, userEmail:email, fullName:fullname, gender, phoneNumber, tripId:tripDate});
      await book.save();
      let trip_change = await Trip.updateMany({tripId : tripDate},{$set:{vacancy : trip[0].vacancy-1}});
      res.json({verified: true, message: "Booked successfully!!"});
    }
    else if(trip[0].vacancy === 0)
    {
      res.json({verified: false, message: "Slots Full! Try again next time"});
    }
    else
    {
      res.json({verified: false, message: "Already Booked!!"});
    }

  }
  catch(error)
  {
    console.log(error);
    res.json({verified: false,message: "Server Error"});
  }
});

server.post('/AddTrip', async (req,res) => {
  const info = req.body;
  console.log(info);

  try{
    const loc = await Location.find({name:info.loc_id});
    console.log("Number of collections : "+loc.length);
    if(loc.length === 0)
    res.json({verified: false, message: "NO such location exists!!"});
    else
    {
    //   let trip = await Trip.findOne({}); 
      let trip = new Trip({locationName: info.loc_id,startDate: info.From,endDate: info.To,tripCoordinatorName: info.Trip_coordinator,tripCoordinatorContactNumber: info.Coordinator_PhoneNo, vacancy: info.vacancy, tripDescription: info.trip_desc});
      await trip.save();
    }
  }
  catch(err)
  {
    console.log(err);
  }

});

server.get("/FindTrip", async (req,res) => {
  const {id} = req.query;
  console.log("location_id:  "+id);

  try{  
    let loc = await Location.find({loc_id:id});
    console.log(loc.length);
    if(loc.length > 0)
    {
      let trip = await Trip.find({locationName:loc[0].name});
      console.log(trip.length);
      res.json(trip);
    }
    else
    {
      console.log("no such location id exists");
    }

  }
  catch(err)
  {
    console.log(err);
  }
})

server.get('/userBooking', async (req,res) => {
  const {email} = req.query;
  console.log(email);
  const loc_details = [];
  const obj = {};
  try{
    let book_list = await Booking.find({userEmail:email});
    console.log(book_list);
    for(var i=0;i<book_list.length;i++)
    {
      obj.Place = book_list[i].locationName;
      obj.Price = book_list[i].price;
      let trip_list = await Trip.find({tripId: book_list[i].tripId}); 
      obj.Coordinator_name = trip_list[0].tripCoordinatorName;
      obj.ContactNo = trip_list[0].tripCoordinatorContactNumber;
      obj.Date = trip_list[0].startDate;
      loc_details.push({bookingId: book_list[i].bookingId, Place:book_list[i].locationName, Price:book_list[i].price, Coordinator_name: trip_list[0].tripCoordinatorName, ContactNo: trip_list[0].tripCoordinatorContactNumber, Date: trip_list[0].startDate});
      // console.log(loc_details);

    }
    res.json(loc_details);

  }
  catch(err)
  {
    console.log(err);
  }
})

server.get("/cancelBooking", async (req,res)=> {
  const {b_id} = req.query;
  console.log(b_id);
  try
  {
    let booking = await Booking.find({bookingId:b_id});
    let t_id = booking[0].tripId;
    // console.log(booking);
    let del_book = await Booking.deleteOne({bookingId:b_id});
    let trip = await Trip.updateOne({tripId: t_id},{$inc : {vacancy : 1}});
    console.log("modified : "+ trip.modifiedCount);
    res.json({message: "Booking removed successfully"});
  }
  catch(err)
  {
    console.log(err);
    res.json({message: "Error Occured"});
  }
});

server.get("/AdminTrips",async (req,res) => {
  try{
    let trips = await Trip.find({});
    // console.log(trips);
    res.json(trips);
  }
  catch(err)
  {
    console.log(err);
  }
});

server.get("/removeTrip", async (req,res) => {
  const {t_id} = req.query;
  console.log("trip to remove : " + t_id);
  try{
    let booking = await Booking.deleteMany({tripId:t_id});
    let trip = await Trip.deleteMany({tripId:t_id});
    res.json({message: "Trip and its dependencies Removed Succesfully"})
    console.log("deleted : "+ trip.deletedCount);
  }
  catch(err)
  {
    console.log(err);
    res.json({message: "server Error"});
  }

});


server.use(hidePassword);

server.listen(8000,()=>{
    console.log("Server started");
}) 