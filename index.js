"use strict";

var envKey = "BIGCLUSTER_WORKER";

function setWorkEnv(env, data) {
    env[envKey] = JSON.stringify(data);
    return env;
}

function getWorkEnv(env) {
    try {
        return JSON.parse(env[envKey]);
    } catch (e) {
        return null;
    }
}

function setWorkId(env, workId) {
    env[envKey] = '' + workId;
    return env;
}

function getWorkId(env) {
    return parseInt(env[envKey]);
}

function BigCluster(count, onWorker, onMaster) {
    if (count < 0) {
        if (onMaster)
            onMaster(1);
        onWorker(1);
    } else {
        var cluster = require('cluster');

        if (cluster.isMaster) {
            var workCount = 1;
            var workObjects = {};

            if (count > 0)
                workCount = count;
            else
                workCount = require('os').cpus().length;

            for (var i = 0; i < workCount; i++) {
                var id = i + 1;
                var env = setWorkId({}, id);
                var worker = cluster.fork(env);
                worker.___ = {
                    id: id,
                    env: env
                };
                workObjects[id] = worker;
            }

            cluster.on('exit', function(worker, code, signal) {
                var newest = cluster.fork(worker.___.env);
                newest.___ = worker.___;
                workObjects[newest.___.id] = newest;
            });

            setWorkId(process.env, -1);

            if (onMaster)
                onMaster(workCount);
        }

        var workId = getWorkId(process.env);
        if (workId >= 0)
            onWorker(workId);
    }
}

module.exports = BigCluster;
