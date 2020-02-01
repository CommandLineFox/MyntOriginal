const discord  = require('discord.js')
module.exports = {
    name: 'ban',
    description: "Bans a specified user from the server",
    triggers: ['ban'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: async function run(message, client, argument) {
        const user = findUser(message, argument);
        const reason = createReason(argument);

        
    }
}

function createReason(argument) {
    let reason = "";
    let i;
    for (i = 1; i < argument.length; i++) {
        reason = reason + " " + args[i];
    }
    return reason;
}

function findUser(message, args) {
    const guild = message.guild
    let id
    
    if (message.mentions.users.first()) {
        id = message.mentions.users.first().id
    }
    else {
        id = args[0] 
    }
    return guild.members.find(member => member.user.id == id).user
}