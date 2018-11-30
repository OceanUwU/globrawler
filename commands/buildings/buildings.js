const { Command } = require("discord.js-commando");
const requireDir = require('require-dir');
const fs=require('fs');
var consts = requireDir("../../consts", {
	recurse: true
});
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "buildings",
            aliases:["builds","buildlist","allbuildings"],
            group: "buildings",
            memberName: "buildings",
            description: "Shows a list of buildings.",
            examples: ["buildings"]
        });
    }

    run (msg) {
        var output = "```md";
        for (var type in consts.buildings) {
            output += "\n\n<" + type + ">";
            for (var l = 0; l < consts.buildings[type].length; l++) {
                output += "\nLevel [" + (l + 1) + "](" + consts.buildings[type][l].n + ")\n ";
                output += (l == 0 ? "Build" : "Upgrade") + " cost: " + consts.buildings[type][l].c +
                "\n Maintenance: " + consts.buildings[type][l].m +
                "\n Employees needed: " + consts.buildings[type][l].e +
                "\n Produces: " + consts.buildings[type][l].p + "";
            }
        }
        output += "```";
        return msg.channel.send(output);
    }
};