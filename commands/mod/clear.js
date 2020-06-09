const Discord = require("discord.js");

module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Cleans up to 99 messages",
  usage: `${process.env.PREFIX}clear <1-99>`,

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 1 || deleteCount > 99)
      return message.reply("Specify a number of messages to be deleted.(1-99)");

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1
    });
    message.channel.bulkDelete(fetched);
    message.channel
      .send(`${args[0]} messages deleted from the chat`)
      .then(msg => {
        msg.delete({ timeout: 2000 });
      })
      .catch(error =>
        console.log(`It wasn't possible to delete because : ${error}`)
      );
  }
};
