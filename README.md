# bigcluster

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Node.js Smart cluster framwork NodeJS

## Installation

```sh
$ npm install bigcluster
```

## Usage

``` javascript
var bigcluster = require('bigcluster');

bigcluster(0, function(workid) {
    console.log("work id: ", workid);
}, function(workcount) {
    console.log("work count: ", workcount);
});
```

### parameters

|*Name*|*Type*|*Description*|*Requirement*|
|---|---|---|---|
|count|int|required work count|Y|
|onWorker|function|the worker processor|Y|
|onMaster|function|the master processor|N|

> count
>> *-1 or &lt;0*: workcount = 1, disable cluster mode.  
>> *0* workcount = cpu count, auto restart exited worker.  
>> *&gt;0* workcount = count, auto restart exited worker.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/bigcluster.svg
[npm-url]: https://npmjs.org/package/bigcluster
[downloads-image]: https://img.shields.io/npm/dm/bigcluster.svg
[downloads-url]: https://npmjs.org/package/bigcluster
