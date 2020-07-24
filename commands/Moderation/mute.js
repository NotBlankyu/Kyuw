const Discord = require("discord.js");
const ms = require("ms");
const Guild = require('../../models/guild');

module.exports = {
  name: "mute",
  aliases: ['mutar'],
  category: "Moderation",
  description: "To mute someone.",
  usage: `mute <@user> <time>`,

  run: async (client, message, args) => {
    const Guild2 = await Guild.findOne({ 
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
      if(Guild2.lang=='pt'){
        return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de mutar membros.");
      }else{
        return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have mute members permission.");
      }
    }
    
    let member = message.mentions.members.first();
    let guild = message.guild;
    let role = guild.roles.cache.find(role => role.name == "[Muted]");
    if (!member){
      if(Guild2.lang=='pt'){
        return message.reply("Menciona um membro presente no servidor");
      }else{
        return message.reply("Please mention a valid member of this server");
      }
    }

    if (!role) {
      try {
        role = await guild.roles.create({
          data: {
            name: "[Muted]",
            permissions: []
          }
        }).catch(err => {
          return console.log(err)
        })
        message.guild.channels.cache.forEach(async channel => {
          await channel.createOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          }).catch(err => {
          return
        })
        })
      } catch (e){
          
      }
    }
    let success = true;
    await member.roles
      .add(role)
      .catch(error =>{
       console.log(error) 
       if(error.code == 50001){
        if(Guild2.lang=='pt'){
          success = false;
          return message.channel.send("Não tenho permissão para alterar os cargos")
        }else{
          success = false;
          return message.channel.send("I don't have permission to manage roles")
       }
       }
        }
      );
    let mutetime = args[1];
    
    if(success){
      if(Guild2.lang=='pt'){
        if (!mutetime) return message.reply("Não especificaste o tempo");
      message.reply(`<@${member.id}> foi mutado por ${mutetime}`);
      setTimeout(function() {
      member.roles.remove(role.id);
    }, ms(mutetime));
      }else{
        if (!mutetime) return message.reply("You didnt specify the time");
      message.reply(`Successfully muted <@${member.id}> for ${mutetime}`);
      setTimeout(function() {
      member.roles.remove(role.id);
    }, ms(mutetime));
      }
      
    } 

    
  }
};
