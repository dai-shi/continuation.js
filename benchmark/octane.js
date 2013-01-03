#!/usr/bin/env node

var benchmark = require('benchmark');
var _ = require('underscore');
var continuation = require('../src/continuation.js');

var octane = require('benchmark-octane');

_.each(require.cache, function(value, key) {
  delete require.cache[key];
});
continuation.enable_on_require();
var cps_octane = require('benchmark-octane');
continuation.disable_on_require();

var suite = new benchmark.Suite();

for (var i = 0; i < octane.length; i++) {
  suite.push(new benchmark(octane[i]));
  var cps_test = cps_octane[i];
  cps_test.name = 'cps_' + cps_test.name;
  suite.push(new benchmark(cps_test));
}

suite.on('cycle', function(event) {
  console.log(String(event.target));
})
  .on('complete', function() {
  console.log('done');
})
  .run({
  async: false
});
