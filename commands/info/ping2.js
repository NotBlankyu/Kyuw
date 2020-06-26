const Discord = require("discord.js");

module.exports={
name: 'ping2',
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,

run : async (client, message, args) => {
  
  const m = await message.channel.send("Ping?");
  const apiPing = Math.round(client.ws.ping);
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.Api latency is ${apiPing}ms.`);
    
  
  }
};