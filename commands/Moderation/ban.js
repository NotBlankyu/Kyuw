const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
  name: "ban",
  category: "Moderation",
  description: "Bans someone.",
  usage: `ban <@user>`,

  run: async (client, message, args) => {
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
    if (!message.member.hasPermission("BAN_MEMBERS")){
      if(guild.lang=='pt'){
        return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de banir membros.");
      }else{
        return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have ban members permission.");
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
      
    if (!member.bannable){
      if(guild.lang=='pt'){
        return message.reply("Não consigo banir este usuário!(Verifica se eu tenho as permissoes corretas para o fazer)");
      }else{
        return message.reply("I can't ban this user!(Make sure i have the right permissions to do it)");
      }
    } 

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason";

    await member
      .ban(reason)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't ban because of : ${error}`
        )
      );
      if(guild.lang=='pt'){
        message.reply(`${member.user.tag} foi banido por: ${reason}`);
      }else{
        message.reply(`${member.user.tag} has been banned because: ${reason}`);
      }
    
  }
};
