const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Create User using: POST "/api/auth"
router.post('/',[
    body('name','Enter a Valid Name').isLength({ min: 3 }),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Passwords must be atleast 5 characters').isLength({ min: 5 }),
    
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email:req.body.email,
      }).then(user => res.json(user))
      .catch(err =>{console.log(err)
    res.json({error:"Please Enter a Unique Email address",message: err.message})})
})
module.exports=router