const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');


module.exports={
  name: 'balance',
    category: 'economy',
    aliases: ['bal'],
    description: 'Returns the balance of a user',
    usage: `${(process.env.PREFIX)}balance`,
  
  run : async (client, message, args) => {
    //gets the member by mention or just use the message  author
    member = message.mentions.users.first()||  message.member
    //Getting the username ready to put in the embed
    if(!message.mentions.users.first()){
      embedMember = message.member.user.username
    } else{
      embedMember = message.mentions.users.first().username
    }
     //check the db for the id
    User.findOne({ 
        userID: member.id
      }, (err, user) => {
    //create a new entry in the db if thhere isnt anything already
      if(!user){
          const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: member.id,
        gold: 0,
        dailytime:Date.now()
        
        
      }) 
      newUser.save().catch(err => console.log(err))
      //Creates and sends the embed
      const Embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
    	.setTitle( `${embedMember} Balance`)
      .addField('Gold coins:',`${newUser.gold}`)
	message.channel.send(Embed);
      
    }else{
      //Creates and sends the embed
  const Embed = new Discord.MessageEmbed()
  	.setColor('#0099ff')
  	.setTitle( `${embedMember} Balance`)
    .addField('Gold coins:',`${user.gold}`)
	message.channel.send(Embed);
    }             
  }
)}
};
                                