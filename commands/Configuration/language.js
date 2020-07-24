const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'language',
    category: 'configuration',
    description: 'Changes bot language',
    usage: `language`,

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
      switch(guild.lang){
          case 'pt':  
                guild.lang = "eng"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Language changed.')
                break;
          case 'eng':
                guild.lang = "pt"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Linguagem alterada.')
                break;
          default:
                guild.lang = "pt"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Linguagem alterada.')
                break;
      }
  }
};