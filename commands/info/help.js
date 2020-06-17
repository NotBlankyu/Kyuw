const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

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

function helpMSG(client, message) {
    const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Help Menu')
        .setThumbnail(client.user.avatarURL())
    .setDescription('Hi my default prefix is ``'+`${(process.env.PREFIX)}`+'`` and here you can find all the available commands right now. If you want see the custom prefix use ``prefix`` or just mention me.')
    .addFields(
		{ name: 'Moderation', value: '``ban``, ``unban``, ``mute``, ``unmute``, ``clear``',  },
		{ name: 'Configuration', value: '``welcome``, ``prefix``',inline: true },
    { name: 'Information', value: '``serverinfo``, ``ping``, ``invite``, ``avatar``',inline: true  },
    { name: 'Fun', value: '``kiss``, ``punch``',inline: true},
  	{ name: 'Music', value: '``play``, ``stop``, ``leave``',inline: true },
    { name: 'Economy', value: '``balance``, ``daily``',inline: true })
    
    .setFooter(`\n\nTo see more info about a specific command, please use \`help <command>\` without the \`<>\``)
    .setAuthor(message.author.username, message.author.avatarURL());
        
    message.channel.send(embed);
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor('#ff0000').setDescription(info));
    }

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