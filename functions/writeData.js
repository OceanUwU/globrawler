const fs = require("fs");

module.exports = function (s) {
    fs.writeFileSync("data.json", JSON.stringify(s))
};