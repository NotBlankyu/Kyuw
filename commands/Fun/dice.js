const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports = {
  
  name: 'dice',
    category: 'Fun',
    description: 'Choose a dice and try to say the right number',
    usage: `dice <5/10> <number>`,
  
  run : async (client, message, args) => {
    let array
    let prize
    let result
  
   User.findOne({ 
        userID: message.member.id
      }, (err, user) => {
       //If there isn't anything in the db create it 
      if(!user){
        message.channel.send("You don't have enough coins!")
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
      default: return message.reply('use a valid dice.')
    }
   
   let value = array[Math.floor(Math.random() * array.length)];
   if(!args[1]||!array.includes(args[1]))return message.reply("Chose a number from the dice")
   if(args[1]==value)message.reply(`Congratulations you won ${prize} coins!`).then(result = 1)
   else message.reply(`Sorry but it has ${value} you lost 5 coins.`).then(result = 0)
    if(result==1){
      user.gold += prize;
    }else{
      user.gold -= 5;
    }
    user.save().catch(err => console.log(err));
    }else return message.channel.send("You don't have enough coins!")
  }
  )
    
  
  
  
  }
};
