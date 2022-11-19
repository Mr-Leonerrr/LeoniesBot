"use strict";

const path = require("path");

// Configs
const client = require("../util/bot");
const { getAllFiles } = require("../util/util.js");
const { cyan, green, red } = require("colors/safe");

/* Load events. */
console.log(cyan("Loading Events . . ."));
/* Get an array of all files in the events folder. */
const events = getAllFiles(path.join(__dirname, "../events"));
if (events.length <= 0) {
    console.log(red("NO EVENTS FOUND"));
} else {
    /* Iterate every file in the array and require it. Also register every event. */
    events.forEach((file, i) => {
        const event = require(`${file}`);
        console.log(
            green(`${++i}. Event: ${file.split("\\").pop().split("/").pop()} loaded!`)
        );
        if (event.data.once) {
            client.once(event.data.name, (...args) =>
                event.run(...args).catch((err) => console.error(red(err)))
            );
        } else {
            client.on(event.data.name, (...args) =>
                event.run(...args).catch((err) => console.error(red(err)))
            );
        }
    });
}