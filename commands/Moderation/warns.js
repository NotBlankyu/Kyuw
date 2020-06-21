const Discord = require("discord.js");
const mongoose = require('mongoose');
const UserInfractions = require('../../models/userInfractions');
module.exports={
name: 'warns',
    category: 'Moderation',
    description: 'See and configure warn information',
    usage: `warns <@user> <info/set/clean>`,

run : async (client, message, args) => {
  if(!message.member.hasPermission('MUTE_MEMBERS'))return message.channel.send("You don't have permission to use this command.")
  let member = message.mentions.members.first();
 UserInfractions.findOne({ 
        userID: member.id,
        guildID:message.guild.id
      }, async (err, user) => {
         if(!user){
          const newUser = new UserInfractions({
        _id: mongoose.Types.ObjectId(),
        userID: member.id,
        guildID:message.guild.id,
        warns: 0,
        
      })
      switch(args[1]){
          case 'info': const userInfo = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns info`)
            .setDescription(`This user has been warned ${newUser.warns} times.`)
            message.channel.send(userInfo)
            break;
          case 'clean':
            newUser.warns = 0;
            newUser.save().catch(err => console.log(err));
            const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns cleanup`)
            .setDescription(`This user warn count has been reseted.`)
            message.channel.send(warnCleanup)
            break;
          case 'set':
            newUser.warns = args[2];
            newUser.save().catch(err => console.log(err));
            const warnSet = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns Setup`)
            .setDescription(`This user has now ${args[2]} warns.`)
            message.channel.send(warnSet)
            break;
        }return
    }
        switch(args[1]){
          case 'info': const userInfo = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns info`)
            .setDescription(`This user has been warned ${user.warns} times.`)
            message.channel.send(userInfo)
            break;
          case 'clean': 
            user.warns = 0;
            user.save().catch(err => console.log(err));
            const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns cleanup`)
            .setDescription(`This user warn count has been reseted.`)
            message.channel.send(warnCleanup)
            break;
          case 'set':
          user.warns = args[2];
            user.save().catch(err => console.log(err));
            const warnSet = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns Setup`)
            .setDescription(`This user has now ${args[2]} warns.`)
            message.channel.send(warnSet)
            break;
        }
      })
  
  }
};