const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
  name: 'punch',
  aliases: ['socar'],
    category: 'Fun',
    description: 'punch someone else',
    usage: `punch <@user>`,
  
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
  let mention = message.mentions.members.first();
  if (!mention){
     if(guild.lang=='pt'){
    return message.reply("Não consegues dar um soco ao ar...") 
  }else{
    return message.reply("You can't punch air dummy.")
  }
}
  var list = [
    "https://media.giphy.com/media/arbHBoiUWUgmc/giphy.gif",
    "https://media.giphy.com/media/yo3TC0yeHd53G/giphy.gif",
    "https://tenor.com/view/brown-cony-sorry-punch-gif-13627939.gif"
    
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  if(guild.lang=='pt'){
    message.channel.send(`${message.author} deu um soco a  ${mention}`, {files: [random]})
  }else{
    message.channel.send(`${message.author} punched ${mention}`, {files: [random]})
  }
  
  }
};