const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');

module.exports={
name: 'give',
    category: 'economy',
    description: 'Give money to someone else.',
    usage: `give <@user> <value>`,

run : async (client, message, args) => {
  const guild = await Guild.findOne({ 
    guildID: message.guild.id
  }, (err, guild) => {
    if(!guild){
       guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: message.guild.id,
    guildName: message.guild.name,
      })}
  })
  let value = args[1]
  if(!parseInt(value,10))return message.channel.send('Especify a number')
  let target = message.mentions.members.first()
  if(!target){
    if(guild.lang=='pt'){
      return message.channel.send("Mencione a pessoa que deseja enviar dinheiro!")  
    }else{
      return message.channel.send("Please mention someone!")  
    }
    
  }
  if(!value){
    if(guild.lang=='pt'){
      return message.channel.send("Forneça o valor desejado!")  
    }else{
      return message.channel.send("Please say a value!")
    }
  } 
   User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
        if(guild.lang=='pt'){
          return message.channel.send("Não tens dinheiro suficiente.")  
        }else{
          return message.channel.send("You don't have enought money.") 
        }
       
    }  
      if(user.gold >= parseInt(value,10)){
      user.gold -= parseInt(value,10);
      user.save().catch(err => console.log(err));
      User.findOne({ 
        userID: target.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
       const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: target.id,
        gold: 0,
      })
      newUser.gold += parseInt(value,10);
      newUser.save().catch(err => console.log(err));
      if(guild.lang=='pt'){
        return message.channel.send(`Deste ${value} moedas a ${target}.`)
      }else{
        return message.channel.send(`You gave ${value} coins to ${target}.`)
      }
      
    }  
    
      user.gold += parseInt(value,10)  
      user.save().catch(err => console.log(err));
      if(guild.lang=='pt'){
        return message.channel.send(`Deste ${value} moedas a ${target}.`)
      }else{
        return message.channel.send(`You gave ${value} coins to ${target}.`)
      }
   })
      }else{
        if(guild.lang=='pt'){
          return message.channel.send("Não tens dinheiro suficiente.")  
        }else{
          return message.channel.send("You don't have enought money.")  
        }
      }   
   })

   
  }
};