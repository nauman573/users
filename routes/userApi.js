const express = require('express');
const bcrypt = require("bcryptjs");
const {v4: uiid4} = require('uuid');

const router = express.Router();
const {User, validateUser} = require('../models/user');




router.get('/users', async (req, res) => {

    const user = await User.find().sort({date: 1});
    if(!user)  return res.status(404).send('User not Found');
    res.ststus(200).send(user);  
  });

  
  router.post('/user', async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      let user = new User({ 
          user_id: uiid4(),
          user_name: req.body.user_name,
          contact_number: req.body.contact_number,
          password: req.body.password
});
     user.password = await bcrypt.hash(user.password, 10);
     console.log(user.password);
     console.log(user);
     const result = await user.save();
     res.status(200).send(result);
 }

    catch(err) {
       console.log(err);
    }
  
  });


  router.delete('/delete', async (req, res)=> {
    const user = await User.deleteMany({user_name : 'Nauman'});
    if(!user)  return res.status(404).send('User not Found');
    res.status(200).send(user);
  });



  module.exports = router;
