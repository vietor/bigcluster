"use strict";

var envKey = "BIGCLUSTER_WORKER";

function BigCluster(count, onWorker, onMaster) {
    if (count < 0) {
        if (onMaster)
            onMaster(1);
        onWorker(1);
    } else {
        var cluster = require('cluster');

        if (cluster.isMaster) {
            var workCount = 1;

            if (count > 0)
                workCount = count;
            else
                workCount = require('os').cpus().length;

            for (var i = 0; i < workCount; i++) {
                var env = {};
                env[envKey] = '' + (i + 1);
                var worker = cluster.fork(env);
                worker.___env = env;
            }

            cluster.on('exit', function(worker, code, signal) {
                var newest = cluster.fork(worker.___env);
                newest.___env = worker.___env;
            });

            if (onMaster)
                onMaster(workCount);
        } else {
            onWorker(parseInt(process.env[envKey]));
        }
    }
}

module.exports = BigCluster;
