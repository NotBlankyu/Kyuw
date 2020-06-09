const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    description: 'Displays bot help message.',
    usage: `${(process.env.PREFIX)}help [commandName]`,
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
    .setDescription('Hi my prefix is ``'+`${(process.env.PREFIX)}`+'`` and here you can find all the available commands right now.')
    .addField('Commands','-**ban** \n-**unban**\n-**mute**\n-**unmute**\n-**clear**\n-**ping**\n-**avatar**\n-**invite**\n-**serverinfo**\n-**kiss**\n-**play**\n-**stop**\n-**leave**\n-**leave**\n-**welcome**')
		
	
    .setFooter(`\n\nTo see more info about a specific command, please type \`${process.env.PREFIX}help <command>\` without the \`<>\``)
    .setAuthor(message.author.username, message.author.avatarURL())
        
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
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`{a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL')
    }
    if (cmd.usage2) info += `\n**Usage 2**: ${cmd.usage2}`;

    return message.channel.send(embed.setColor(process.env.COLOR).setDescription(info));
}