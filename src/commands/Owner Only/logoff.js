module.exports = {
    name: 'logoff',
    description: 'Shuts the bot down, bot owner only',
    triggers: ['logoff'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: true,
    run: async function run(message, client) {
        await message.delete(100);
        await client.destroy();
    }
}