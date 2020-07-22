const Discord = require("discord.js");
const DBL = require("dblapi.js");
const mongoose = require('mongoose');
const User = require('../../models/user');
let ms = require('ms');
module.exports={
name: 'vote',
    category: 'economy',
    description: 'votes in top.gg to get rewards',
    usage: `vote`,

run : async (client, message, args) => {
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
  const cooldown = 43200000
  const embed = new Discord.MessageEmbed()
  .setDescription('Hi, click [here](https://top.gg/bot/703567218209849344/vote) to vote, after just run the command again and you get your rewards!')
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
};