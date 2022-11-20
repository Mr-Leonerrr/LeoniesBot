"use strict";

/**
 * @file File that contains the ready event.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const client = require("../util/bot");
const { green, yellow, cyan } = require("colors/safe");
const { ActivityType } = require("discord.js");

module.exports.data = {
    name: "ready",
    once: true
};

module.exports.run = async () => {
    const activities = [
        `${client.guilds.cache.size} Guilds`,
        `${client.users.cache.size} Users`,
        `/help | ${client.guilds.cache.size} Guilds`
    ];

    // Set the Bot status
    setInterval(() => {
        const index = Math.floor(Math.random() * activities.length);
        client.user.setPresence({
            activities: [{
                name: activities[index],
                type: ActivityType.Listening
            }],
            status: "idle"
        });
    }, 8000);

    console.log("");
    console.log(
        green("                                                     Leoner")
    );
    console.log("");
    console.log("");
    console.log(
        yellow(
            "               + ================================Commands========================================== +"
        )
    );
    console.log(
        cyan(
            `                                [i] :: ${client.config.prefix}help                :: Displays commands.                   `
        )
    );
    console.log(
        cyan(
            `                                [i] :: ${client.config.prefix}ping                :: Displays bots ping.                  `
        )
    );
    console.log(
        yellow(
            "               + ================================Info========================================== +"
        )
    );
    console.log(
        cyan(
            "                       Author   [i] :: By [Leoner#1604]     :: © 2022 Development                   "
        )
    );
    console.log(
        cyan(
            "                       Bot info [i] :: Status               :: ✅ Online                           "
        )
    );
    console.log(
        cyan(
            `                       Users    [i] ::                      :: ${client.users.cache.size}  Users   `
        )
    );
    console.log(
        cyan(
            `                       Guilds   [i] ::                      :: ${client.guilds.cache.size} Guilds  `
        )
    );
    console.log(
        cyan(
            `                       Count    [i] ::                      :: ${client.commands.size} Commands  `
        )
    );
    console.log(
        yellow(
            "               + ================================================================================== +"
        )
    );

    console.log("");

    console.log("Press [CTRL + C] to stop the Terminal ...");
};