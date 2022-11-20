"use strict";

/**
 * @file File that load all commands to the client.
 * @author Leonardo Natera
 * @since 1.0.0
 * @version 1.0.0
 */

const fs = require("fs");
const { cyan, green, red, yellow } = require("colors/safe");
const client = require("../util/bot");

/* Load commands. */
console.log(cyan("Loading Commands . . ."));
/* Get an array of all files in the commands folder. */
const directories = fs.readdirSync("./src/commands/");
if (directories.length <= 0) {
    console.log(red("NO COMMANDS FOUND"));
} else {
    console.log(cyan(`Loading a total of ${directories.length} categories.`));
    for (const dir of directories) {
        console.log(yellow(`+ ========== LOADING COMMANDS FROM [${dir.toLocaleUpperCase()}] ========== +`));
        const commands = fs.readdirSync("./src/commands/" + dir + "/");
        for (const cmd1 of commands.filter((cmd) => cmd.split(".").pop() === "js")) {
            const response = client.loadCommand("./commands/" + dir, cmd1);
            response ? console.log(red(response)) : console.log(green(`Command [i] :: ${cmd1}         :: ✅ Loaded`));
        }
    }
}