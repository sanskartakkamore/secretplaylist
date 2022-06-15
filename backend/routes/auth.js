const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Sanskarisagoodb$oy';
// Create User using: POST "/api/auth"
router.post('/createuser', [
  body('name', 'Enter a Valid Name').isLength({
    min: 3
  }),
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Passwords must be atleast 5 characters').isLength({
    min: 5
  }),

], async (req, res) => {
  //If there are errors, return Bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  let user = await User.findOne({
    email: req.body.email
  });
  try {
    //check whweater the user with same email exists or not

    if (user) {
      return res.status(400).json({
        error: "Sorry the user with same email is already Exists"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //Create User From Here
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data ={
       user :{
        id:user.id
       }
    }
    const jwtData = jwt.sign(data,JWT_SECRET);
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
})
module.exports = router