module.exports = {
    name: 'replyto',
    description: 'Sends a direct message to a specified user',
    triggers: ['replyto'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: function run(message, client, args) {
        let channel = message.channel;
        let id;

        if (message.mentions.users.first()) {
            id = message.mentions.users.first().id;
        }
        else {
            id = args[0];
        }

        let txt = "";
        let i;
        
        for (i = 1; i < args.length; i++) {
            txt = txt + " " + args[i];
        }
        
        if (!id) {
            return channel.send("You need to specify a user.");
        }
        
        if (txt.length > 0) {
            client.users.get(id).send(txt)
                .then(() => channel.send(":white_check_mark: Successfully delivered the message!"))
                .catch(() => {
                    channel.send("The user has their DMs disabled or has blocked this bot.");
                    return
                })
        }
        else {
            channel.send("You can't send an empty message to users.")
            return
        }
    }
}