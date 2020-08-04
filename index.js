const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours()+1);
  console.log(`Ping received at ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online
const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const DBL = require("dblapi.js");
const nodemon = require('nodemon');
const { registerFont } = require('canvas');
registerFont('./fonts/Recursive/recursive.ttf', { family: 'recursive' });
registerFont('./fonts/Open_Sans/OpenSans-SemiBold.ttf', { family: 'opensans' });
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');

config({
    path: `${__dirname}/.env`
});

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

client.mongoose.init();
client.login(process.env.TOKEN);
const dbl = new DBL(process.env.dbltoken, client);