const fs = require("fs");
const fileOptions = {
  encoding: "utf-8"
};

function readJSONFile(path) {
  return JSON.parse(fs.readFileSync(path, fileOptions));
}

function writeJSONFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data));
}

function randomToken() {
  return Math.floor(Math.random() * 100) + 1;
}

module.exports = {
  readJSONFile, writeJSONFile, randomToken
};
