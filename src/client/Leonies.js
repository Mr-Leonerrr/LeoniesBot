"use strict";

/**
 * @file File that defines the client of the bot.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

require("dotenv").config();
const path = require("path");
const { Client, Collection } = require("discord.js");

/**
 * The main client class.
 * @class
 * @extends {Client}
 * @type {import("../types/common/client").Leonies}
 */
class Leonies extends Client {
    /**
     * Leonies client constructor
     * @param {import("discord.js").ClientOptions} options The client options
     * @example new Leonies({ intents: 5839 })
     */
    constructor(options) {
        super(options);
        this.config = require("../util/config.json");
        this.commands = new Collection();
        this.invite = this.config.discord;
    }

    async init() {
        this.login(process.env.BOT_TOKEN).then(() => this.isReady());

        require("../functions/load-commands");
        require("../functions/load-events");
    }

    /**
     * Set command to the client.
     * @param {string} commandPath The path to the commands folder.
     * @param {string} commandName The name of the command.
     * @returns {string|false}
     */
    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.commands.set(props.name, props);
            return false;
        } catch (e) {
            return `Error [i] :: Unable to load command ${commandName}: ${e}`;
        }
    }
}

module.exports.Leonies = Leonies;