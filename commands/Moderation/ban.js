const Discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "Moderation",
  description: "Bans someone.",
  usage: `ban <@user>`,

  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable) return message.reply("I can't ban this user!(Make sure i have the right permissions to do it)");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason";

    await member
      .ban(reason)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't ban because of : ${error}`
        )
      );
    message.reply(`${member.user.tag} has been banned because: ${reason}`);
  }
};
