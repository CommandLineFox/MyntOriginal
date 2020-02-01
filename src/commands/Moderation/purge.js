module.exports = {
    name: 'purge',
    description: "Deletes a specified amount of messages",
    triggers: ['purge', 'prune'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    userPerm: 'MANAGE_MESSAGES',
    botPerm: 'MANAGE_MESSAGES',
    run: function run(message, client, args) {
        let channel = message.channel;
        let amount = parseInt(args[0]) + 1;
		if (amount > 1001) {
            message.delete(0);
            respond(channel, "You can't delete over a 1000 messages.");
        }
        if (amount < 1) {
            message.delete(0);
            respond(channel, "You can't delete a negative amount of messages.");
        }
        message.channel.bulkDelete(amount, true)
            .then(() => {
                let end = " messages";
                if (amount == 1) {
                    end = " message";
                }
                respond(channel, "Deleted " + (amount - 1) + end);
            })
            .catch(() => {
                message.delete(0);
                respond(channel, "Failed to delete messages.");
            });
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function respond(channel, message) {
    channel.send(message);
    await sleep(10000);
}