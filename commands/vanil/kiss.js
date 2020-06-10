const Discord = require("discord.js");

module.exports = {
  name: 'kiss',
    category: 'fun',
    description: 'Kiss someone else',
    usage: `kiss <@user>`,
  
  run : async (client, message, args) => {
  let mention = message.mentions.members.first();
  if (!mention) return message.reply("you can't kiss air dummy.")
  var list = [
    "https://i.imgur.com/sGVgr74.gif",
    "https://i.imgur.com/YbNv10F.gif",
    "https://i.imgur.com/e0ep0v3.gif",
    "https://i.imgur.com/eisk88U.gif",
    "https://i.imgur.com/AncTiSt.gif",
    "https://i.imgur.com/NkfsJV7.gif",
    "https://i.imgur.com/MVS1ilF.gif"
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  message.channel.send(`${message.author} kissed ${mention}`, {files: [random]})
  message.react("706064356747771914");
  }
};