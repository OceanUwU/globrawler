const fs = require("fs");
const requireDir = require('require-dir');
const consts = requireDir("../consts", {
	recurse: true
});
const functions = requireDir("./", {
	recurse: true
});

module.exports = function (country, id) {
    let s = functions.readData();
    if (!s.countries[country]) {
        country = functions.getOwner(country);
    }
    if (s.countries[country]) {
        for (var b = 0; b < s.countries[country].buildings.length; b++) {
            if (s.countries[country].buildings[b].id == id) {
                return b;
            }
        }
    }
    return false;
};