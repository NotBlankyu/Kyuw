const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
let ms = require('ms');

module.exports={
  name: 'daily',
    category: 'economy',
    description: 'Returns the balance of a user',
    usage: `${(process.env.PREFIX)}balance`,
  
  run : async (client, message, args) => {
   
    const cooldown = 86400000;
    
    
    
    User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
      if(!user){
          const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.member.id,
        gold: 0,
        dailytime:Date.now() + cooldown
        
      })
      newUser.gold += 10;    
      newUser.save().catch(err => console.log(err));
      return message.channel.send('10 coins were added to your bank.')
    }
      if (Date.now() > user.dailytime){
        user.gold += 10;
      
        user.dailytime = Date.now() + cooldown;
        user.save().catch(err =>console.log(err));
        return message.channel.send('10 coins were added to your bank.')
      }
      message.channel.send(`Try again in ${ms(user.dailytime - Date.now() )}`) 
  }
)}
};