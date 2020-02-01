module.exports = {
    name: 'replylast',
    description: 'Replies to the last received direct message',
    triggers: ['replylast'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: function run(message, client, args) {
        let channel = message.channel;
        let lastDm = args[args.length - 1];
        
        if (lastDm == undefined) {
            channel.send("I was unable to find the last DM.");
            return;
        }

        let txt = "";
        let i;

        for (i = 0; i < args.length - 1; i++) {
            txt = txt + " " + args[i];
        }
        
        if (txt.length > 0) {
            lastDm.channel.send(txt)
                .then(() => channel.send(":white_check_mark: Successfully delivered the message!"))
                .catch(() => {
                    channel.send("The user has their DMs disabled or has blocked this bot.");
                    return;
                });
        }
        else {
            channel.send("You can't send an empty message to users.");
            return;
        }
    }
}