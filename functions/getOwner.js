const fs = require("fs");
const requireDir = require('require-dir');
var functions = requireDir("./", {
	recurse: true
});

module.exports = function (name) {
    let s = functions.readData();
    for (var c in s.countries) {
        if (s.countries[c].name == name) {
            return c;
        }
    }
    return false;
}