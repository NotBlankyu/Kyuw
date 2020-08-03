const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String, 
    gold: Number, default: 0,
    dailytime: Number,
    criminalTime: Number,
    votetime: Number,
    osu: String,
    
  
    
});

module.exports = mongoose.model('User', guildSchema, 'users');