module.exports = {
    name: 'eval',
    description: 'Executes given code on discord',
    triggers: ['eval'],
    guildOnly: true,
    staffOnly: false,
    ownerOnly: true,
    run: function run(message, client, args) {
        const channel = message.channel;

        const clean = text => {
            if(typeof text == "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

        try {
            let eeval = eval(args.join(" "));
        
            if(!typeof eeval != "string")
                eeval = require("util").inspect(eeval);
        
            channel.send(clean(eeval), {code:"xl"});
        }
        catch (err) {
            channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}