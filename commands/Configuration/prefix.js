const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'prefix',
    category: 'Configuration',
    description: 'Allows to change the prefix settings.',
    usage: `prefix [set <newprefix>]`,

run : async (client, message, args) => {
  //checks permissions
  if(message.member.id !=process.env.OWNER){
    if(!message.member.hasPermission("ADMINISTRATOR") )
      return message.reply("Sorry, you don't have permissions to use this!");  
  }
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
  // checks if we want only the info or to change the prefix
  if(args[0]=='set'){
    //checks if there is anything to use for the new prefix
    if(!args[1]){
      if(guild.lang == 'eng'){
        return message.channel.send('Please provide a new prefix')
      }else if(guild.lang == 'pt'){
        return message.channel.send('Forneça um novo prefixo')
      }else{
        return message.channel.send('Please provide a new prefix')
      }
      
    } 
    guild.customPrefix = args[1]
    guild.save().catch(err =>console.log(err));
    if(guild.lang == 'eng'){
      return message.channel.send('New prefix defined') 
    }else if(guild.lang == 'pt'){
      return message.channel.send('Novo prefixo definido')
    }else{
      return message.channel.send('New prefix defined') 
    }
  }else if(!args[0]){
    //checks the db for the guild id
        //if there isnt anything on the db or hasn't been changed gets the default prefix and sends it
       if(!guild.customPrefix){
        if(guild.lang == 'eng'){
          const Embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle( 'Bot prefix Info')
          .addField('Info', `Current Prefix: ${process.env.PREFIX}`)
	        return message.channel.send(Embed);
        }else if(guild.lang == 'pt'){
          const Embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle( 'Informação do prefix do bot')
          .addField('Informação', `Prefixo atual: ${process.env.PREFIX}`)
	        return message.channel.send(Embed);
        }else{
          const Embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle( 'Bot prefix Info')
          .addField('Info', `Current Prefix: ${process.env.PREFIX}`)
	        return message.channel.send(Embed);
        }
          
       }//gets the custom prefix and sends it
       if(guild.lang == 'eng'){
        const Embed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle( 'Bot prefix Info')
      .addField('Info', `Current Prefix: ${guild.customPrefix}`)
	  message.channel.send(Embed);
      }else if(guild.lang == 'pt'){
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle( 'Informação do prefix do bot')
        .addField('Informação', `Prefixo atual: ${guild.customPrefix}`)
      message.channel.send(Embed);
      }else{
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle( 'Bot prefix Info')
        .addField('Info', `Current Prefix: ${guild.customPrefix}`)
        return message.channel.send(Embed);
      }
    
}

  
  
}
};