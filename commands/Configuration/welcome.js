const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'welcome',
    category: 'Configuration',
    description: 'Allows to change the welcome settings.',
    usage: `welcome <set/info/on/off> [gif]`,

run : async (client, message, args) => {
  if(message.member.id !=process.env.OWNER){
    if(!message.member.hasPermission("BAN_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");  
  }
  if(!args[0]){
    message.channel.send('Please use welcome <set/info/on/off>')
  }
  if(args[0]=='set'){
    if(!message.mentions.channels.first().id) return message.channel.send('Please provide a channel')
    Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
        if(!guild){
          const newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
        welcomeID: message.mentions.channels.first().id
          })
          
          newGuild.save().catch(err => console.log(err));
          message.channel.send('Welcome channel defined')
        }else{
          guild.welcomeID = message.mentions.channels.first().id
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
       if(guild.welcomeGif==false){
         gifembed = 'Off'
       }else{
         gifembed = 'On'
       }
     const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle( 'Welcome Channel Info')
  .addField('Info',`Status: **${status}**\nGif:**${gifembed}** \nCurrent Channel:<#${guild.welcomeID}>`)
	message.channel.send(Embed);
  })
}else if(args[0]=='on'){

  if(!args[1]){
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeSwitch = true;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Welcome message on!')
  })}else if (args[1]== "gif"){
    Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeGif = true;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Gif on!')
  }
    )}
}else if(args[0]=='off'){
     if(!args[1]){
     
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeSwitch = false;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Welcome message off!')
  })
}else if(args[1]== "gif"){
  Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
     guild.welcomeGif = false;
     guild.save().catch(err =>console.log(err));
     message.channel.send('Gif off!')
  }
    )
}
  
} 
}
};