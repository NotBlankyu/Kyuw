const Discord = require("discord.js");
const moment = require("moment");
const Guild = require('../../models/guild');


module.exports = {
  
  name: 'userinfo',
    category: 'info',
    description: 'Shows the user information.',
    usage: `serverinfo [@member/memberid] [perms]`,
  
  run : async (client, message, args) => {
  //Gets the member either by mention, id, or the message author
  let member = message.guild.member(message.mentions.members.first())|| message.guild.members.cache.find(member => member.id == args[0]) || message.member;
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
  if(guild.lang=='pt'){
     //Normal embed
  let Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle( member.user.username)
	.setAuthor(message.author.username, message.author.avatarURL())
	.setDescription('User Info')
	.setThumbnail(member.user.avatarURL())
	.addFields(
		{ name: 'Id do Usuario', value: member.id, inline: false },
    { name: 'Data de criação', value:moment(member.user.createdAt).locale('pt-pt').format('LLL'), inline: false },
    { name: 'Data de entrada', value:moment(member.joinedAt).locale('pt-pt').format('LLL'), inline: false },
    { name: 'Cargo mais alto', value: member.roles.highest, inline: false },
	)
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');

var permissions = member.permissions.toArray()
let EmbedPerms = new Discord.MessageEmbed()
  .setColor('#0099ff')
   .setTitle( member.user.username)
   .setAuthor(message.author.username, message.author.avatarURL())
   .setDescription('User Info')
   .addField('Perms', permissions)

  message.channel.send(Embed).then(msg => {
        msg.react('➡️')
        const collector1 = msg.createReactionCollector(filter1, { time: 30000 });
        collector1.on('collect', (reaction, user) => {
          msg.edit(EmbedPerms)
          msg.reactions.removeAll();
          msg.react('⬅️')
      });
      const collector2 = msg.createReactionCollector(filter2, { time: 30000 });
        collector2.on('collect', (reaction, user) => {
          msg.edit(Embed)
          msg.reactions.removeAll();
          msg.react('➡️')
      });
      });
      
  const filter1 = (reaction, user) => {
	return reaction.emoji.name === '➡️' && user.id === message.author.id;
};
  const filter2 = (reaction, user) => {
	return reaction.emoji.name === '⬅️' && user.id === message.author.id;
};
  
  
  }else{
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

var permissions = member.permissions.toArray()
let EmbedPerms = new Discord.MessageEmbed()
  .setColor('#0099ff')
   .setTitle( member.user.username)
   .setAuthor(message.author.username, message.author.avatarURL())
   .setDescription('User Info')
   .addField('Perms', permissions)

  message.channel.send(Embed).then(msg => {
        msg.react('➡️')
        const collector1 = msg.createReactionCollector(filter1, { time: 30000 });
        collector1.on('collect', (reaction, user) => {
          msg.edit(EmbedPerms)
          msg.reactions.removeAll();
          msg.react('⬅️')
      });
      const collector2 = msg.createReactionCollector(filter2, { time: 30000 });
        collector2.on('collect', (reaction, user) => {
          msg.edit(Embed)
          msg.reactions.removeAll();
          msg.react('➡️')
      });
      });
      
  const filter1 = (reaction, user) => {
	return reaction.emoji.name === '➡️' && user.id === message.author.id;
};
  const filter2 = (reaction, user) => {
	return reaction.emoji.name === '⬅️' && user.id === message.author.id;
};
  
  
  }

  }
  
};