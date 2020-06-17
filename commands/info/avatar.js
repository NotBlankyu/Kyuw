const Discord = require("discord.js");

module.exports={
  name: 'avatar',
    category: 'info',
    description: 'Returns the avatar',
    usage: `avatar [@user}`,
  
  run : async (client, message, args) => {
  var user = message.mentions.users.first() ||message.member.user;
  const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${user.username} Avatar`)
  .setImage(user.avatarURL())
	message.channel.send(Embed);
  }
};