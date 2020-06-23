const Discord = require("discord.js");
const moment = require("moment");
moment.locale('pt-br')


module.exports = {
  
  name: 'serverinfo',
    category: 'info',
    description: 'Shows the current server information.',
    usage: `serverinfo`,
  
  run : async (client, message, args) => {
   //creates the invite to link in the server name 
   let invite = await message.channel.createInvite(
  {
    maxAge: 86400, // maximum time for the invite, in milliseconds
    maxUses: 1 // maximum times it can be used
  },
  `Requested with command by ${message.author.tag}`
)
  //gets the user to see the joined date
  let user = message.author;
  //create the embed to send
  let Embed = new Discord.MessageEmbed()
  
	.setColor('#0099ff')
	.setTitle(message.guild)
	.setURL(`https://discord.gg/${invite.code}`)
	.setAuthor(message.author.username, message.author.avatarURL())
	.setDescription('Server Info')
	.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
	.addFields(
		{ name: 'Server Id', value: message.guild.id, inline: false },
		{ name: 'Server Owner', value: message.guild.owner.user.username, inline: false },
    { name: 'Server Region', value: message.guild.region, inline: false },
    { name: 'Server Members', value: message.guild.members.cache.size, inline: false },
    { name: 'Created At', value: moment(message.guild.createdAt).locale('en-gb').format('LLL'), inline: false },
    { name: 'Joined At', value:moment(message.member.joinedAt).locale('en-gb').format('LLL'), inline: false },
    
	)
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');
  //send it
  message.channel.send(Embed);
  }
};