const Discord = require("discord.js");
const moment = require("moment");


module.exports = {
  
  name: 'userinfo',
    category: 'info',
    description: 'Shows the user information.',
    usage: `serverinfo [@member/memberid] [perms]`,
  
  run : async (client, message, args) => {
  //Gets the member either by mention, id, or the message author
  let member = message.guild.member(message.mentions.members.first())|| message.guild.members.cache.find(member => member.id == args[0]) || message.member;

  //Normal embed
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
    { name: 'Highest Role', value: member.roles.highest, inline: false },
	)
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');


  //Permissions Embed
  let EmbedPerms = new Discord.MessageEmbed()
  .setColor('#0099ff')
	.setTitle( member.user.username)
	.setAuthor(message.author.username, message.author.avatarURL())
	.setDescription('User Info')
  .addFields(
     { name: 'Permissions', value:member.permissions.toArray(), inline: false },
    
	)
  //See what is the correct embed to send
  if(message.content.includes("perms"))return message.channel.send(EmbedPerms);
  message.channel.send(Embed);
  }
};