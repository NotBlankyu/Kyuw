const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports={
name: 'welcome',
    category: 'Configuration',
    description: 'Allows to change the welcome settings.',
    usage: `welcome <set/info/on/off> [img]`,

run : async (client, message, args) => {
  if(message.member.id !=process.env.OWNER){
    if(!message.member.hasPermission("MANAGE_GUILD") )
      return message.reply("Sorry, you don't have permissions to use this!");  
  }
  if(!args[0]){
    message.channel.send('Please use welcome <set/info/on/off>')
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
  if(args[0]=='set'){
    if(!message.mentions.channels.first().id){
      if(guild.lang){
        if(guild.lang == 'pt'){
          message.channel.send('Forneça um canal')
        }else if(guild.lang == 'eng'){
          message.channel.send('Please provide a channel')
        }
      }else{
        return message.channel.send('Please provide a channel')
      }
      
    } 
    guild.welcomeID = message.mentions.channels.first().id
    guild.save().catch(err =>console.log(err));
    if(guild.lang){
      if(guild.lang == 'pt'){
        message.channel.send('Chat de boas vindas definido')
      }else if(guild.lang == 'eng'){
        message.channel.send('Welcome channel defined')
      }
    }else{
      return message.channel.send('Welcome channel defined')
    }
    
  }else if(args[0]=='info'){
       let status;
       if(guild.welcomeSwitch==false){
         status = 'Off'
       }else{
         status = 'On'
       }
       if(guild.welcomeGif==true){
         gifembed = 'On'
       }else{
         gifembed = 'Off'
       }if(guild.lang){
        if(guild.lang == 'pt'){
          const Embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle( 'Informações sobre o canal de boas-vindas')
          .addField('Info',`Status: **${status}**\nImg:**${gifembed}** \nCanal atual:<#${guild.welcomeID}>`)
          message.channel.send(Embed);
        }else if(guild.lang == 'eng'){
          const Embed = new Discord.MessageEmbed()
    	.setColor('#0099ff')
	    .setTitle( 'Welcome Channel Info')
      .addField('Info',`Status: **${status}**\nImg:**${gifembed}** \nCurrent Channel:<#${guild.welcomeID}>`)
      message.channel.send(Embed);
        }
      }else{
        const Embed = new Discord.MessageEmbed()
    	.setColor('#0099ff')
	    .setTitle( 'Welcome Channel Info')
      .addField('Info',`Status: **${status}**\nImg:**${gifembed}** \nCurrent Channel:<#${guild.welcomeID}>`)
      message.channel.send(Embed);
      }
      if(guild.lang){
        if(guild.lang == 'pt'){
        }else if(guild.lang == 'eng'){
        }
      }else{
      }
    
	  
}else if(args[0]=='on'){

  if(!args[1]){
     guild.welcomeSwitch = true;
     guild.save().catch(err =>console.log(err));
     if(guild.lang){
      if(guild.lang == 'pt'){
        message.channel.send('Mensagem de boas-vindas ligada!')
      }else if(guild.lang == 'eng'){
        message.channel.send('Welcome message on!')
      }
    }else{
      message.channel.send('Welcome message on!')
    }
     
  }else if (args[1]== "img"){
     guild.welcomeGif = true;
     guild.save().catch(err =>console.log(err));
     if(guild.lang){
      if(guild.lang == 'pt'){
        message.channel.send('Imagem ligada!')
      }else if(guild.lang == 'eng'){
        message.channel.send('Image on!')
      }
    }else{
      message.channel.send('Image on!')
    }
  }
}else if(args[0]=='off'){
     if(!args[1]){
     guild.welcomeSwitch = false;
     guild.save().catch(err =>console.log(err));
     if(guild.lang){
      if(guild.lang == 'pt'){
        message.channel.send('Mensagem de boas-vindas desligada!')
      }else if(guild.lang == 'eng'){
        message.channel.send('Welcome message off!')
      }
    }else{
      message.channel.send('Welcome message off!')
    }
}else if(args[1]== "img"){
     guild.welcomeGif = false;
     guild.save().catch(err =>console.log(err));
     if(guild.lang){
      if(guild.lang == 'pt'){
        message.channel.send('Imagem desligada!')
      }else if(guild.lang == 'eng'){
        message.channel.send('Image off!')
      }
    }else{
      message.channel.send('Image off!')
    }
}
  
} 
}
};