const Discord = require("discord.js");

module.exports = {
  
  name: 'chat',
    category: 'TestGround',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `${(process.env.PREFIX)}ping`,
  
  run : async (vary, message, args) => {

    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Permissão `Gerenciar canais` não encontrada em seu cargo!")
    let mensg = args.join(" ");
    if(!mensg)
    if(!mensg)
    return message.channel.send({embed: {description: `:what: Utilize **.chat off** ou **.chat on**`}})
    if(args[0] == "OFF" || args[0] == "off"){
        let role = message.guild.roles.cache.find(r => r.name === "Member");
        message.channel.createOverwrite(role, {SEND_MESSAGES: false, 
                                               READ_MESSAGES: true});
        let embed = new Discord.MessageEmbed()
                                .setDescription('Done')
                                .setColor('#d90f0f')
                                .setFooter(`Autor: ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())

                                message.channel.send({embed: embed});
                                return;
    }
    if(args[0] == "ON" || args[0] == "on"){
        let role = message.guild.roles.cache.find(r => r.name === "Member");
        message.channel.createOverwrite(role, {SEND_MESSAGES: true,
                                               READ_MESSAGES: true});
        let embed = new Discord.MessageEmbed()
                                .setDescription('Done')
                                .setColor('#0ac90a')
                                .setFooter(`Autor: ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())

                                message.channel.send({embed: embed});
                                return;
    }
    message.reply("Use: `.chat <on/off>`")

    
    
 }

};
