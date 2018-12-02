const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
var consts = requireDir("../../consts", {
	recurse: true
});
const functions = requireDir("../../functions", {
	recurse: true
});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "upgrade",
            aliases:["up","improve"],
            group: "buildings",
            memberName: "upgrade",
            description: "Upgrades a building",
            examples: ["upgrade 1"],
            args: [
                {
                    key: "building",
                    prompt: "What's the ID of the building you'd like to upgrade?",
                    type: "string",
                    validate: (text, msg) => {
                        if (s.countries[msg.author.id]) {
                            let s = functions.readData();
                            if (functions.buildingFromID(msg.author.id, Number(text)) !== false) return true;
                            return "You have no building with that ID.";
                        }
                        return "You don\'t have a country.";
                    }
                }
            ]
        });
    }

    run (msg, {building}) {
        let s = functions.readData();
        building = functions.buildingFromID(msg.author.id, building)
        if (functions.getInfo(msg.author.id).spaceUsed >= consts.config.countrySize) return msg.say("Your country is full.")
        if (!consts.buildings[s.countries[msg.author.id].buildings[building].type][s.countries[msg.author.id].buildings[building].level + 1]) return msg.say("This building has already been upgraded to the maximum level.")
        if (s.countries[msg.author.id].points.currency < consts.buildings[s.countries[msg.author.id].buildings[building].type][s.countries[msg.author.id].buildings[building].level + 1].c) return msg.say("You don't have enough currency points to upgrade this!"); //check if enough currency points
        s.countries[msg.author.id].points.currency -= consts.buildings[s.countries[msg.author.id].buildings[building].type][s.countries[msg.author.id].buildings[building].level + 1].c; //subtract build cost from balance
        s.countries[msg.author.id].buildings[building].level++; //increase building level
        functions.writeData(s);
        return msg.say("Uh huh. Now you should get some more humans to work here.");
    }
};