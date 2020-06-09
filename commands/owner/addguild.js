const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');



module.exports={
  name: 'addguild',
    category: 'OwnerOnly',
    description: 'Adds a guild to the database.',
    usage: `${(process.env.PREFIX)}addguild`,
  
  run : async (client, message, args) => {
  if(message.member.id != process.env.OWNER ) return;
   
   const guild = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildID: message.guild.id,
      guildName: message.guild.name
   });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!');
    message.reply('Guild added!')
    
  }
};