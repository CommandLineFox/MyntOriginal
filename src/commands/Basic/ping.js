const discord  = require('discord.js')
module.exports = {
    name: 'ping',
    description: "Checks the bot's response time",
    triggers: ['ping'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: async function run(message, client) {
        const m = await message.channel.send(`Pinging...`)
            .then((msg) => {
                const ping = new discord.RichEmbed()
                    .addField(`:hourglass: Response time: `, `${msg.createdTimestamp - message.createdTimestamp}ms`, false)
                    .addField(`:heartbeat: Bot ping: `, `${Math.round(client.ping)}ms`, true);
                msg.edit({ embed: ping });
            })
    }
}