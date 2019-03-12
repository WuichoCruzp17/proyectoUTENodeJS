const bcryptjs =    require('bcryptjs');
const pool =    require('../database');
const {email} = require('../keys');
var nodemailer = require('nodemailer');
const helpers ={};
helpers.encryptPassword= async (password)=>{
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

helpers.matchPassword =async(password,savedPassword)=>{
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};
helpers.validateAccesousUsuario =async(req, res)=>{
};

helpers.setEmail =(mailOptions)=>{
  console.log(mailOptions);
const transporter  = nodemailer.createTransport(email);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

module.exports = helpers;