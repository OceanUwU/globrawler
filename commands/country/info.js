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
            name: "info",
            aliases:["me","bal"],
            group: "country",
            memberName: "info",
            description: "Shows info of a country.",
            examples: ["createcountry Weebtopia"],
            guildOnly: true,
            args: [
                {
                    key: "name",
                    prompt: "Which country do you want info on?",
                    type: "string",
                    default: "",
                    validate: text => {
                        if (text) {
                            for (var c in s.countries) {
                                if (s.countries[c].name == text) {
                                    return true;
                                }
                            }
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
        var info = functions.getinfo(name);
        var output = "Info on " + text;
        return msg.say("Yup. Done.");
    }
};