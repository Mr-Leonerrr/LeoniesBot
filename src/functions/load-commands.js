"use strict";

const path = require("path");

// Configs
const client = require("../util/bot");
const { getAllFiles } = require("../util/util.js");
const { cyan, green, red } = require("colors/safe");

/* Load commands. */
console.log(cyan("Loading Commands . . ."));
/* Get an array of all files in the commands folder. */
const commands = getAllFiles(path.join(__dirname, "../commands"));
if (commands.length <= 0) {
    console.log(red("NO COMMANDS FOUND"));
} else {
    /* Iterate every file in the array and require it. Also map it to the commands collection. */
    commands.forEach((file, i) => {
        const props = require(`${file}`);
        console.log(
            green(
                `${++i}. Command: ${file.split("\\").pop().split("/").pop()} loaded!`
            )
        );
        client.commands.set(props.data.name, props);
    });
}