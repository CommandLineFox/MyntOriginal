const discord  = require('discord.js');
const { owners } = require('../../../config.json');

module.exports = {
	name: 'help',
	description: 'Lists all of my commands or info about a specific command',
    triggers: ['commands', 'help'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: function run(message, client) {
        const author = message.author;
        const channel = message.channel;
        let embed = new discord.RichEmbed()
            .setTitle("Here's the list of all my commands")
            .setColor("ff0000")
            .setFooter("Requested by "+ author.username, author.avatarURL);
        client.commands.forEach((commands, group) => {
            if (group != "Owner Only") {
                embed.addField(group, commands.map((command) => `\`${command.name}\` -> ${command.description}`).join('\n'));
            }
            else if (group == "Owner Only" && owners.includes(message.author.id)) {
                embed.addField(group, commands.map((command) => `\`${command.name}\` -> ${command.description}`).join('\n'));
            }
        })
        channel.send(embed);
    }
}