const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/chack-auth');
require("dotenv").config();



// validation 
const Joi = require('@hapi/joi');
const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
});




router.post('/signup', async (req, res) => {

    
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).json({message : " enter the valid data" });
    //checking for existing user
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).json({message : " User already exists"})
    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    const user = new User({
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const saveduser = await user.save();
        res.status(200).json({
            message : " New user has been created",
            _id : saveduser._id
        });
        

    }
    catch (err) {
      

    }
});


router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
    //    console.log("hello")
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Kindly enter registered email or password"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Kindly enter registered email or password"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
             process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Welcome! your are logged in",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });




router.delete("/:userId",checkAuth,(req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;