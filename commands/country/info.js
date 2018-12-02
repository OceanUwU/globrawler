const fs = require("fs");
const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
var consts = requireDir("../../consts", {recurse: true});
var functions = requireDir("../../functions", {recurse: true});

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            aliases:["me","bal","getinfo"],
            group: "country",
            memberName: "info",
            description: "Shows info of a country.",
            examples: ["info Weebtopia"],
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
        var output = "Info on " + name + ": ```md" +
        "\nSpace used: " + info.spaceUsed + "/" + consts.config.countrySize +
        "\nCurrency points: " + s.countries[owner].points.currency +
        "\nPower points: " + s.countries[owner].points.power +
        "\nAbout to attack: " + (s.countries[owner].warring ? s.countries[s.countries[owner].warring].name : "nobody") +
        "\nHumans: " + s.countries[owner].humans.length +
        "\nHumans working buildings: \n";
        for (var b = 0; b < s.countries[owner].buildings.length; b++) {
            output += "\t" + consts.buildings[s.countries[owner].buildings[b].type][s.countries[owner].buildings[b].level].n + " (id " + s.countries[owner].buildings[b].id + "): " + info.buildings[s.countries[owner].buildings[b].id] + "/" + consts.buildings[s.countries[owner].buildings[b].type][s.countries[owner].buildings[b].level].e + "\n";
        }
        output += "```";
        return msg.say(output);
    }
};