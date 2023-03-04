'use strict';

/**
 * @file File that deploy all commands to the client API.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const path = require('path');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { getAllFiles } = require('../util/util.js');
const { green, red } = require('colors/safe');

const envType = process.env.ENV_TYPE; /* Check if env type is "dev". */

const client = require('../util/bot');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const commands = [];

const commandFiles = getAllFiles(path.join(__dirname, '../commands'));
for (const file of commandFiles) {
    const command = new (require(`${file}`))(client);
    commands.push(command.buildCommand.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
(async () => {
    try {
        console.log(green(`Started refreshing ${commands.length} application (/) commands.`));
        await rest.put(
            (envType === 'dev' ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId)),
            { body: commands },
        ).then((result) => {
            console.log(green(`Successfully reloaded ${result.length} application (/) commands.`));
            return Promise.resolve(commands);
        });
    } catch (err) {
        console.error(red('Error refreshing application (/) commands: %s'), err);
        return Promise.reject(err);
    }
})();
