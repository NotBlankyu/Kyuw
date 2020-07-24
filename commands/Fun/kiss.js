const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
  name: 'kiss',
  aliases: ['beijar'],
    category: 'Fun',
    description: 'Kiss someone else',
    usage: `kiss <@user>`,
  
  run : async (client, message, args) => {
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
  //gets the member to show in the message
  let mention = message.mentions.members.first();
  // return if there isnt a mention
  if (!mention){
    if(guild.lang=='pt'){
      return message.reply("Não consegues beijar o ar...") 
    }else{
      return message.reply("You can't kiss air dummy.")
    }
  } 
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
  if(guild.lang=='pt'){
    message.channel.send(`${message.author} beijou ${mention}`, {files: [random]})
  }else{
    message.channel.send(`${message.author} kissed ${mention}`, {files: [random]})
  }
  
  }
};