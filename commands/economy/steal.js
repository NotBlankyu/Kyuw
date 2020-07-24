const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');

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
  if(!target){
    if(guild.lang=='pt'){
      return message.channel.send("Mencione a pessoa que deseja roubar dinheiro!") 
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
  await User.findOne({ 
        userID: target.id
      },(err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
        if(guild.lang=='pt'){
          message.channel.send("Não consegues roubar alguem sem dinheiro!")
        }else{
          message.channel.send("You can't steal someone without money!")
        }
       
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
              if(guild.lang=='pt'){
                message.reply(`Conseguiste roubar ${value} moedas de ${target.user.username}` )
              }else{
                message.reply(`You just stole ${value} coins from ${target.user.username}` )
              }
              
              user.gold -= value;
              sucess = 1 
              user.save().catch(err => console.log(err));
            }else{
              if(guild.lang=='pt'){
                message.reply("Falhaste")
              }else{
                message.reply("You failed")
              }
            } 
     }else{
      if(guild.lang=='pt'){
        message.reply("Roubar mais do que a pessoa têm não dá certo...")
      }else{
        message.channel.send("You can't steal something that doesn't exist!")
      }
     }
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