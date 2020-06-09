const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'welcome',
    category: 'Configuration',
    description: 'Allows to change the welcome settings.',
    usage: `${(process.env.PREFIX)}welcome <set/info/on/off>`,

run : async (client, message, args) => {
  if(message.member.id !=process.env.OWNER){
    if(!message.member.hasPermission("BAN_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");  
  }
  
  if(args[0]=='set'){
    if(!args[1]) return message.channel.send('Please provide a channel')
    Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
        if(!guild){
          const newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
        welcomeID: args[1]
          })
          
          newGuild.save().catch(err => console.log(err));
          message.channel.send('Welcome channel defined')
        }else{
          guild.welcomeID = args[1];
          guild.save().catch(err =>console.log(err));
          message.channel.send('Welcome channel defined')
  
      }
    })
  }else if(args[0]=='info'){
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
       let status;
       if(guild.welcomeSwitch==false){
         status = 'Off'
       }else{
         status = 'On'
       }
     const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle( 'Welcome Channel Info')
  .addField('Info',`Status: **${status}** \nCurrent Channel:<#${guild.welcomeID}>`)
	message.channel.send(Embed);
  })
}else if(args[0]=='on'){
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeSwitch = true;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Welcome message on!')
  })
}else if(args[0]=='off'){
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeSwitch = false;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Welcome message off!')
  })
}
  
  
}
};