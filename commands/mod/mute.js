const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  category: "Moderation",
  description: "To mute someone.",
  usage: `mute <@user> <time>`,

  run: async (client, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    let guild = message.guild;
    let role = guild.roles.cache.find(role => role.name == "[Muted]");
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable) return message.reply("I cannot mute this user!");

    if (!role) {
      try {
        role = await guild.roles.create({
          data: {
            name: "[Muted]",
            permissions: []
          }
        });
        message.guild.channels.cache.forEach(async channel => {
          await channel.createOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    await member.roles
      .add(role)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't mute because of : ${error}`
        )
      );
    let mutetime = args[1];
    if (!mutetime) return message.reply("You didnt specify the time");

    message.reply(`Successfully muted <@${member.id}> for ${mutetime}`);

    setTimeout(function() {
      member.roles.remove(role.id);
    }, ms(mutetime));
  }
};
