const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

  const userSchema = new mongoose.Schema({
   user_id: {
      type: String,
      required: true
    },
    user_name: {
      type: String,
      required:true
    },
    contact_number: {
      type: Number,
      required:true
    },
    password: {
      type:String,
      required:true
   },
   date: {
     type: Date,
     default: Date.now
   }
  });
  
    userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, user_name: this.user_name, password: this.password, user_id: this.user_id}, config.get('jwtPrivateKey'));
    return token;
  }

  const User = mongoose.model('User', userSchema);

  
  function validateUser(user) {
    const schema = Joi.object({
      user_name: Joi.string()
        .min(3)
        .max(100)
        .required(),
      contact_number: Joi.number()
        .phoneNumber()
        .require(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    });
  
    return schema.validate(user);
  }
  

  
  exports.validate = validateUser;
  exports.User = User; 
  