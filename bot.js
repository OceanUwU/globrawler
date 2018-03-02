const fs = require("fs");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const client = new CommandoClient({
  commandPrefix: "!", //it's in the name
  owner: [ //admins, can control the client
    "180716036264296452",
    "106068236000329728"
  ],
  disableEveryone: true //Do you want chaos? Disable disableEveryone! It's free!
});
client.registry
    .registerDefaultTypes()
    .registerGroups([ //get command groups
        ["general", "Commands that don\'t have anything to do with the main bot"],
        ["country","Manage your country."],
        ["buildings","Manage your buildings."]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands() //get default commands
    .registerCommandsIn(path.join(__dirname, "commands"));

var s = require("./data.json"); //data

client.on("ready", () => { //when the client connects
  client.user.setStatus("online"); //dnd , online , ldle, invisible
  client.user.setActivity("Hello!"); //sets game
  console.log("Bot up."); //logs to console when online
});

client.on("message", (msg) => {
  if (msg.channel.type == "dm") {
    var channel = " in DMs";
  } else {
    var channel = " in #" + msg.channel.name + ", " + msg.guild.name; 
  }
  //log messages
  console.log(msg.author.username + channel + ": [" + msg.content + "]");
  fs.writeFileSync("data.json", JSON.stringify(s)); //write data back to file
  if (msg.author.bot) return;
  msg.channel.send("s: " + JSON.stringify(s), null, 4);
});

function tick() {
  try {
    var s = require("./data.json"); //get data from data file
    for (var n in s.countries) { //do for each country
      for (var w = 0; w < s.countries[w].wars.length; w++) {

      }
    }
    fs.writeFile("data.json", JSON.stringify(s), null, 4); //write data back to file
  } catch (err) { //stop if an error
    console.log(err) //log error
  }
}

client.login(require("./token.json"));