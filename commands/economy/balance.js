const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');


module.exports={
  name: 'balance',
    category: 'economy',
    description: 'Returns the balance of a user',
    usage: `${(process.env.PREFIX)}balance`,
  
  run : async (client, message, args) => {

    member = message.mentions.users.first()||  message.member
    if(!message.mentions.users.first()){
      embedMember = message.member.user.username
    } else{
      embedMember = message.mentions.users.first().username
    }
     
    User.findOne({ 
        userID: member.id
      }, (err, user) => {
      if(!user){
          const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userID: member.id,
        gold: 0,
        dailytime:Date.now()
        
        
      }) 
      newUser.save().catch(err => console.log(err))
      const Embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
    	.setTitle( 'User Balance')
      .addField('Gold coins:',`${newUser.gold}`)
	message.channel.send(Embed);
      
    }else{
  const Embed = new Discord.MessageEmbed()
  	.setColor('#0099ff')
  	.setTitle( `${embedMember} Balance`)
    .addField('Gold coins:',`${user.gold}`)
	message.channel.send(Embed);
    }             
  }
)}
};
                                