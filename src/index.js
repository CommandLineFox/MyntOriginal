const { Client } = require('discord.js');
const { token } = require('../config.json');
const commandHandler = require('./core/handlers/commandHandler.js');
const eventHandler = require('.//core/handlers/eventHandler.js');

const client = new Client;

if (eventHandler() || commandHandler()) {
    return;
}

client.__listeners.forEach(listener => client.on(listener.event, listener.function));
client.__listeners = undefined;
delete client.__listeners;

client.on("ready", () => {
    console.log(`Client logged in as ${client.user.tag}`);
    client.user.setActivity("with Alex", { type: "PLAYING" });
})

client.login(token);