const fs = require("fs");
const { Command } = require("discord.js-commando");
var s = require("../../data.json");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "createcountry",
            aliases:["newcountry","makecountry"],
            group: "country",
            memberName: "createcountry",
            description: "Creates a country for you.",
            examples: ["createcountry Weebtopia"],
            guildOnly: true,
            args: [
                {
                    key: "name",
                    prompt: "What should the country be named?",
                    type: "string",
                    default:"lol",
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
        if (s.countries[msg.author.id] != undefined) return msg.say("You already have a country!");
        s.countries[msg.author.id] = require("../../defaultcountry.json");
        s.countries[msg.author.id].name = name;
        return msg.say("Yup. Done.");
    }
};