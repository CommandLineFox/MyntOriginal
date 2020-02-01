module.exports = {
    name: 'status',
    description: 'Updates the status of the bot',
    triggers: ['status'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: true,
    run: function run(message, client, args) {
        if (!args[0] || !valid(args[0]) || !args[1]) {
            message.delete(0);
            return;
        }

        let channel = message.channel;
        let type = args[0];
        let txt = args[1];
        let i;
        
        for (i = 2; i < args.length; i++) {
            txt = txt + " " + args[i];
        }

        client.user.setActivity(txt, { type: type });
        channel.send("Status successfully updated");
    }
}

function valid(type) {
    if (type == "WATCHING" || type == "PLAYING" || type == "STREAMING" || type == "LISTENING") {
        return true;
    }
}