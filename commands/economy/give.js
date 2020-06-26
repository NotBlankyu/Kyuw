const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports={
name: 'give',
    category: 'economy',
    description: 'Give money to someone else.',
    usage: `give <@user> <value>`,

run : async (client, message, args) => {
  
  let value = args[1]
  let target = message.mentions.members.first()
  if(!target)return message.channel.send("Please mention someone!") 
  if(!value)return message.channel.send("Please say a value!")
   User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
       message.channel.send("You don't have money!")
    }  
      if(user.gold >= parseInt(value,10)){
      user.gold -= parseInt(value,10);
      }else return message.channel.send("You don't have enought money")    
      user.save().catch(err => console.log(err));
   })
   User.findOne({ 
        userID: target.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
       const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.member.id,
        gold: 0,
      })
      newUser.gold += parseInt(value,10);
    }  
    
      user.gold += parseInt(value,10)  
      user.save().catch(err => console.log(err));
   })
   message.channel.send(`You gave ${value} coins to ${target}.`)
  }
};