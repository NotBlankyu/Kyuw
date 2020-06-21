const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    guildID: String, 
    warns: Number, default: 0,
    
    
  
    
});

module.exports = mongoose.model('UserInfractions', guildSchema, 'UsersInfractions');