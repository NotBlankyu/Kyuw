const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports={
name: 'ping',
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,

run : async (client, message, args) => {
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
  const m = await message.channel.send("Ping?");
  const apiPing = Math.round(client.ws.ping);
  if(guild.lang=='pt'){
    m.edit(`Pong! Latência de  ${m.createdTimestamp - message.createdTimestamp}ms.Latência da api é ${apiPing}ms.`);
  }else{
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.Api latency is ${apiPing}ms.`);
  }
  
    
  
  }
};