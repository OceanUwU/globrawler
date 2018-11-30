var s = require("../../data.json");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
const consts = requireDir("../../consts", {
	recurse: true
});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "endgame",
            aliases:["end","stop"],
            group: "general",
            memberName: "endgame",
            description: "Stops the game.",
            examples: ["startgame"],
            clientPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true,
            ownerOnly: true
        });
    }

    run (msg, {tickLength, ticks}) {
      s.setup.ticksLeft = 1;
      return msg.say("The game will be ended after the next tick.");
    }
};