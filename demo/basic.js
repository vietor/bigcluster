"use strict";

var bigcluster = require('../index');

function demoMaster() {
    console.log("startup master...");
    process.on('message', function(data) {
        console.log(data);
    });
}

function demoWorker(workId) {
    console.log("startup work: ", workId);
    process.send("i am working");
    setTimeout(function() {
        process.exit(0);
    }, 3000);
}

bigcluster(2, demoWorker, demoMaster);
