const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'prefix',
    category: 'Configuration',
    description: 'Allows to change the prefix settings.',
    usage: `prefix [set <newprefix>]`,

run : async (client, message, args) => {
  if(message.member.id !=process.env.OWNER){
    if(!message.member.hasPermission("ADMINISTRATOR") )
      return message.reply("Sorry, you don't have permissions to use this!");  
  }
  
  if(args[0]=='set'){
    if(!args[1]) return message.channel.send('Please provide a new prefix')
    Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
        if(!guild){
          const newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
        customPrefix: args[1]
          })
          
          newGuild.save().catch(err => console.log(err));
          message.channel.send('New prefix defined')
        }else{
          guild.customPrefix = args[1];
          guild.save().catch(err =>console.log(err));
          message.channel.send('New prefix defined')
  
      }
    })
  }else if(!args[0]){
     Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(err) console.log(err);
       if(!guild.customPrefix){
          const Embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle( 'Bot prefix Info')
          .addField('Info', `Current Prefix: ${process.env.PREFIX}`)
	        return message.channel.send(Embed);
       }
     const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle( 'Bot prefix Info')
  .addField('Info', `Current Prefix: ${guild.customPrefix}`)
	message.channel.send(Embed);
  })
}

  
  
}
};