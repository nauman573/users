
const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const auth = require('./routes/auth');
const user = require('./routes/userApi')

const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey is not defined');
    process.exit(1);
  }
  

  
  app.use(express.json());
  
  app.use('/api', auth);
  app.use('/api', user);


  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
  
  
  mongoose.connect('mongodb://localhost/user')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

 