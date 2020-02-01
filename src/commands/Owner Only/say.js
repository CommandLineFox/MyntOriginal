module.exports = {
    name: 'say',
    description: 'Repeats the message written in the command',
    triggers: ['say'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: true,
    run: function run(message, client, args) {
        if (!args[0]) {
            message.delete(0);
            return;
        }
        
        let channel = message.channel;
        let txt = args[0];
        let i;
        
        for (i = 1; i < args.length; i++) {
            txt = txt + " " + args[i];
        }

        channel.send(txt);
        message.delete(0);
    }
}