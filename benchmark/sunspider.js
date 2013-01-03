#!/usr/bin/env node

var benchmark = require('benchmark');
var _ = require('underscore');
var continuation = require('../src/continuation.js');

var benmkzoo = require('benmkzoo');

_.each(require.cache, function(value, key) {
  delete require.cache[key];
});
continuation.enable_on_require();
var cps_benmkzoo = require('benmkzoo');
continuation.disable_on_require();

var suite = new benchmark.Suite();

for (var test in benmkzoo.sunspider) {
  suite.push(new benchmark(benmkzoo.sunspider[test]));
  var cps_test = cps_benmkzoo.sunspider[test];
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
