const express = require('express');
const router = express.Router();
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "ufhipiuwahefgiowauefhwioeuafhwdfvcsavgwaedsgweg";


router.post("/createuser" , [
    body('email' , 'Invalid Email').isEmail(),
    body('password' , 'Invalid password').isLength({ min: 5 })]
    , async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password,salt) // always generates unique hash


    try {
    await user.create( {
    name : req.body.name , 
    location : req.body.location , 
    email : req.body.email ,
    password : secPassword
   
   })
    } catch (error) {
    console.log(error);
    res.send({success : false})
   }
});

router.post("/loginuser" , [
  body('email' , 'Invalid Email').isEmail(),
  body('password' , 'Invalid password').isLength({ min: 5 })]
  , async (req, res) => {
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
  try {
    let email = req.body.email;
    let userData= await user.findOne({email})
    if(!userData){
      return res.status(400).json({ errors: "Invalid Email" });
    }
   
    const passCompare = await bcrypt.compare(req.body.password, userData.password) // true or false function
    if(!passCompare ){
      return res.status(400).json({ errors: "Invalid Password" });
    }
    const data =  {
      user:{
        id : userData.id
      }
    }
    const authToken = jwt.sign( data, secret)

    return res.json({success:true, authToken : authToken})

  } catch (error) {
  console.log(error);
  res.send({success : false})
 }
});

module.exports = router;