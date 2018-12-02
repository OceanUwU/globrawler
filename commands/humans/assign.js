const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const consts = requireDir("../../consts", {
	recurse: true
});
const functions = requireDir("../../functions", {
	recurse: true
});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "assign",
            aliases:["employ","setwork","enslave"],
            group: "humans",
            memberName: "assign",
            description: "Assign a human to work at a building.",
            examples: ["assign 1 1"],
            args: [
                {
                    key: "human",
                    prompt: "Which human do you want to assign?",
                    type: "string",
                    validate: (text, msg) => {
                        let s = functions.readData();
                        if (s.countries[msg.author.id]) {
                            if (functions.humanFromID(msg.author.id, Number(text)) !== false) return true;
                            return "You have no human with that ID.";
                        }
                        return "You don\'t have a country.";
                    }
                },
                {
                    key: "building",
                    prompt: "Which building do you want to assign it to?",
                    type: "string",
                    validate: (text, msg) => {
                        let s = functions.readData();
                        if (s.countries[msg.author.id]) {
                            if (functions.buildingFromID(msg.author.id, Number(text)) !== false) return true;
                            return "You have no building with that ID.";
                        }
                        return "You don\'t have a country.";
                    }
                }
            ]
        });
    }

    run (msg, {human, building}) {
        let s = functions.readData();
        s.countries[msg.author.id].humans[functions.humanFromID(msg.author.id, human)].building = s.countries[msg.author.id].buildings[functions.buildingFromID(msg.author.id, building)].id
        functions.writeData(s);
        return msg.say("Done.");
    }
};