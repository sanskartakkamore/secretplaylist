const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Create User using: POST "/api/auth"
router.post('/createuser',[
    body('name','Enter a Valid Name').isLength({ min: 3 }),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Passwords must be atleast 5 characters').isLength({ min: 5 }),
    
],async(req,res)=>{
    //If there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user =await User.findOne({email:req.body.email});
//check whweater the user with same email exists or not
try {
  
  if (user){
    return res.status(400).json({error: "Sorry the user with same email is already Exists"})
  }
  user =await User.create({
    name: req.body.name,
    password: req.body.password,
    email:req.body.email,
  })
  
  res.json(user)
}
catch (error) {
  console.error(error.message);
  res.status(500).send("Some Error Occured");
} 
})
module.exports=router