const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")

//Register API

exports.register=async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {username,email,password} = req.body;
  try {
    const userExists = await User.findOne({email:email.toLowerCase()})
    if(userExists) return res.status(404).json({msg:"User Already Exists"})
      const user= await User.create({username,email:email.toLowerCase(),password})
    return res.status(201).json({msg:"User Registered Successfully"})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}

//Login API
  exports.login=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
      const user = await User.findOne({email:email.toLowerCase()})
      if(!user) return res.status(404).json({msg:"user Not Registered"})
       const match = bcrypt.compare(password,user.password);
      if(!match) return res.status(404).json({msg:"Invalid Password"})
        const token = jwt.sign({id:user.id},process.env.JWT,{expiresIn:"30d"})
      return  res.status(200).json({token})

    } catch (error) {
      return res.status(500).json({msg:error.message})
    }
  }