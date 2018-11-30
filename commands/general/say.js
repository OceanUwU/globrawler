const { Command } = require("discord.js-commando");

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            group: "general",
            memberName: "say",
            description: "Sends a DM to someone.",
            examples: ["say flynn What are you doing?"],
            clientPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Which user do you want to send the DM to?",
                    type: "user"
                },
                {
                    key: "content",
                    prompt: "What would you like the content of the message to be?",
                    type: "string",
                    validate: text => {
                        if (text.length < 201) return true;
                        return "Message Content is above 200 characters";
                    }
                }
            ]
        });
    }

    run (msg, {user, content}) {
        msg.delete();
        return user.send(content);
    }
};