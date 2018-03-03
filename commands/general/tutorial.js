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
        return msg.say("https://github.com/975miles/GloBrawler/blob/master/tutorial.md");
    }
};