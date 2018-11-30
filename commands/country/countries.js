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
            name: "countries",
            aliases:["countrylist","nations","empires","list"],
            group: "country",
            memberName: "countries",
            description: "Shows a list of all countries",
            examples: ["countries"],
        });
    }

    run (msg) {
        var output = "```";
        for (var c in s.countries) {
            output += (this.client.users.get(c) ? this.client.users.get(c).tag : c) + ": " + s.countries[c].name + "\n";
        }
        output += "```";
        return msg.say(output);
    }
};