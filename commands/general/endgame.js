const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
const consts = requireDir("../../consts", {
	recurse: true
});
const functions = requireDir("../../functions", {
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
        let s = functions.readData();
        s.setup.game = false;
        functions.writeData(s);
        return msg.say("The game has ended.");
    }
};