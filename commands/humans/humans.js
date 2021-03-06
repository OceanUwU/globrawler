const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
var consts = requireDir("../../consts", {
	recurse: true
});
var functions = requireDir("../../functions", {
	recurse: true
});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "humans",
            aliases:["myhumans","humanlist","slaves","people","ppl"],
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
                        let s = functions.readData();
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
        let s = functions.readData();
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
            output += "human ID " + s.countries[owner].humans[h].id + (s.countries[owner].humans[h].building ? " is working building ID " + s.countries[owner].humans[h].building : " isn't working any building") + " and is " + s.countries[owner].humans[h].age + " tick" + (s.countries[owner].humans[h].age == 1 ? "" : "s") + " old.\n";
        }
        output += "```";
        if (output.length > 1995) {
			fs.writeFileSync("all.txt", output);
			return msg.say("Um... ok.", {file: "all.txt"});
        }
        return msg.say(output);
    }
};