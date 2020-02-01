module.exports = {
    name: 'send',
    description: 'Sends a message to a specified channel',
    triggers: ['send'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: true,
    run: function run(message, client, args) {
        let channel = message.channel;
        let id;

        if (message.mentions.channels.first()) {
            id = message.mentions.channels.first().id;
        }
        else {
            id = args[0]
        }
        let txt = args[1]
        if (!txt) {
            message.delete(0);
            return;
        }
        let i
        for (i = 2; i < args.length; i++) {
            txt = txt + " " + args[i];
        }

        if (!id) {
            return channel.send("You need to specify a channel");
        }
        
        if (txt.length > 0) {
            let ch = client.channels.get(id);
            wait(txt, channel, ch);
        }
        else {
            channel.send("You can't send an empty message in chats");
            return;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait(txt, current, channel) {
    channel.startTyping();
    ms = txt.length * 100;
    await sleep(ms);
    channel.send(txt)
        .then(() => current.send(":white_check_mark: Successfully delivered the message!"))
        .catch(() => {
            current.send("I couldn't send the message in the specified channel.")
            return
        });
    channel.stopTyping();
}