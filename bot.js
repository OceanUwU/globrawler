const fs = require("fs");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const requireDir = require('require-dir');
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
        ["buildings","Manage your buildings."],
        ["humans","Set your ~~slaves~~ humans to work."],
        ["war","Cause ＤＥＡＴＨ. Or prevent it. It's your choice."]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands() //get default commands
    .registerCommandsIn(path.join(__dirname, "commands"));

var s = require("./data.json"); //data
var consts = requireDir("./consts", {
	recurse: true
});

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
  console.log(msg.author.username + channel + ": [" + msg.content + "]"); //log messages
  fs.writeFileSync("data.json", JSON.stringify(s)); //write data back to file
  if (msg.author.bot) return; //stop if user is bot
  if (msg.content == "tick") {
    tick();
  }
});

function tick() {
  try {
    var buildings = {};
    var s = require("./data.json"); //get data from data file
    for (var n in s.countries) { //do for each country
      if (s.countries[n].warring != null) { //if the country IS warring
        //do war pls
        s.countries[n].warring = null; //war finished
      }
    }
    for (var n in s.countries) { //do for each country
      buildings[n] = [];
      for (var b = 0; b < s.countries[n].buildings.length; b++) { //for each building
        buildings[n].push(0);
      }
    }
    for (var n in s.countries) { //do for each country
      var lastID = s.countries[n].humans[s.countries[n].humans.length - 1].id; //get the id of the newest human
      var toKill = []; //pls array
      for (var h = 0; h < s.countries[n].humans.length; h++) { //for each human
        s.countries[n].humans[h].age++; //they're older now!
        if (s.countries[n].humans[h].building != null) {
          for (var b = 0; b < s.countries[n].buildings.length; b++) {
            if (s.countries[n].buildings[b].id == s.countries[n].humans[h].building) {
              buildings[n][b]++;
            }
          }
        }
        if (Math.random() < 0.05) { //death
          toKill.push(s.countries[n].humans[h].id); //add to death list
        }
      }
      for (var h = 0; h < toKill.length; h++) {
        for (var checking = 0; checking < s.countries[n].humans.length; checking++) { //for each human
          if (toKill[h] == s.countries[n].humans[checking].id) { //check if human is on kill list
            s.countries[n].humans.splice(checking, 1); //kill
          }
        }
      }
      for (var hp = 0; hp < s.countries[n].points.human; hp++) { //for each human point
        lastID++; //add to lastID
        s.countries[n].humans.push({ //create human
          "building":null, //assigned to no building
          "id":lastID, //with a unique ID
          "age":0 //with age of 0
        });
      }
      s.countries[n].points.human = 0; //reset human points
    }
    for (var n in s.countries) { //do for each country
      for (var b = 0; b < s.countries[n].buildings.length; b++) { //for each building
        console.log(consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].e + ", " + buildings[n][b])
        if (consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].e <= buildings[n][b]) { //if enough employees
          if (s.countries[n].points.currency >= consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].m) { //if enough currency points
            s.countries[n].points.currency -= consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].m; //take maintenance
            s.countries[n].points[s.countries[n].buildings[b].type] += consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].p; //get production
          }
        }
      }
    }
    fs.writeFile("data.json", JSON.stringify(s)); //write data back to file
  } catch (err) { //stop if an error
    console.log(err) //log error
  }
}

client.login(require("./token.json")); //login