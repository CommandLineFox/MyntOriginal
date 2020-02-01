//const { RichEmbed } = require("discord.js");
//const { emojis: { success, error } } = require('../../core/utils/constants');

module.exports = {
    name: "Userinfo",
    description: "Gives informationa bout a specified user",
    triggers: ['memberinfo', 'mi', 'userinfo', 'ui', 'whois'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: async function run(message, client) {
        /*let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);


        const treatAsUTC = (date) => {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        }

        const daysBetween = (startDate, endDate) => {
            var millisecondsPerDay = 24 * 60 * 60 * 1000;
            return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
        }
        const nMemberLM = () => {
            var maxLength = 30;
            let lastMessage = message.member.lastMessage.toString() || "Last message not found";
            var nm = lastMessage.substr(0, maxLength) + "...";
            return nm;
        }
        const argument = args.join(" ");
        const userRegex = /^(?:<@!?(\d{17,20})>|(\d{17,20})|(.{2,32}?#\d{4}))$/;
        let member = null;
            if (!argument) {
            return channel.send({embed: new RichEmbed()
                .setColor("8c9392")
                .setTitle(`${message.author.username} User Information`)
                .setThumbnail(message.author.avatarURL)
                .addField(`ID`, `${message.author.id}`, true)
                .addField(`Nickname`, `${message.member.nickname || "None"}`, true)
                .addField(`Highest role`, `${message.member.highestRole}`, true)
                .addField(`Last Message`, `${nMemberLM()}`, true)
                .addField(`Rich Presence`, `${message.author.presence.game || "None"}`, true)
                .addField(`Status`, `${message.member.presence.status.toUpperCase()}`, true)
                .addField(`Bot?`, `${message.author.bot ? success : error}`, true)
                .addField(`Avatar`, `[Avatar URL](${message.author.avatarURL})`, true)
                .addField(`Account created`, `${message.author.createdAt} (${Math.round(daysBetween(message.author.createdAt, Date.now()))} Days ago)`)
                .addField(`Joined server`, `${message.member.joinedAt} (${Math.round(daysBetween(message.member.joinedAt, Date.now()))} Days ago)`)
                .setColor(getRandomColor())
                .setFooter("Requested by "+ author.username, author.avatarURL)
            });
        }
        if (userRegex.test(argument)) {
            const userParts = argument.match(userRegex);
            const id = userParts[1] || userParts[2];
            const tag = userParts[2];

            if (id) {
                member = guild.members.get(id);
            } else {
                member = guild.members.find(u => u.user.tag === args.join(" "));
            }
        } else {
            member = guild.members.find(u => u.user.username === argument);
        }

        if (!member) {
            channel.send(`User \'${argument}\' not found.`);
            return;
        }
        const memberLM = () => {
            var maxLength = 30;
            let lastMessage;
            if([undefined, null].includes(member.lastMessage)) {
                lastMessage = "Last message not found";
            } else {
                lastMessage = member.lastMessage.toString();
            }
            var m = lastMessage.substr(0, maxLength) + "...";
            return m;
        }
        return channel.send({embed: new RichEmbed()
            .setColor("8c9392")
            .setTitle(`${member.user.username} User Information`)
            .setThumbnail(member.user.avatarURL)
            .addField(`Discriminator`, `${member.user.discriminator}`, true)
            .addField(`ID`, `${member.id}`, true)
            .addField(`Nickname`, `${member.nickname || "None"}`, true)
            .addField(`Highest role`, `${member.highestRole}`, true)
            .addField(`Last Message`, `${memberLM()}`, true)
            .addField(`Rich Presence`, `${member.presence.game || "None"}`, true)
            .addField(`Status`, `${member.presence.status.toUpperCase()}`, true)
            .addField(`Bot?`, `${member.user.bot ? success : error}`, true)
            .addField(`Avatar`, `[Avatar URL](${member.user.avatarURL})`, true)
            .addField(`Account created`, `${member.user.createdAt} (${Math.round(daysBetween(member.user.createdAt, Date.now()))} Days ago)`)
            .addField(`Joined server`, `${member.joinedAt} (${Math.round(daysBetween(member.joinedAt, Date.now()))} Days ago)`)
        });*/
    }
}
/*function getRandomColor() {
    let colors = ['#41b8f4','#2dbf74','#c860db','#a5ce8e','#cce07b','#ffa856','#ff56a2']
    let color = colors[Math.floor(Math.random() * colors.length)]
    return color
}*/