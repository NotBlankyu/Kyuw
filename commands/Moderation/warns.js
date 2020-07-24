const Discord = require("discord.js");
const mongoose = require('mongoose');
const UserInfractions = require('../../models/userInfractions');
const Guild = require('../../models/guild');
module.exports={
name: 'warns',
    category: 'Moderation',
    description: 'See and configure warn information',
    usage: `warns <@user> <info/set/clean>`,

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
  if (!message.member.permissions.has("MUTE_MEMBERS")){
    if(guild.lang=='pt'){
      return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de mutar membros.");
    }else{
      return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have mute members permission.");
    }
  }
  let member = message.mentions.members.first();
  if (!member){
    if(guild.lang=='pt'){
      return message.reply("Menciona um membro presente no servidor");
    }else{
      return message.reply("Please mention a valid member of this server");
    }
  }
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
          case 'info':
             if(guild.lang=='pt'){
              const userInfo = new Discord.MessageEmbed()
              .setTitle(`Informação de avisos de ${member.user.username}`)
              .setDescription(`Este usuário foi avisado ${newUser.warns} vezes.`)
              message.channel.send(userInfo)
          }else{
            const userInfo = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns info`)
            .setDescription(`This user has been warned ${newUser.warns} times.`)
            message.channel.send(userInfo)
          }
            
            break;
          case 'clean':
            newUser.warns = 0;
            newUser.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
              const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`Limpeza dos avisos de ${member.user.username}`)
            .setDescription(`Contagem de avisos resetada.`)
            message.channel.send(warnCleanup)
            }else{
              const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns cleanup`)
            .setDescription(`This user warn count has been reseted.`)
            message.channel.send(warnCleanup)
            }
            
            break;
          case 'set':
            newUser.warns = args[2];
            newUser.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
              const warnSet = new Discord.MessageEmbed()
            .setTitle(`Configuração dos avisos de ${member.user.username}`)
            .setDescription(`Este usuário têm agora ${args[2]} avisos.`)
            message.channel.send(warnSet)
            }else{
              const warnSet = new Discord.MessageEmbed()
              .setTitle(`${member.user.username} warns Setup`)
              .setDescription(`This user has now ${args[2]} warns.`)
              message.channel.send(warnSet)
            }
            
            break;
          default : if(guild.lang=='pt'){
            message.channel.send('Usa a sintaxe correta, para mais informações usa "help warns"')
          }else{
          message.channel.send('Use the correct syntax, for more information use "help warns"')
          }
        }return
    }
        switch(args[1]){
          case 'info':  if(guild.lang=='pt'){
            const userInfo = new Discord.MessageEmbed()
            .setTitle(`Informação de avisos de ${member.user.username}`)
            .setDescription(`Este usuário foi avisado ${user.warns} vezes.`)
            message.channel.send(userInfo)
        }else{
          const userInfo = new Discord.MessageEmbed()
          .setTitle(`${member.user.username} warns info`)
          .setDescription(`This user has been warned ${user.warns} times.`)
          message.channel.send(userInfo)
        }
            break;
          case 'clean': 
            user.warns = 0;
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
              const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`Limpeza dos avisos de ${member.user.username}`)
            .setDescription(`Contagem de avisos resetada.`)
            message.channel.send(warnCleanup)
            }else{
              const warnCleanup = new Discord.MessageEmbed()
            .setTitle(`${member.user.username} warns cleanup`)
            .setDescription(`This user warn count has been reseted.`)
            message.channel.send(warnCleanup)
            }
            break;
          case 'set':
            if(!args[2]){
              if(guild.lang=='pt'){
                return message.reply("Forneçe o novo numero de avisos") 
              }else{
                return message.reply("Please provide the new number of warns") 
              }
            }
          user.warns = args[2];
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
              const warnSet = new Discord.MessageEmbed()
            .setTitle(`Configuração dos avisos de ${member.user.username}`)
            .setDescription(`Este usuário têm agora ${args[2]} avisos.`)
            message.channel.send(warnSet)
            }else{
              const warnSet = new Discord.MessageEmbed()
              .setTitle(`${member.user.username} warns Setup`)
              .setDescription(`This user has now ${args[2]} warns.`)
              message.channel.send(warnSet)
            }
            break;
          default : if(guild.lang=='pt'){
            message.channel.send('Usa a sintaxe correta, para mais informações usa "help warns"')
          }else{
            message.channel.send('Use the correct syntax, for more information use "help warns"')
          }
        }
      })
  
  }
};