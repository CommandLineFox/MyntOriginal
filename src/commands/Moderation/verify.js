const { memberRole, pendingRole } = require('../../../config.json')
module.exports = {
    name: 'verify',
    description: 'Removes the Pending and adds the Member role to a specified user',
    triggers: ['verify'],
    guildOnly: true,
    staffOnly: true,
    ownerOnly: false,
    run: function run(message, client, args) {
        let guild = message.guild;
        let channel = message.channel;
        let id;
        if (message.mentions.users.first()) {
            id = message.mentions.users.first().id;
        }
        else {
            id = args[0];
        }
        if (!id) {
            return channel.send('You need to specify a user.');
        }

        let member = guild.members.find(member => member.user.id == id);
        if (!member) {
            return channel.send('I was unable to find the specified user.');
        }

        let verifiedRole = member.roles.find(role => role.id == memberRole);
        let unverifiedRole = member.roles.find(role => role.id == pendingRole);
        
        if (!verifiedRole) {
            try {
                channel.send(member.user + ' has been verified.');
                member.addRole(memberRole, 'Verification');
                if (unverifiedRole) {
                    member.removeRole(pendingRole, "Verification");
                }
            }
            catch (err) {
                channel.send("I was unable to verify the specified user.");
            }
        }
        else {
            channel.send('The specified user has already been verified.');
        }
        if (unverifiedRole) {
            member.removeRole(pendingRole, "Verification");
        }
    }
}