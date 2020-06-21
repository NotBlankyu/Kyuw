const Discord = require("discord.js");
const ms = require("ms");
const mongoose = require('mongoose');
const UserInfractions = require('../../models/userInfractions');

module.exports={
name: 'warn',
    category: 'Moderation',
    description: 'Warn someone',
    usage: `warn <@user> [motive]`,

run : async (client, message, args) => {
   if(!message.member.hasPermission('MUTE_MEMBERS'))return message.channel.send("You don't have permission to use this command.")
  let role = message.guild.roles.cache.find(role => role.name == "[Muted]");
  if (!role) {
      try {
        role = await message.guild.roles.create({
          data: {
            name: "[Muted]",
            permissions: []
          }
        });
        message.guild.channels.cache.forEach(async channel => {
          await channel.createOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let member = message.mentions.members.first();
    let motive = args[1];
    const warnEmbed = new Discord.MessageEmbed()
    .setTitle('⚠️Warn⚠️')
    .setDescription(`The user ${member} has been warned for:\n${motive}`)
    .setTimestamp()
    
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
      newUser.warns += 1;    
      newUser.save().catch(err => console.log(err));
      let msg = message.channel.send(warnEmbed)
      return 
      
    }
    
        user.warns += 1;
        user.save().catch(err =>console.log(err));
       let msg = await message.channel.send(warnEmbed)
      let mutetime
      switch (user.warns){
        case 1 : break;
        case 2 : break;
        case 3 : mutetime = '12h'
          break;
        case 4 : mutetime = '16h'
          break;
        case 5 : mutetime = '24h'
          break;
        default: mutetime = '48h'
      }
      if(mutetime){
        await member.roles
            .add(role)
            .catch(error => message.reply( `Sorry ${message.author} I couldn't mute because of : ${error}` )
             );setTimeout(function() { member.roles.remove(role.id);}, ms(mutetime));
             const muteEmbed = new Discord.MessageEmbed()
                .setTitle('🚫Mute🚫')
                .setDescription(`The user ${member} has been warned ${user.warns} times so is now muted for ${mutetime}`)
                .setTimestamp()
            setTimeout(function() { msg.edit(muteEmbed) }, 2000);
                  
      }
        }
  
)}
  
  
};