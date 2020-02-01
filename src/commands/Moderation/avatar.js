const discord  = require('discord.js')
module.exports = {
    name: 'avatar',
    description: "Displays a user's profile picture",
    triggers: ['avatar', 'av'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: function run(message, client, args) {
        let channel = message.channel;
        let author = message.author;
        let user = findUser(message, args);
        let embed = new discord.RichEmbed()
            .setTitle(user.tag + "'s avatar:")
            .setImage(user.displayAvatarURL)
            .setColor(getRandomColor())
            .setFooter("Requested by "+ author.username, author.avatarURL);
        channel.send(embed);
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

function getRandomColor() {
    let colors = ['#41b8f4','#2dbf74','#c860db','#a5ce8e','#cce07b','#ffa856','#ff56a2'];
    let color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}