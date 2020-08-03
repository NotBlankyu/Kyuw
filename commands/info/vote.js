const Discord = require("discord.js");
const DBL = require("dblapi.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
let ms = require('ms');
module.exports={
name: 'vote',
    category: 'economy',
    description: 'votes in top.gg to get rewards',
    usage: `vote`,

run : async (client, message, args) => {
  try{
  const dbl = new DBL(process.env.dbltoken, client);
  let user = await User.findOne({ 
    userID: message.member.id
  }, (err, user) => {
    if(err) console.log(err);
     if(!user){
          const user = new User({
        _id: mongoose.Types.ObjectId(),
        userID: message.member.id,
        gold: 0,
      })
     }
})
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
  const cooldown = 43200000
  if(guild.lang=='pt'){
    const embed = new Discord.MessageEmbed()
  .setDescription('Olá, clica [aqui](https://top.gg/bot/703567218209849344/vote) para votares,depois é só esperares um pouco e utilizares o comando denovo para receberes as recompensas!')
  dbl.hasVoted(message.member.id).then(voted => {
    if (voted){
      if(!user.votetime)user.votetime = 0
      if (Date.now() > user.votetime){
      user.gold += 50;
      user.votetime = Date.now() + cooldown;
      user.save().catch(err =>console.log(err));
      return message.channel.send('Obrigado por votares, aqui estão as tuas 50 moedas de ouro. ')
      }else{
        return message.channel.send(`Tenta denovo em ${ms(user.votetime - Date.now() )}`) 
      }
    }else{
      message.channel.send(embed)
    }
});
  }else{
    const embed = new Discord.MessageEmbed()
  .setDescription('Hi, click [here](https://top.gg/bot/703567218209849344/vote) to vote, after just wait a bit and run the command again to get your rewards!')
  dbl.hasVoted(message.member.id).then(voted => {
    if (voted){
      if(!user.votetime)user.votetime = 0
      if (Date.now() > user.votetime){
      user.gold += 50;
      user.votetime = Date.now() + cooldown;
      user.save().catch(err =>console.log(err));
      return message.channel.send('Thanks for voting, here is 50 gold coins. ')
      }else{
        return message.channel.send(`Try again in ${ms(user.votetime - Date.now() )}`) 
      }
    }else{
      message.channel.send(embed)
    }
});
  }
  } catch (err) {
    message.channel.send('An error happen connecting to dbl, please try again later.')
  } 
  }
};