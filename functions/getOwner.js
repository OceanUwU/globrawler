const s = require("../data.json");

module.exports = function (name) {
    for (var c in s.countries) {
        if (s.countries[c].name == name) {
            return c;
        }
    }
    return false;
}