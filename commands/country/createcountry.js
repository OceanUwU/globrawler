const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
var s = require("../../data.json");
const consts = requireDir("../../consts", {
	recurse: true
});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "createcountry",
            aliases:["newcountry","makecountry","new","create"],
            group: "country",
            memberName: "createcountry",
            description: "Creates a country for you.",
            examples: ["createcountry Weebtopia"],
            args: [
                {
                    key: "name",
                    prompt: "What should the country be named?",
                    type: "string",
                    validate: text => {
                        for (var c in s.countries) {
                            if (s.countries[c].name == text) {
                                return "That\'s already a country.";
                            }
                        }
                        return true;
                    }
                }
            ]
        });
    }

    run (msg, { name }) {
        if (s.countries[msg.author.id]) return msg.say("You already have a country!");
        s.countries[msg.author.id] = require("../../defaultcountry.json");
        s.countries[msg.author.id].name = name;
        msg.member.addRole(consts.config.leaderRole);
        return msg.say("Yup. Done.");
    }
};