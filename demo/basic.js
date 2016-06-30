"use strict";

var bigcluster = require('../index');

function demoMaster(count) {
    console.log("startup master...: " + count + ', ' + process.pid);
}

function demoWorker(workId) {
    console.log("startup work: " + workId + ', ' + process.pid);
    setTimeout(function() {
        process.exit(0);
    }, 3000);
}

bigcluster(2, demoWorker, demoMaster);
