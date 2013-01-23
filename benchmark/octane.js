#!/usr/bin/env node

var benchmark = require('benchmark');
var _ = require('underscore');
var continuation = require('../src/continuation.js');
var vm = require('vm');
var fs = require('fs');

var octane_basedir = __dirname + '/../node_modules/benchmark-octane/lib/octane/';
var octane_suites = ['richards.js', 'deltablue.js', 'crypto.js', 'raytrace.js', 'earley-boyer.js', 'regexp.js', 'splay.js', 'navier-stokes.js', 'pdfjs.js', /*'mandreel.js',*/ 'gbemu.js', 'code-load.js', 'box2d.js'];
var i;

var initSandbox = {
  Uint8Array: Uint8Array,
  Int32Array: Int32Array,
  Uint32Array: Uint32Array,
  Float64Array: Float64Array,
  Float32Array: Float32Array,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Int8Array: Int8Array,
  ArrayBuffer: ArrayBuffer
};
var context = vm.createContext(initSandbox);
vm.runInContext('var suites = []', context);

vm.runInContext('function Benchmark(name, run, setup, teardown) { this.name = name; this.run = run; this.setup = setup; this.teardown = teardown; }', context);

vm.runInContext('function BenchmarkSuite(name, reference, benchmarks) { for (var i = 0; i < benchmarks.length; i++) { var suite = { name: name + "." + benchmarks[i].name, fn: benchmarks[i].run }; if (benchmarks[i].setup) { suite.onStart = benchmarks[i].setup; } if (benchmarks[i].teardown) { suite.onComplete = benchmarks[i].teardown; } suites.push(suite); } }', context);

for (i = 0; i < octane_suites.length; i++) {
  vm.runInContext(fs.readFileSync(octane_basedir + octane_suites[i], 'utf8'), context);
}

var octane = vm.runInContext('suites', context);

var cps_context = vm.createContext(initSandbox);
vm.runInContext('var suites = []', cps_context);

vm.runInContext('function Benchmark(name, run, setup, teardown) { this.name = name; this.run = run; this.setup = setup; this.teardown = teardown; }', cps_context);

vm.runInContext('function BenchmarkSuite(name, reference, benchmarks) { for (var i = 0; i < benchmarks.length; i++) { var suite = { name: name + "." + benchmarks[i].name, fn: benchmarks[i].run }; if (benchmarks[i].setup) { suite.onStart = benchmarks[i].setup; } if (benchmarks[i].teardown) { suite.onComplete = benchmarks[i].teardown; } suites.push(suite); } }', cps_context);

for (i = 0; i < octane_suites.length; i++) {
  vm.runInContext(continuation.compile(fs.readFileSync(octane_basedir + octane_suites[i], 'utf8')), cps_context);
}

var cps_octane = vm.runInContext('suites', cps_context);

var suite = new benchmark.Suite();

for (i = 0; i < octane.length; i++) {
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
