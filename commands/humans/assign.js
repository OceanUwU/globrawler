const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
var consts = requireDir("../../consts", {
	recurse: true
});
var functions = requireDir("../../functions", {
	recurse: true
});
var s = require("../../data.json");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "assign",
            aliases:["employ","setwork","enslave"],
            group: "humans",
            memberName: "humans",
            description: "Assign a human to work at a building.",
            examples: ["assign 1 1"],
            args: [
                {
                    key: "humanID",
                    prompt: "Which human do you want to assign?",
                    type: "string",
                    validate: text => {
                        if (s.countries[msg.author.id]) {
                            if (functions.humanFromID) return true;
                            return "You have no human with that ID.";
                        }
                        return "You don\'t have a country.";
                    }
                },
                {
                    key: "buildingID",
                    prompt: "Which building do you want to assign it to?",
                    type: "string",
                    validate: text => {
                        if (s.countries[msg.author.id]) {
                            if (functions.buildingFromID) return true;
                            return "You have no building with that ID.";
                        }
                        return "You don\'t have a country.";
                    }
                }
            ]
        });
    }

    run (msg, { humanID, buildingID }) {
        return msg.say("needsWork");
    }
};