var s = require("../../data.json");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
const consts = requireDir("../../consts", {
	recurse: true
});
var defaultdata = JSON.parse(fs.readFileSync("defaultdata.json", "utf8", function(err,data) {
    if (err) {
        return console.log(err)
    }
    console.log(data)
}));


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
            ownerOnly: true,
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

    run (msg, {ticks}) {
        s = defaultdata;
        
        s.setup = {"tick":0,"ticksLeft":ticks,"game":true};
        fs.writeFile("data.json", JSON.stringify(s));
        msg.delete();
        return msg.say("Game started. " + ticks + " ticks left until the game ends.");
    }
};