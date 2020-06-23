const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
let ms = require('ms');

module.exports={
  name: 'daily',
    category: 'economy',
    description: 'Returns the balance of a user',
    usage: `${(process.env.PREFIX)}daily`,
  
  run : async (client, message, args) => {
   
   //Time needed to get the next daily
    const cooldown = 86400000;
    
    
  //Checks the db for a User with the same id of the message author
    User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
          const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.member.id,
        gold: 0,
        //Time now plus 24h of cooldown
        dailytime:Date.now() + cooldown
        
      })
      //Add the gold and save it
      newUser.gold += 10;    
      newUser.save().catch(err => console.log(err));
      return message.channel.send('10 coins were added to your bank.')
    }
    //if time now already surpased the previous time+24h execute
      if (Date.now() > user.dailytime){
        user.gold += 10;
      //add more 24h to the time and save it
        user.dailytime = Date.now() + cooldown;
        user.save().catch(err =>console.log(err));
        return message.channel.send('10 coins were added to your bank.')
      }
      message.channel.send(`Try again in ${ms(user.dailytime - Date.now() )}`) 
  }
)}
};