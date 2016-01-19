"use strict";

var cluster = require('cluster');

var envKey = "BIGCLUSTER_WORKER_ID";

function BigCluster(cpu, onWorker, onMaster) {
    if (cluster.isMaster) {
        var count = 1;
        if (cpu < 0) {
            process.env[envKey] = '0';
        } else {
            if (cpu > 0)
                count = cpu;
            else
                count = require('os').cpus().length;

            for (var i = 0; i < count; i++) {
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
            onMaster(count);
    }

    var workerId = parseInt(process.env[envKey]);
    if (workerId >= 0)
        onWorker(workerId);
}

module.exports = BigCluster;
