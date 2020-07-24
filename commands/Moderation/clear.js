const Discord = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Cleans up to 99 messages",
  usage: `clear <1-99>`,

  run: async (client, message, args) => {
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
    if (!message.member.permissions.has("MANAGE_MESSAGES")){
      if(guild.lang=='pt'){
        return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de gerenciar mensagens.");
      }else{
        return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have the manage messages permission.");
      }
    }
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 1 || deleteCount > 99){
      if(guild.lang=='pt'){
        return message.reply("Especifica o numero de mensagens a ser deletada.(1-99)");
      }else{
        return message.reply("Specify a number of messages to be deleted.(1-99)");
      }
    }
      

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1
    });
    if(guild.lang=='pt'){
      message.channel.bulkDelete(fetched)
      .catch(error =>{
      return message.channel.send(`Não foi possivel deletar devido a : ${error}`)
      }
      ).then(
      message.channel
      .send(`${args[0]} mensagens deletadas do chat`)
      .then(msg => {
        msg.delete({ timeout: 2000 });
      })
      .catch(error =>{
        console.log(`Não foi possivel deletar devido a : ${error}`)
        }
      ))
    }else{
      message.channel.bulkDelete(fetched)
      .catch(error =>{
      return message.channel.send(`It wasn't possible to delete because : ${error}`)
      }
      ).then(
      message.channel
      .send(`${args[0]} messages deleted from the chat`)
      .then(msg => {
        msg.delete({ timeout: 2000 });
      })
      .catch(error =>{
        console.log(`It wasn't possible to delete because : ${error}`)
        }
      ))
    }
   
  }
};
