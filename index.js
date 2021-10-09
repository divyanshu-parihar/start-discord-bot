#!/usr/bin/env node
const exec = require("child_process").exec;
var ncp = require("ncp").ncp;

(async () => {
  console.log("Starting Project");
  exec(
    "npm init -y && npm install @types/config @types/mongoose @types/node discord-api-types ts-node typescript --save-dev && " +
      "node -e \"let pkg=require('./package.json'); pkg.scripts.dev='nodemon --exec ts-node ./src/index.ts'; pkg.scripts.prod='node ./dist/index.js' ;require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));\"",
    function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log("error: " + error);
      }
    }
  );
  ncp.limit = 16;
  console.log("ADDING PROJECT FOLDERS ... ")
  ncp(`${__dirname}/package`, ".", function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("Updated the package.json!");
    console.log("♥♥♥♥♥ HAPPY DEVELOPMENT ♥♥♥♥♥")
  });
  console.log("Added some Template folders")
})();
