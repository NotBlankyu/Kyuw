const Discord = require("discord.js");
const moment = require("moment");
moment.locale('pt-br')


module.exports = {
  
  name: 'userinfo',
    category: 'info',
    description: 'Shows the user information.',
    usage: `serverinfo`,
  
  run : async (client, message, args) => {

  let member = message.guild.member(message.mentions.members.first())|| message.guild.members.cache.find(member => member.id == args[0]) || message.member;
  let Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle( member.user.username)
	.setAuthor(message.author.username, message.author.avatarURL())
	.setDescription('User Info')
	.setThumbnail(member.user.avatarURL())
	.addFields(
		{ name: 'User Id', value: member.id, inline: false },
    { name: 'Created At', value:moment(member.user.createdAt).locale('en-gb').format('LLL'), inline: false },
    { name: 'Joined At', value:moment(member.joinedAt).locale('en-gb').format('LLL'), inline: false },
    { name: 'Permissions', value:member.permissions.toArray(), inline: false },
    
	)
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');
  message.channel.send(Embed);
  }
};