const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');

module.exports = {
  
  name: 'dice',
    category: 'Fun',
    description: 'Choose a dice and try to say the right number',
    usage: `dice <5/10> <number>`,
  
  run : async (client, message, args) => {
    let array
    let prize
    let result
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
    }if(user.gold >= 5){
      switch(args[0]){

      case "5": array = ["1", "2", "3", "4", "5"]
                prize  = 20  
          break;
      case "10":array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] 
                prize  = 50     
          break;
      case "15":array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]  
                prize  = 100    
          break;      
      default: if(guild.lang=='pt'){
        return message.reply('Usa um destes dados (5,10,15)') 
      }else{
        return message.reply('Use one of this dices (5,10,15)') 
      }
      
    }
   
   let value = array[Math.floor(Math.random() * array.length)];
   if(!args[1]||!array.includes(args[1])){
    if(guild.lang=='pt'){
      return message.reply("Escolhe um número do dado")
    }else{
      return message.reply("Chose a number from the dice")
    }
     
   }
   if(args[1]==value){
    if(guild.lang=='pt'){
      message.reply(`Parabéns, ganhaste ${prize} moedas!`).then(result = 1)
    }else{
      message.reply(`Congratulations you won ${prize} coins!`).then(result = 1)
    }
     
   }
   else{
    if(guild.lang=='pt'){
      message.reply(`Infelizmente era ${value}, perdeste 5 moedas.`).then(result = 0)
    }else{
      message.reply(`Sorry but it has ${value}, you lost 5 coins.`).then(result = 0)
    }
   } 
    if(result==1){
      user.gold += prize;
    }else{
      user.gold -= 5;
    }
    user.save().catch(err => console.log(err));
    }else{
      if(guild.lang=='pt'){
        return message.channel.send("Não tens dinheiro suficiente.")  
      }else{
        return message.channel.send("You don't have enought money.") 
      }
    } 
  }
  )
    
  
  
  
  }
};
