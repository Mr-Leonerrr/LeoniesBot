require("dotenv").config();
const { Client, Collection } = require("discord.js");

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
        this.invite = this.config.invite;
    }

    async init() {
        this.login(process.env.BOT_TOKEN).then(() => this.isReady());

        require("../functions/load-commands");
        require("../functions/load-events");
    }
}

module.exports.Leonies = Leonies;