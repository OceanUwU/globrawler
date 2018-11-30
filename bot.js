const fs = require("fs");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const requireDir = require('require-dir');
const consts = requireDir("./consts", {recurse: true});
const functions = requireDir("./functions", {recurse: true});

const client = new CommandoClient({
  commandPrefix: "!", //it's in the name
  owner: [ //admins, can control the client
    "106068236000329728"
  ],
  disableEveryone: true //Do you want chaos? Disable disableEveryone! It's free!
});
client.registry
    .registerDefaultTypes()
    .registerGroups([ //get command groups
        ["general", "General"],
        ["country","Manage your country."],
        ["buildings","Buildings"],
        ["humans","Humans"],
        ["war","War"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands() //get default commands
    .registerCommandsIn(path.join(__dirname, "commands"));

var s = require("./data.json"); //data
var tickTimer;
client.on("ready", () => { //when the client connects
  client.user.setStatus("online"); //dnd , online , ldle, invisible
  client.user.setActivity("#info"); //sets game
  console.log("Bot up."); //logs to console when online
});

client.on("message", (msg) => {
  //log message
  if (msg.channel.type == "dm") {
    var channel = " in DMs";
  } else {
    var channel = " in #" + msg.channel.name; 
  }
  console.log(msg.author.username + channel + ": [" + msg.content + "]"); //log messages
});

function tick() {
  try {
    var s = JSON.parse(fs.readFileSync("./data.json")); //get data from data file
    let buildings = {};
    let toKill = {};

    for (let n in s.countries) {
      toKill[n] = {}
      for (let h = 0; h < s.countries[n].humans.length; h++) { //for each human
        toKill[n][s.countries[n].humans[h].id] = consts.config.normalDeathChance //increase its death chances
      }
    }

    //war
    for (let n in s.countries) { //do for each country
      if (s.countries[n].warring) { //if the country IS warring
        //attack
        s.countries[n].points.power -= s.countries[n].points.power * (Math.random() * consts.config.pointLossMax); //take power points from attacker
        for (let h = 0; h < s.countries[n].humans.length; h++) { //for each human
          if (s.countries[n].humans[h].building && s.countries[n].buildings[functions.buildingFromID(n, s.countries[n].humans[h].building)].type == "power") { //if it's working in a power building
            toKill[n][s.countries[n].humans[h].id] += consts.config.attackingDeathChance //increase its death chances
          }
        }
        
        //defense
        s.countries[s.countries[n].warring].points.power -= s.countries[s.countries[n].warring].points.power * (Math.random() * (consts.config.pointLossMax)); //take power points from attacker
        for (let h = 0; h < s.countries[s.countries[n].warring].humans.length; h++) { //for each human
          toKill[n][s.countries[s.countries[n].warring].humans[h].id] += ((s.countries[n].points.power / s.countries[s.countries[n].warring].points.power) * consts.config.defendingDeathChance);
        }
        s.countries[n].warring = null; //war finished
      }
    }
    //production
    let lastID = {}
    for (let n in s.countries) { //do for each country
      lastID[n] = s.countries[n].humans[s.countries[n].humans.length - 1].id; //get the id of the newest human and add 1
      let workBuilds = []
      for (let b = 0; b < s.countries[n].buildings.length; b++) {
        workBuilds.push(0)
      }
      for (let h = 0; h < s.countries[n].humans.length; h++) { //for each human
        s.countries[n].humans[h].age++; //increase age by 1
        if (s.countries[n].humans[h].building) {
          for (let b = 0; b < s.countries[n].buildings.length; b++) {
            if (s.countries[n].buildings[b].id == s.countries[n].humans[h].building) {
              workBuilds[b]++;
            }
          }
        }
        if (Math.random() < toKill[n][s.countries[n].humans[h].id]) { //death
          toKill[n][s.countries[n].humans[h].id] = true; //add to death list
        } else {
          toKill[n][s.countries[n].humans[h].id] = false;
        }
      }
      for (let b = 0; b < s.countries[n].buildings.length; b++) { //for each building
        s.countries[n].points.currency -= consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].m; //take maintenance
        if (consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].e <= workBuilds[b]) { //if enough employees,
          s.countries[n].points[s.countries[n].buildings[b].type] += consts.buildings[s.countries[n].buildings[b].type][s.countries[n].buildings[b].level].p; //get production
        }
      }
    }

    //humans
    for (let n in s.countries) { //do for each country
      //deaths
      for (let h in toKill[n]) {
        if (toKill[n][h]) { //check if human is on kill list
          s.countries[n].humans.splice(functions.humanFromID(n, h), 1); //kill
        }
      }

      //births
      for (let hp = 0; hp < s.countries[n].points.human; hp++) { //for each human point
        lastID[n]++;
        s.countries[n].humans.push({ //create a human
          "building":null, //assigned to no building
          "id":lastID[n], //with a unique ID
          "age":0 //with age of 0
        });
      }
      s.countries[n].points.human = 0; //reset human points
    }
    s.setup.tick++; //
    s.setup.ticksLeft--; //decrease amount of ticks left

    let news = "hi lol";
    //make news here pls
    fs.writeFile("news.txt", news); //write news to file
    client.channels.get(consts.config.newsChannel).send("Tick " + s.setup.tick + ": ", {file: 'news.txt'});

    if (s.setup.ticksLeft <= 0) {
      s.setup.game = false;
      client.channels.get(consts.config.newsChannel).send("Game ended after " + s.setup.tick + " ticks.")
    }
    
    fs.writeFileSync("data.json", JSON.stringify(s)); //write data back to file
  } catch (err) { //stop if an error
    console.log(err) //log error
  }
}

function main() {
  client.login(require("./token.json")); //login
  tickInterval = setInterval(function() {
    var s = JSON.parse(fs.readFileSync("./data.json"));
    if (s.setup.game == true) {
      tick();
    } else {
      console.log("tried to tick, no game ongoing")
    }
  }, consts.config.tickLength);
}

main()