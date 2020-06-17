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
  var list = [
    "https://media.giphy.com/media/dvreHY4p06lzVSDrvj/giphy.gif",
    "https://media.giphy.com/media/kbtysky2x8fZLW8osP/giphy.gif",
    "https://media.giphy.com/media/U8MrjfyGOrodo04l8A/giphy.gif",
    "https://media.giphy.com/media/LQ2zztPB7N3HE1Frfv/giphy.gif",
    "https://media.giphy.com/media/3ohhwHVQR1t6syIu9q/giphy.gif",
    "https://media.giphy.com/media/WqFqAGOStn4AD4ZK8G/giphy.gif",
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  const embedGif = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Welcome to the server🎉!`)
  .setDescription(`Hi ${member},be sure to read the rules and have fun!`)
  .setImage(random)
	.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');

  const embedText = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Welcome to the server🎉!`)
  .setDescription(`Hi ${member},be sure to read the rules and have fun!`)
	.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');
if(!guild.welcomeGif){
  channel.send(embedText)    
    }else{
      channel.send(embedGif)
    }
  }
                

  )}

