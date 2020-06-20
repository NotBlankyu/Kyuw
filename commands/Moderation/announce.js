const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "Moderation",
  description: "Announce a mensage",
  usage: `clear <1-99>`,

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let channel = message.guild.channels.cache.find(channel => channel == message.mentions.channels.first().id)
    let mention
    if(args[1]==0){
      
    }else if(args[1]==1){
      mention = '@everyone'
    }else if(args[1]==2){
      mention = '@here'
    }else {
      mention = message.mentions.roles.first().toString()
    }
    let msg = args.slice(2).join(" ")
    let embed = new Discord.MessageEmbed()
    .setTitle('Announcement')
    .setDescription(msg)
    .setTimestamp()
    .setFooter('dh','https://i.imgur.com/FPc54Tr.jpg')
    if(mention)channel.send(mention)
    channel.send(embed)
    message.react('👍')
  }
};
