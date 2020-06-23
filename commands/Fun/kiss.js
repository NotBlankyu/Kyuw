const Discord = require("discord.js");

module.exports = {
  name: 'kiss',
  aliases: ['beijar'],
    category: 'Fun',
    description: 'Kiss someone else',
    usage: `kiss <@user>`,
  
  run : async (client, message, args) => {
  //gets the member to show in the message
  let mention = message.mentions.members.first();
  // return if there isnt a mention
  if (!mention) return message.reply("you can't kiss air dummy.")
  //array with all the gif link
  var list = [
    "https://i.imgur.com/sGVgr74.gif",
    "https://i.imgur.com/YbNv10F.gif",
    "https://i.imgur.com/e0ep0v3.gif",
    "https://i.imgur.com/eisk88U.gif",
    "https://i.imgur.com/AncTiSt.gif",
    "https://i.imgur.com/NkfsJV7.gif",
    "https://i.imgur.com/MVS1ilF.gif"
  ];
  //picks a random link
  var random = list[Math.floor(Math.random() * list.length)]; 
  //sends the message with the random link attached
  message.channel.send(`${message.author} kissed ${mention}`, {files: [random]})
  }
};