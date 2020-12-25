
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/auth',  async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({user_name: req.body.user_name});
    if(!user)  return res.status(404).send('User not found');
    const password = await bcrypt.compare(req.body.password, user.password)
    if(!password) return res.status(404).send('User not found'); 
    const token = user.generateAuthToken();
    res.status(200).send(token);

  });


  function validate(req) {
    const schema = Joi.object({
      user_name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    });
  
    return Joi.validate(req, schema);
  }
  





  module.exports = router; 
  