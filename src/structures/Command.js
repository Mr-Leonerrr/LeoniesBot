"use strict";

/**
 * @file File that contains the Command class used to create commands.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const { CommandInteraction } = require("discord.js");
const client = require("../util/bot");

/**
 * Base class for commands.
 * @class
 * @type {import("../types/common/interactions").CommandInterface}
 */
class Command {
    /**
     * The constructor of the Command class.
     * @param {client} client The client of the bot.
     * @param {import("../types/common/interactions").CommandInterface} data
     */
    constructor(client, data) {
        this.client = client;
        this.name = data.name;
        this.description = data.description;
        this.group = data.group;
        this.permissions = data.permissions;
        this.config = {
            guildOnly: data.config?.guildOnly,
            ownerOnly: data.config?.ownerOnly,
            disabled: data.config?.disabled,
            cooldown: data.config?.cooldown
        };
        this.buildCommand = data.buildCommand;
    }

    /**
     * The run method to be overwritten in actual commands.
     * @param {CommandInteraction} interaction
     * @returns {void|Promise<void>}
     */
    async run(interaction) {
        throw new Error(`${this.constructor.name} doesn't have a run() method.`);
    }
}

module.exports = Command;