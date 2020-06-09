const Discord = require("discord.js");

module.exports = {
  name: 'punch',
    category: 'fun',
    description: 'punch someone else',
    usage: `${(process.env.PREFIX)}punch <@user>`,
  
  run : async (client, message, args) => {
  let mention = message.mentions.members.first();
  if (!mention) return message.reply("you can't kiss air dummy.")
  var list = [
    "https://media.giphy.com/media/arbHBoiUWUgmc/giphy.gif",
    "https://media.giphy.com/media/yo3TC0yeHd53G/giphy.gif",
    
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  message.channel.send(`${message.author} punched ${mention}`, {files: [random]})
  
  }
};