const Discord = require("discord.js");

module.exports = {
  
  name: 'status',
    category: 'OwnerOnly',
    description: 'Allows to change the bot status.',
    usage: `status [text]`,
  
  run : async (client, message, args) => {
  if(message.member.id != '316999783782809600' ){
    return message.reply("Sorry, you don't have permissions to use this!");
  }
  let activity = "your soul."
  let type = 'WATCHING'
  if(args[1]){
    activity = args.slice(1).join(" ");
  }
  if(args[0]=='0'){
     type = 'WATCHING'
  }else if(args[0]=='1'){
     type = 'LISTENING'
  }else if(args[0]=='2'){
     type = 'PLAYING'
  }
  client.user.setActivity(activity, { type: type })
  .then(presence => console.log(`Activity set to \`${presence.activities[0].name}\``))
  .catch(console.error);
  message.channel.send(`Status : \`${activity}\` \nType : \`${type}\``)
  }
};

