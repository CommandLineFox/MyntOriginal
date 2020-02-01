const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { prefix, owners, staff } = require('../../../config.json');
let lastDm;

/**
 * @return {boolean}
 */

module.exports = function constructor() {
    console.log("Setting up the CommandHandler...");
    Client.prototype.commands = new Collection();
    
    const groupFiles = fs.readdirSync('./src/commands');

    try {
        groupFiles.forEach((groupFile) => {
            let groupStat = fs.statSync(`./src/commands/${groupFile}`);
            if (!groupStat.isDirectory()) {
                console.warn(`${groupFile} is not a directory`);
                return;
            }

            let commandFiles = fs.readdirSync(`./src/commands/${groupFile}`);

            commandFiles.forEach((commandFile) => {
                if (!commandFile.endsWith('.js')) {
                    console.warn(`${groupFile}/${commandFile} is not a JavaScript file`);
                    return;
                }

                let commandPath = `../../commands/${groupFile}/${commandFile}`;
                let command;

                try {
                    command = require(commandPath);
                    delete require.cache[require.resolve(commandPath)];
                }
                catch (error) {
                    console.error(`Error while creating ${groupFile}/${commandFile}!\n${error.stack}`);
                    throw new Error();
                }

                if (command.name == undefined) {
                    console.error(`${groupFile}/${commandFile} doesn't have a name`);
                    throw new Error();
                }

                if (command.triggers == undefined || command.triggers.length == 0) {
                    console.error(`${groupFile}/${commandFile} doesn't have a trigger`);
                    throw new Error();
                }

                command.triggers.forEach((trigger) => {
                    if (trigger.match(/\s/)) {
                        console.error(`${groupFile}/${commandFile}'s trigger, "${trigger}", contains whitespace`);
                        throw new Error();
                    }
                })
                Client.prototype.commands.forEach((commandArray) => {
                    if (commandArray.map((cmd) => cmd.name).includes(command.name)) {
                        console.error(`${groupFile}/${commandFile}'s name, ${name}, is already taken`);
                        throw new Error();
                    }

                    commandArray.map((cmd) => cmd.triggers).forEach((triggers) => {
                        triggers.forEach((trigger) => {
                          if (command.triggers.includes(trigger)) {
                                console.error(`${groupFile}/${commandFile}'s trigger, ${trigger}, is already taken`);                           
                                throw new Error();
                            }
                        })
                    })
                })

                command.group = groupFile;
                command.file = `${groupFile}/${commandFile}`;

                if (!Client.prototype.commands.has(groupFile)) {
                    Client.prototype.commands.set(groupFile, []);
                }
                Client.prototype.commands.get(groupFile).push(command);

                console.log(`Command loaded: ${groupFile}/${command.name} - ${command.description}`);
            })
        })
        console.log("Successfully setup the CommandHandler");
        Client.prototype.getCommand = (commandToFind) => {
            let result = undefined;

            Client.prototype.commands.forEach((commands) => {
                if (result != undefined) {
                    return;
                }
                commands.forEach((command) => {
                    if (result != undefined) {
                        return;
                    }
                    command.triggers.forEach((trigger) => {
                        if (result != undefined) {
                            return;
                        }
                        if (trigger == commandToFind) {
                            result = command;
                        }
                    })
                })
            })
            return result;
        };
    }
    catch (error) {
        console.error('Failed to setup the commandhandler\n' + error.stack);
        return true;
    }
    
    Client.prototype.__listeners.push({
        event: 'message',
        function: (message) => {
            if (message.author.bot) {
                return;
            }
            
            if (!message.guild) {
                lastDm = message;
                return;
            }

            if (message.content.startsWith(prefix)) {
                const client = message.client;
                const args = message.content.slice(prefix.length).split(/ +/);
                const trigger = args.shift().toLowerCase();
                
                if (trigger === "replylast") {
                    args[args.length] = lastDm;
                }

                Client.prototype.commands.forEach((commands) => {
                    commands.forEach((command) => {
                        command.triggers.forEach((commandTrigger) => {
                            if (commandTrigger == trigger) {
                                runCommand(command, message, client, args);
                            }
                        })
                    })
                });
            }
        }
    });
}

function runCommand(command, message, client, argument) {
    if (command.ownerOnly) {
        if (!owners.includes(message.author.id)) {
            message.reply("you don't own me.");
            console.info(`${command.name} command used by: ${message.author.tag} (${message.author.id})`);
            return;
        }
    }
    let isStaff;
    staff.forEach((staffrole) => {
        if (message.member.roles.find(role => role.id == staffrole))
            isStaff = true;
    })

    if (command.staffOnly) {  
        if (!isStaff && !owners.includes(message.author.id)) {
            message.channel.send("You don't have permission to run this command");
            console.info(`${command.name} command used by: ${message.author.tag} (${message.author.id})`);
            return;
        }
    }

    if (message.guild) {
        if (command.botPerm && !message.guild.me.hasPermission(command.botPerm)) {
            message.channel.send("I don't have permission to run this command.");
            return;
        }
        
        if (command.userPerm && !message.member.hasPermission(command.userPerm)) {
            message.channel.send("You don't have permission to run this command.");
            return;
        }
    }

    try {
        command.run(message, client, argument);
    }
    catch (error) {
        message.channel.send(`Command failed to run: ${error}`);
        console.error(` Command, ${command.name}, errored!\n${error.stack}`);
    }
}