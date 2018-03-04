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
            name: "humans",
            aliases:["myhumans","humanlist","slaves"],
            group: "humans",
            memberName: "humans",
            description: "Shows every human of a country.",
            examples: ["humans Weebtopia"],
            args: [
                {
                    key: "name",
                    prompt: "Which country do you want info on?",
                    type: "string",
                    default: "",
                    validate: text => {
                        if (text) {
                            if (functions.getOwner(text)) return true;
                            return "That isn\'t a country...";
                        }
                        return true;
                    }
                }
            ]
        });
    }

    run (msg, { name }) {
        if (!name) {
            if (s.countries[msg.author.id]) {
                name = s.countries[msg.author.id].name;
            } else {
                return msg.say("You don\'t have a country. Specify which country to get info on.");
            }
        }
        var owner = functions.getOwner(name)
        var info = functions.getInfo(owner);
        var output = "```";
        for (var h = 0; h < s.countries[owner].humans.length; h++) {
            output += "human ID " + s.countries[owner].humans[h].id + " is working on building ID " + s.countries[owner].humans[h].building + " and is " + s.countries[owner].humans[h].age + " ticks old.\n";
        }
        output += "```";
        return msg.say(output);
    }
};