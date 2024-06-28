const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'deba.mailtest@gmail.com',
      pass: 'aaor nqwj vwca tfzt',
    },
  });
  
  const mailOptions = {
    from: 'deba.mailtest@gmail.com',
    to: 'debasishpanigrahi200@gmail.com',
    subject: 'OTP Verification',
    text: `Your OTP for email verification is: ${998811}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("hello");
    if (error) {
      console.log(error);
    //   res.status(500).send('Error sending OTP');
    } else {
      console.log('Email sent: ' + info.response);
    //   res.send('OTP sent successfully');
    }
  })


 

  server.listen(8080,()=>{
    console.log("Server started");
}) 