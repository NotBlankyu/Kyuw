const Discord = require("discord.js");


module.exports = {
  
  name: 'unmute',
  aliases: ['desmutar'],
    category: 'Moderation',
    description: 'unmutes someone.',
    usage: `unmute <@user>`,
  
  run : async (client, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");
    
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  let failure = false
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason";
  let guild = message.guild;
  let role = guild.roles.cache.find(role => role.name =="[Muted]")
  if(!member.roles.cache.has(role.id))return message.channel.send("This person isn't muted")
  await member.roles.remove(role).catch(error => { 
     message.channel.send(`Sorry ${message.author} I couldn't unmute because of : Missing MANAGE_ROLES permission`)
     failure = true
     });
     if(!failure)message.reply(`${member.user.tag} has been unmuted.`);
  }
}