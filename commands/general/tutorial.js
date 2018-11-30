const { Command } = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "tutorial",
            group: "general",
            memberName: "tutorial",
            description: "Shows you how to play the game.",
            examples: ["tutorial"],
        });
    }

    run (msg) {
        return msg.say("https://docs.google.com/document/d/1Kh6Ojz2xQovdBZkRLpTZCKpwtsdg2liCu5G545b6_GA/edit?usp=sharing");
    }
};