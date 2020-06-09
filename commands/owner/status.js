const Discord = require("discord.js");

module.exports = {
  
  name: 'status',
    category: 'OwnerOnly',
    description: 'Allows to change the bot status.',
    usage: `${(process.env.PREFIX)}ping`,
  
  run : async (client, message, args) => {
  if(message.member.id != '316999783782809600' ){
    return message.reply("Sorry, you don't have permissions to use this!");
  }
  let activity = "your soul."
  if(args[0]){
    activity = args.join(" ");
  }
  client.user.setActivity(activity, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
  }
};

