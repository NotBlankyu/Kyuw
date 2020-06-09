const Discord = require("discord.js");

module.exports = {
  
  name: 'unban',
    category: 'Unban',
    description: 'To unban someone.',
    usage: `${(process.env.PREFIX)}unban <userid>`,
  
  run : async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");

  let userID = message.content.slice(7)
    if(!userID) return message.reply("Please provide a valid ID")
  let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason."
    message.guild.members.unban(userID)
    message.reply(`${userID} has been unbanned!`)
    }
  };




