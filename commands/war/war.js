const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
var consts = requireDir("../../consts", {recurse: true});
var functions = requireDir("../../functions", {recurse: true});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "war",
            aliases:["setwar"],
            group: "war",
            memberName: "war",
            description: "Set the country you're warring with for this tick.",
            examples: ["war Weebtopia"],
            args: [
                {
                    key: "country",
                    prompt: "Which country do you want to go to war with?",
                    type: "string",
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

    run (msg, { country }) {
        let s = functions.readData();
        if (!s.countries[msg.author.id]) return msg.say("You don\'t have a country. What did you expect to happen?");
        s.countries[msg.author.id].warring = functions.getOwner(country);
        functions.writeData(s);
        return msg.say("Right.");
    }
};