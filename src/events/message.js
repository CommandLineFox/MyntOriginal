const { suggestion, mail, prefix  } = require('../../config.json');
const { RichEmbed } = require('discord.js')
const colors = ["#41b8f4","#2dbf74","#c860db","#a5ce8e","#cce07b","#ffa856","#ff56a2"]

module.exports = function message(message) {
    if (message.author.bot) {
        return;
    }

    if (!message.guild && !message.author.bot) {
        generateMessage(message);
    }

    if (suggestion.includes(message.channel.id)) {
        vote(message);
    }

    if (message.content.startsWith(prefix + "logoffbackup")) {
        message.delete(0);
        client.destroy();
    }
}

function generateMessage(message){
    let client = message.client;
    let author = message.author;
    let embed = new RichEmbed()
        .setTitle(author.username)
        .setDescription(message)
        .setColor(getRandomColor())
        .setFooter("ID: " + author.id, author.avatarURL);
    if (message.attachments && message.attachments.first()) {
        embed.setImage(message.attachments.first().url);
    }
    
    let channel = client.channels.find(channel => channel.id == mail);

    if(channel){
        channel.send(embed);
    }
}

async function vote(message) {
    try {
        await message.react('✅');
        await message.react('❌');
    }
    catch (error) {
        console.log(error);
    }
}

function getRandomColor() {
    let color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}
