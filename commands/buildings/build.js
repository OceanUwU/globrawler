var s = require("../../data.json");
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
            name: "build",
            aliases:["make"],
            group: "buildings",
            memberName: "build",
            description: "Builds a building. Once you build one, you can't destroy it.",
            examples: ["build human","build currency","build power"],
            args: [
                {
                    key: "type",
                    prompt: "What type of building would you like to build? currency / human / power",
                    type: "string",
                    validate: text => {
                        if (consts.buildings[text.toLowerCase()]) return true;
                        return "That's not a type of building! Use the buildings command to get the types available.";
                    }
                }
            ]
        });
    }

    run (msg, { type }) {
        if (!s.countries[msg.author.id]) { //check if user owns country
            return msg.say("Make a country first.");
        }
        if (functions.getInfo(msg.author.id).spaceUsed >= consts.config.countrySize) return msg.say("Your country is full.")
        if (s.countries[msg.author.id].points.currency < consts.buildings[type][0].c) { //check if enough currency points
            return msg.say("You don't have enough currency points to build this!");
        }
        s.countries[msg.author.id].points.currency -= consts.buildings[type][0].c; //subtract build cost from balance
        s.countries[msg.author.id].buildings.push({ //create new building
            "type":type,
            "id":(s.countries[msg.author.id].buildings[s.countries[msg.author.id].buildings.length - 1].id) + 1,
            "level":0
        });
        return msg.say("Uh huh. Now you should get some humans to work here.");
    }
};