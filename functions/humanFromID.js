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
        for (var h = 0; h < s.countries[country].humans.length; h++) {
            if (s.countries[country].humans[h].id == id) {
                return h;
            }
        }
    }
    return false;
};