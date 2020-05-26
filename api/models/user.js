const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   email :{type: String, required : true,
    unique : true,
    match : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/  },
   password : {type : String,
     required: true,
    // match :/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"/}
   }
  });

module.exports = mongoose.model('User', userSchema);

// RegEx	Description
// ^	The password string will start this way
// (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
// (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
// (?=.*[0-9])	The string must contain at least 1 numeric character
// (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// (?=.{8,})	The string must be eight characters or longer