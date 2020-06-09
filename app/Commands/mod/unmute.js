const Discord = require("discord.js");


module.exports = {
  
  name: 'unmute',
    category: 'Moderation',
    description: 'To unmute someone.',
    usage: `${(process.env.PREFIX)}unmute <@user>`,
  
  run : async (client, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");
    
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.bannable) 
    return message.reply("I cannot unmute this user!");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason";
  let guild = message.guild;
  let role = guild.roles.cache.find(role => role.name =="[Muted]")
  await member.roles.remove(role).catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
  message.reply(`${member.user.tag} has been unmuted.`);
  }
}