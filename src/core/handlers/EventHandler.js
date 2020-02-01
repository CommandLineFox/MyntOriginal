const fs = require('fs');
const { Client } = require('discord.js');

/**
 * @return {boolean}
 */
module.exports = function constructor() {
    console.log('Setting up EventHandler...');
    let listeners = [];
    Client.prototype.__listeners = listeners;
    
    let eventFiles = fs.readdirSync('./src/events');
    try {
        eventFiles.forEach((eventFile) => {
            let eventStat = fs.statSync(`./src/events/${eventFile}`)
            if (!eventStat.isFile()) {
                console.warn(`${eventFile} is not a file`);
                return;
            }

            if (!eventFile.endsWith('.js')) {
                console.warn(`${eventFile} is not a javascript file`);
                return;
            }

            let eventPath = `../../events/${eventFile}`;
            let eventName = eventFile.substring(0, eventFile.length - 3);
            let event;

            try {
                event = require(eventPath);
                delete require.cache[require.resolve(eventPath)];
            }
            catch (error) {
                console.error("Error while creating event!\n" + error.stack);
                throw new Error();
            }

            Client.prototype.__listeners.push({
                event: eventName, function: (...args) => {
                    try {
                        event(...args);
                    }
                    catch (error) {
                        console.error(`${eventName} threw an error!\n${error.stack}`);
                    }
                }
            });
            console.debug(`Event loaded: ${eventName}`);
        })
    }
    catch (error) {
        console.error('Failed to setup the EventHandler\n' + error.stack);
        return true;
    }
    console.log('Successfully setup the EventHandler');
}