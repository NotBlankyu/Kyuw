const Discord = require("discord.js");

module.exports = {
  
  name: 'unban',
  aliases: ['desbanir'],
    category: 'Unban',
    description: 'To unban someone.',
    usage: `unban <userid>`,
  
  run : async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS") )
      return message.reply("Sorry, you don't have permissions to use this!");
  let failure = false
  let userID = message.content.slice(7)
    if(!userID) return message.reply("Please provide a valid ID")
  let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason."
    await message.guild.members.unban(userID).catch(e => {
      console.log(e)
      message.channel.send('Missing permission BAN_MEMBERS')
      return failure = true
    })
    if(!failure){
    message.reply(`${userID} has been unbanned!`)
    }
  }
  };




