const Discord = require("discord.js");

module.exports = {
  
  name: 't',
    category: 'Testground',
    description: 'something',
    usage: `something`,
  
  run : async (client, message, args) => {
  if(!message.member.id=="316999783782809600"){
    return
  }
  client.emit('guildMemberAdd', message.member);
  }
}


