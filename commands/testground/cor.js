const Discord = require("discord.js");

module.exports = {
  
  name: 'cor',
    category: 'TestGround',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `${(process.env.PREFIX)}ping`,
  
  run : async (client, message, args) => {
  var cor = args[0]
  let corRole = message.guild.roles.cache.find(corRole => corRole.name == cor)
  await message.member.roles.add(corRole)
  message.reply("Done")
  }
};