const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  aliases: ['mutar'],
  category: "Moderation",
  description: "To mute someone.",
  usage: `mute <@user> <time>`,

  run: async (client, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.reply("Sorry, you don't have the permission MUTE_MEMBERS to use this!");
    
    let member = message.mentions.members.first();
    let guild = message.guild;
    let role = guild.roles.cache.find(role => role.name == "[Muted]");
    if (!member)
      return message.reply("Please mention a valid member of this server");

    if (!role) {
      try {
        role = await guild.roles.create({
          data: {
            name: "[Muted]",
            permissions: []
          }
        }).catch(err => {
          return console.log(err)
        })
        message.guild.channels.cache.forEach(async channel => {
          await channel.createOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          }).catch(err => {
          return
        })
        })
      } catch (e){
          
      }
    }
    let success = true;
    await member.roles
      .add(role)
      .catch(error =>{
       message.channel.send(
          `Sorry ${message.author} I couldn't mute because of : Missing permission to create role`
        )
        success = false;
        }
      );
    let mutetime = args[1];
    
    if(success){
      if (!mutetime) return message.reply("You didnt specify the time");
      message.reply(`Successfully muted <@${member.id}> for ${mutetime}`);
      setTimeout(function() {
      member.roles.remove(role.id);
    }, ms(mutetime));
    } 

    
  }
};
