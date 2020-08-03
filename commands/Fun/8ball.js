const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports={
name: '8ball',
    category: 'fun',
    description: 'Answers your questions',
    usage: `8ball <question>`,

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
  if(guild.lang=='pt'){
      if(!args[0])return message.channel.send('Tens que fazer uma pergunta!')
      const responses = ['Sim','Não','Talvez','Possivelmente','0%','100%']
      var randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const embed = new Discord.MessageEmbed()
      .setTitle('8ball')
      .setDescription(`Pergunta: ${args.join(' ')}\n8ball diz: ${randomResponse}`)
      .setThumbnail('https://i.imgur.com/aTV5sya.gif')
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      message.channel.send(embed)
    }else{
      if(!args[0])return message.channel.send('You need to ask a question!')
      const responses = ['yes','no','maybe','perhaps','0%','100%']
      var randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const embed = new Discord.MessageEmbed()
      .setTitle('8ball')
      .setDescription(`Question: ${args.join(' ')}\n8ball says: ${randomResponse}`)
      .setThumbnail('https://i.imgur.com/aTV5sya.gif')
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      message.channel.send(embed)
    }
  

  
  }
};