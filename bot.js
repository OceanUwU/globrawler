const Commando = require('discord.js-commando');
const bot = new Commando.Client({
    owner: "106068236000329728"
});

var s=require('./data.json');
var c=require('./config.json');

bot.on('ready', () => {
  bot.user.setStatus("online"); //dnd , online , ldle, invisible
  bot.user.setActivity("Hello!"); //sets game
  console.log("Bot up."); //logs to console when online
});

bot.login(config.token);