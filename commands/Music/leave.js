const Discord = require("discord.js");

module.exports = {
  name: 'leave',
    category: 'Music',
    description: 'Bot leaves the channel.',
    usage: `leave`,
  
  run : async (client, message, args) => {
    return message.channel.send("Srry not working right now :(")

    if(!message.member.voice.channel) return message.channel.send("You're not in a channel!")
    if(!message.guild.me.voice.channel) return message.channel.send("I'm not in a channel!");
    if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send("We're not in the same channel!");
    message.guild.me.voice.channel.leave();
    message.channel.send('Leaving!')

  }
};
