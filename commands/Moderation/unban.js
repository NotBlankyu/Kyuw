const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
  
  name: 'unban',
  aliases: ['desbanir'],
    category: 'Unban',
    description: 'To unban someone.',
    usage: `unban <userid>`,
  
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

    if (!message.member.hasPermission("BAN_MEMBERS")){
      if(guild.lang=='pt'){
        return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de banir membros.");
      }else{
        return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have ban members permission.");
      }
    }
  let failure = false
  let userID = message.content.slice(7)
  if (!userID){
    if(guild.lang=='pt'){
      return message.reply("Forneçe um ID");
    }else{
      return message.reply("Please provide an ID")
    }
  }
  let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason."
    await message.guild.members.unban(userID).catch(e => {
      console.log(e)
      if(e.code == 10013 ){
        if(guild.lang=='pt'){
          message.channel.send('User desconhecido utilize um ID valido.')
        }else{
          message.channel.send('Unknown User please provide a valid ID.')
        }
      }else if(e.code == 50013 ){
        if(guild.lang=='pt'){
          message.channel.send('Permissão de banir membros em falta.')
        }else{
          message.channel.send('Missing permission BAN_MEMBERS.')
        }
      }else if(e.code == 10026 ){
        if(guild.lang=='pt'){
          message.channel.send('Esse User não se encontra banido.')
        }else{
          message.channel.send("This user isn't banned.")
        }
      }
      
      return failure = true
    })
    if(!failure){
      if(guild.lang=='pt'){
        message.reply(`${userID} foi desbanido!`)
      }else{
        message.reply(`${userID} has been unbanned!`)
      }
    
    }
  }
  };








