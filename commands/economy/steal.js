const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports={
name: 'steal',
    category: 'economy',
    description: 'Steal someone else money.',
    usage: `steal <@user> <value>`,

run : async (client, message, args) => {
  let cooldown = 900000
  let value = parseInt(args[1],10)
  let target = message.mentions.members.first()
  let sucess
  if(!target)return message.channel.send("Please mention someone!") 
  if(!value)return message.channel.send("Please say a value!")
  await User.findOne({ 
        userID: target.id
      },(err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
       message.channel.send("You can't steal someone without money!")
    }  
    if(user.gold>=value){
            let random = Math.random();
            let chance
            if(value<=100){
              chance=0.1
            }else if(value<=1000){
              chance=0.05
            }else if(value<=5000){
              chance=0.01
            }else chance=0.005
   
            if(random<chance){
              
              message.reply(`You just stole ${value} coins from ${target.user.username}` )
              user.gold -= value;
              sucess = 1 
              user.save().catch(err => console.log(err));
            }else message.reply("You failed")
     }else message.channel.send("You can't steal something that doesn't exist!")
   })
   
    if(sucess==1){
    User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
      const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.member.id,
        gold: 0,
        criminalTime:Date.now() + cooldown
      })
      newUser.gold += value;
      return newUser.save().catch(err => console.log(err));
    }  
      user.criminalTime = Date.now() + cooldown
      user.gold += value;  
      user.save().catch(err => console.log(err));
   })
   }
  
  
  }
};