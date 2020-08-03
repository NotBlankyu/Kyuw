const Discord = require("discord.js");
const Guild = require('../../models/guild');
const User = require('../../models/user');

module.exports={
name: 'slots',
    category: 'economy',
    description: 'Gambles away your money',
    usage: `slots <amount>`,

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
  const user = await User.findOne({ 
    userID: message.member.id
  }, (err, user) => {
    if(!user){
       user = new user({
    _id: mongoose.Types.ObjectId(),
    userID: message.member.id,
      })}
  })
  if(!parseInt(args[0])){
    if(guild.lang=='pt'){
        return message.channel.send('Forneçe a quantidade de moedas que queres apostar')
      }else{
        return message.channel.send('Especify the ammount you are going to gamble')
      }
      
  }
  let results = [1,2,3,4,5,6]
    var slot1 = results[Math.floor(Math.random() * results.length)];
    var slot2 = results[Math.floor(Math.random() * results.length)];
    var slot3 = results[Math.floor(Math.random() * results.length)];
    var slot4 = results[Math.floor(Math.random() * results.length)];
    let emojis = new Map([
        [1, '<a:3032_spinning_croissant:738093404986277968>'],
        [2, '<a:5164_bananas_ro_ta_TE:738094476953911394>'],
        [3, '<a:4448_cat_glitchy:738101178449133594>'],
        [4, '<a:3472_frog_spin:738101621082292315>'],
        [5, '<a:3626_carbuncle:738136782058553424>'],
        [6, '<a:2263_cappie_excited:738101596059205775>'],
      ])
    message.channel.send('❓'+" "+'❓'+" "+'❓'+" "+'❓').then(msg => {
        setTimeout(function(){msg.edit(emojis.get(slot1)+" "+'❓'+" "+'❓'+" "+'❓')}, 1000);
        setTimeout(function(){msg.edit(emojis.get(slot1)+" "+emojis.get(slot2)+" "+'❓'+" "+'❓')}, 2000);
        setTimeout(function(){msg.edit(emojis.get(slot1)+" "+emojis.get(slot2)+" "+emojis.get(slot3)+" "+'❓')}, 3000);
        setTimeout(function(){msg.edit(emojis.get(slot1)+" "+emojis.get(slot2)+" "+emojis.get(slot3)+" "+emojis.get(slot4))}, 4000);
        setTimeout(function(){if(slot1==slot2 && slot1==slot3){
            user.gold += 3*parseInt(args[0])
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
                message.channel.send(`Parabéns, ganhaste ${3*parseInt(args[0])} moedas`)
              }else{
                message.channel.send(`Congratulation you won ${3*parseInt(args[0])} coins`)
              }
            
        }else if(slot2==slot3 && slot2==slot4){
            user.gold += 3*parseInt(args[0])
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
                message.channel.send(`Parabéns, ganhaste ${3*parseInt(args[0])} moedas`)
              }else{
                message.channel.send(`Congratulation you won ${3*parseInt(args[0])} coins`)
              }
        }else if(slot1==slot2 && slot1==slot3 && slot1==slot4){
            user.gold += 10*parseInt(args[0])
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
                message.channel.send(`Jackpot! Ganhaste ${10*parseInt(args[0])} moedas`)
              }else{
                message.channel.send(`Jackpot! You won ${10*parseInt(args[0])} coins`)
              }
            
        }else{
            user.gold -= parseInt(args[0])
            user.save().catch(err => console.log(err));
            if(guild.lang=='pt'){
                message.channel.send(`Perdeste ${parseInt(args[0])} moedas`)
              }else{
                message.channel.send(`You lost ${parseInt(args[0])} coins`)
              }
            
        }}, 5000);
    })
  
    
  
  }
};