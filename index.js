"use strict";

var cluster = require('cluster');

var envKey = "BIGCLUSTER_WORKER_ID";

function BigCluster(count, onWorker, onMaster) {
    if (cluster.isMaster) {
        var workcount = 1;
        if (count < 0) {
            process.env[envKey] = '0';
        } else {
            if (count > 0)
                workcount = count;
            else
                workcount = require('os').cpus().length;

            for (var i = 0; i < workcount; i++) {
                var env = {};
                env[envKey] = '' + (i + 1);
                cluster.fork(env).env = env;
            }

            cluster.on('exit', function(worker, code, signal) {
                cluster.fork(worker.env).env = worker.env;
            });

            process.env[envKey] = '-1';
        }
        if (onMaster)
            onMaster(workcount);
    }

    var workid = parseInt(process.env[envKey]);
    if (workid >= 0)
        onWorker(workid);
}

module.exports = BigCluster;
