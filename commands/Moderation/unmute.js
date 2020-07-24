const Discord = require("discord.js");
const Guild = require('../../models/guild');


module.exports = {
  
  name: 'unmute',
  aliases: ['desmutar'],
    category: 'Moderation',
    description: 'unmutes someone.',
    usage: `unmute <@user>`,
  
  run : async (client, message, args) => {
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
  if (!member){
    if(Guild2.lang=='pt'){
      return message.reply("Menciona um membro presente no servidor");
    }else{
      return message.reply("Please mention a valid member of this server");
    }
  }
  let failure = false
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason";
  let guild = message.guild;
  let role = guild.roles.cache.find(role => role.name =="[Muted]")
  if(!member.roles.cache.has(role.id)){
    if(Guild2.lang=='pt'){
      return message.channel.send("Este usuário não está mutado")
    }else{
      return message.channel.send("This person isn't muted")
    }
  } 
  await member.roles.remove(role).catch(error => { 
      if(error.code == 50001){
        if(Guild2.lang=='pt'){
          failure = true
          return message.channel.send("Não tenho permissão para alterar os cargos")
        }else{
          failure = true
          return message.channel.send("I don't have permission to manage roles")
        }
      }
     
     failure = true
     });
     if(!failure){
      if(Guild2.lang=='pt'){
        message.reply(`${member.user.tag} foi desmutado.`);
      }else{
        message.reply(`${member.user.tag} has been unmuted.`);
      }
     } 
  }
}