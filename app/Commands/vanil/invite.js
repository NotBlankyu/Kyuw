const Discord = require("discord.js");

module.exports = {
 
  name: 'invite',
    category: 'info',
    description: 'Returns the invite link of the bot',
    usage: `${(process.env.PREFIX)}invite`,
  
  
  run : async (client, message, args) => {
const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Invite me!')
	.setURL('https://discordapp.com/oauth2/authorize?=&client_id=703567218209849344&scope=bot&permissions=8')
	.setAuthor(message.author.username, message.author.avatarURL ())
	.setThumbnail('https://i.imgur.com/FPc54Tr.jpg')
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');

	message.channel.send(Embed);
  }
};
