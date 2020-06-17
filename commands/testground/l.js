const Discord = require("discord.js");

module.exports = {
  
  name: 'l',
    category: 'TesteGround',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `${(process.env.PREFIX)}ping`,
  
  run : async (client, message, args) => {
  var user = message.mentions.users.first();
  const Embed1 = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`teste1`)
 const Embed2= new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`teste2`)
	var list = [
    Embed1,
    Embed2
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  message.channel.send(random)
  }
};
