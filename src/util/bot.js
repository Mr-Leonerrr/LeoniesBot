const { Leonies } = require("../client/Leonies");
const client = new Leonies({ intents: 5839 });
module.exports = client;

client.init().then(() => client.isReady());