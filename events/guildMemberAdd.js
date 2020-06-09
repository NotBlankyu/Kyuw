const mongoose = require('mongoose');
const Guild = require('../models/guild');
const discord = require('discord.js');

module.exports = async (client, member) => {
  Guild.findOne({ 
        guildID: member.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
    if(guild.welcomeSwitch==false) return;
    const channel = member.guild.channels.cache.find(channel => channel.id === guild.welcomeID);
  if(!channel) return console.log("Channel doesn't exist"); 
  const embed = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Welcome to the server🎉!`)
  .setDescription(`Hi ${member},be sure to read the rules and have fun!`)
	.setThumbnail(member.user.avatarURL())
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');

  channel.send(embed)    
    })
  }
                



