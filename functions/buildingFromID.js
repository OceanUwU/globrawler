const s = require("../data.json");
const requireDir = require('require-dir');
var consts = requireDir("../consts", {
	recurse: true
});
var functions = requireDir("./", {
	recurse: true
});

module.exports = function (country, id) {
    if (!s.countries[country]) {
        country = functions.getOwner(country);
    }
    if (s.countries[country]) {
        for (var b = 0; h < s.countries[country].buildings.length; b++) {
            if (s.countries[country].humans[b].id == id) {
                return b;
            }
        }
    }
    return false;
};