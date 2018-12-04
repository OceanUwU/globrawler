const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
const consts = requireDir("../../consts", {
	recurse: true
});
const functions = requireDir("../../functions", {
	recurse: true
});
var defaultdata = JSON.parse(fs.readFileSync("defaultdata.json"));

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "startgame",
            aliases:["start"],
            group: "general",
            memberName: "startgame",
            description: "Starts a game.",
            examples: ["startgame 1 10"],
            clientPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true,
            args: [
                {
                    key: "ticks",
                    prompt: "How many ticks until the game is ended automatically?",
                    type: "integer",
                    min: 1,
                    validate: n => {
                        if (Number.isInteger(Number(n))) return true;
                        return "Enter an integer.";
                    }
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run (msg, {ticks}) {
        console.log(this.client.options.owner)
        let s = functions.readData();
        s = defaultdata;
        s.setup = {"tick":0,"ticksLeft":ticks,"game":true};
        functions.writeData(s);
        for (let leader of msg.guild.roles.get(consts.config.leaderRole).members) {
            leader[1].removeRole(consts.config.leaderRole);
        }
        msg.delete();
        return msg.say("Game started. " + ticks + " ticks left until the game ends.");
    }
};