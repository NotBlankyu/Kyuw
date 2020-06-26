const Discord = require("discord.js");

module.exports = {
  name: 'gay',
    category: 'fun',
    description: 'Make someone else gay',
    usage: `gay <@user>`,
  
  run : async (client, message, args) => {
  let mention = message.mentions.members.first();
  if(message.guild.id != process.env.CHILL)return
  if (!mention) return message.reply("you can't make gay air.")
  var list = [
    "https://cdn.discordapp.com/attachments/715647767422435409/721087859318063167/video0.mp4",
    "https://cdn.discordapp.com/attachments/715647767422435409/721088452476534945/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721089006292566066/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721089369271959754/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721087036710322216/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721089156599775312/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721089029356912703/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721088752545693726/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721088042328260709/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721142415796469790/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721142569639084072/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721142769594269737/image0.jpg",
    "https://cdn.discordapp.com/attachments/715647767422435409/721142975282806824/image0.jpg"
   
   
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  message.channel.send(`${mention} is now gay `, {files: [random]})
 
  }
};