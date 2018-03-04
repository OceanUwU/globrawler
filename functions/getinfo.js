const s = require("../data.json");
const requireDir = require('require-dir');
var consts = requireDir("../consts", {
	recurse: true
});
var functions = requireDir("./", {
	recurse: true
});

module.exports = function (country) {
    if (!s.countries[country]) {
        country = functions.getOwner(country);
    }
    if (s.countries[country]) {
        var obj = {
            "spaceUsed": 0,
            "buildings":{}
        }
        for (var b = 0; b < s.countries[country].buildings.length; b++) {
            obj.spaceUsed += s.countries[country].buildings[b].level + 1;
            obj.buildings[s.countries[country].buildings[b].id] = 0;
        }
        for (var h = 0; h < s.countries[country].humans.length; h++) {
            obj.buildings[s.countries[country].humans[h].building]++;
        }
        return obj;
    }
    return false;
};