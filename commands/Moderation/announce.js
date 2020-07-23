const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "Moderation",
  description: "Announce a mensage",
  usage: `announce <#channel> <mention> <message> \n To mention part use \`0\` for no mention,for everyone and here use \`1\` and \`2\`, and if you wish to mention a role use \`@role\` `,

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have the manage messages permission.");

    let mention
    console.log(args[1])
    switch(args[1]){
      case '0' : break;
      case '1' : mention = '@everyone'
        break;
      case '2' : mention = '@here'
        break;
      default: try {
       mention =  message.mentions.roles.first().toString()
      } catch (e) {
       return message.channel.send('Please use the correct syntax, for more informaton use the command `help announce`. ')
      }

    }
        let channel = message.guild.channels.cache.find(channel => channel == message.mentions.channels.first().id)
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
