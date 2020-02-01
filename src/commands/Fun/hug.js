module.exports = {
    name: 'hug',
    description: "Hug a user",
    triggers: ['hug'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: false,
    run: function run(message, client, args) {
        let channel = message.channel;
        let user = findUser(message, args);
        channel.send(user + " got a big, big hug from " + message.author.username);
    }
}

function findUser(message, args) {
    let guild = message.guild;
    let id;
    
    if (message.mentions.users.first()) {
        id = message.mentions.users.first().id;
    }
    else if (!args[0]) {
        id = message.author.id;
    }
    else {
        id = args[0];
    }
    return guild.members.find(member => member.user.id == id).user;
}