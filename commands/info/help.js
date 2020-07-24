const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const Guild = require('../../models/guild');

module.exports = {
    name: 'help',
    aliases: ['ajuda','h'],
    category: 'info',
    description: 'Displays bot help message.',
    usage: `help [commandName]`,
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return helpMSG(client, message);
        }
    }
}

async function helpMSG(client, message) {
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
        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Menu de ajuda')
        .setThumbnail(client.user.avatarURL())
    .setDescription('Olá o meu prefixo normal é ``'+`${(process.env.PREFIX)}`+'`` e aqui consegues encontrar todos os comandos disponiveis. Se queres ver qual o prefix customizado usa o comando ``prefix`` ou menciona-me.')
    .addFields(
		{ name: 'Moderação', value: '``ban``, ``unban``, ``mute``, ``unmute``, ``clear``, `announce`, `warn`, `warns`',  },
		{ name: 'Configuração', value: '``welcome``, ``prefix``, ``language``',inline: false },
    { name: 'Informação', value: '``serverinfo``, `userinfo`, ``botinfo``, ``ping``, ``invite``, ``avatar``',inline: false  },
    { name: 'Diversão', value: '``kiss``, ``punch``, ``dice``',inline: false},
    { name: 'Economia', value: '``balance``, ``daily``, ``give``, ``steal``, ``vote``',inline: false })
    
    .setFooter(`\n\nPara mais informaçao sobre um comando especifico, usa \`help <command>\` sem o \`<>\``)
    .setAuthor(message.author.username, message.author.avatarURL());
        
    message.channel.send(embed);
      }else{
        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Help Menu')
        .setThumbnail(client.user.avatarURL())
    .setDescription('Hi my default prefix is ``'+`${(process.env.PREFIX)}`+'`` and here you can find all the available commands right now. If you want to see the custom prefix use ``prefix`` or just mention me.')
    .addFields(
		{ name: 'Moderation', value: '``ban``, ``unban``, ``mute``, ``unmute``, ``clear``, `announce`, `warn`, `warns`',  },
		{ name: 'Configuration', value: '``welcome``, ``prefix``, ``language``',inline: false },
    { name: 'Information', value: '``serverinfo``, `userinfo`, ``botinfo``, ``ping``, ``invite``, ``avatar``',inline: false  },
    { name: 'Fun', value: '``kiss``, ``punch``, ``dice``',inline: false},
    { name: 'Economy', value: '``balance``, ``daily``, ``give``, ``steal``, ``vote``',inline: false })
    
    .setFooter(`\n\nTo see more info about a specific command, please use \`help <command>\` without the \`<>\``)
    .setAuthor(message.author.username, message.author.avatarURL());
        
    message.channel.send(embed);
      }
    
}

async function getCMD(client, message, input) {
    const embed = new MessageEmbed()
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
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    if(guild.lang=='pt'){
        let info = `Não foi encontrada informação sobre o comando **${input.toLowerCase()}**`;

        if (!cmd) {
         return message.channel.send(embed.setColor('#ff0000').setDescription(info));
        }
      }else{
            let info = `No information found for command **${input.toLowerCase()}**`;

            if (!cmd) {
             return message.channel.send(embed.setColor('#ff0000').setDescription(info));
            }
      }
      if(guild.lang=='pt'){
        if (cmd.name) info = `**Nome do comando**: ${cmd.name}`
    if (cmd.aliases) info += `\n**Nomes alternativos**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Descrição**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Como usar**: ${cmd.usage}`;
        embed.setFooter('<> = OBRIGATÓRIO | [] = OPCIONAL')
    }
    if (cmd.usage2) info += `\n**Usage 2**: ${cmd.usage2}`;

    return message.channel.send(embed.setColor(process.env.COLOR).setDescription(info));
      }else{
        if (cmd.name) info = `**Command Name**: ${cmd.name}`
        if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
        if (cmd.description) info += `\n**Description**: ${cmd.description}`;
        if (cmd.usage) {
            info += `\n**Usage**: ${cmd.usage}`;
            embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
        }
        if (cmd.usage2) info += `\n**Usage 2**: ${cmd.usage2}`;
    
        return message.channel.send(embed.setColor(process.env.COLOR).setDescription(info));
      }

    
}