const Discord = require("discord.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');


module.exports={
  name: 'balance',
    category: 'economy',
    aliases: ['bal'],
    description: 'Returns the balance of a user',
    usage: `${(process.env.PREFIX)}balance`,
  
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
    //gets the member by mention or just use the message  author
    member = message.mentions.users.first()||  message.member
    //Getting the username ready to put in the embed
    if(!message.mentions.users.first()){
      embedMember = message.member.user.username
    } else{
      embedMember = message.mentions.users.first().username
    }
    const user = await User.findOne({ 
      userID: member.id
    }, (err, user) => {
      if(!user){
         user = new User({
      _id: mongoose.Types.ObjectId(),
      userID: member.id,
      gold: 0,
        })}
    })
    if(!user){
      if(guild.lang == 'pt'){
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle( `Saldo de ${embedMember}`)
        .addField('Moedas de ouro:',`0`)
        message.channel.send(Embed);
      }else{
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle( `${embedMember} Balance`)
        .addField('Gold coins:',`0`)
        message.channel.send(Embed);
      }
      
	
    }else{ 
      if(guild.lang == 'pt'){
      const Embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle( `Saldo de ${embedMember}`)
      .addField('Moedas de ouro:',`${user.gold}`)
      message.channel.send(Embed);
    }else{
      const Embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle( `${embedMember} Balance`)
      .addField('Gold coins:',`${user.gold}`)
      message.channel.send(Embed);
    }
    }  
}
};
                                