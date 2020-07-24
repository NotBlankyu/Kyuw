const Discord = require("discord.js");
const ms = require("ms");
const mongoose = require('mongoose');
const UserInfractions = require('../../models/userInfractions');
const Guild = require('../../models/guild');

module.exports={
name: 'warn',
    category: 'Moderation',
    description: 'Warn someone',
    usage: `warn <@user> [motive]`,

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
    if(!motive){
      if(guild.lang=='pt'){
        motive = 'Sem motivo'
      }else{
        motive = "No reason"
      }
    }
    const warnEmbed = new Discord.MessageEmbed()
    if(guild.lang=='pt'){
      warnEmbed
        .setTitle('⚠️Aviso⚠️')
        .setDescription(`O usuário ${member} foi avisado por:\n${motive}`)
        .setTimestamp()
    }else{
      warnEmbed
        .setTitle('⚠️Warn⚠️')
        .setDescription(`The user ${member} has been warned for:\n${motive}`)
        .setTimestamp()
    }
    
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
            .catch(error => {
              console.log(error)
              if(error.code == 50001){
                if(guild.lang=='pt'){
                  return message.channel.send("**Não tenho permissão para alterar os cargos**")
                }else{
                  return message.channel.send("**Sorry i don't have permission to manage roles**")
                }
              }
            }
             );setTimeout(function() { member.roles.remove(role.id);}, ms(mutetime));
             const muteEmbed = new Discord.MessageEmbed()
             if(guild.lang=='pt'){
              muteEmbed
              .setTitle('🚫Mute🚫')
              .setDescription(`O usuário ${member} foi avisado ${user.warns} vezes então foi mutado por ${mutetime}`)
              .setTimestamp()
            }else{
              muteEmbed
              .setTitle('🚫Mute🚫')
              .setDescription(`The user ${member} has been warned ${user.warns} times so is now muted for ${mutetime}`)
              .setTimestamp()
            }
                
            setTimeout(function() { msg.edit(muteEmbed) }, 2000);
                  
      }
        }
  
)}
  
  
};