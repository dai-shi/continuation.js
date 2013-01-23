var assert = require('assert');
var vm = require('vm');

process.env.NODE_ENV = 'test';
var continuation = require('../src/continuation.js');

describe('basic loop', function() {

  it('should run a loop function', function(done) {
    var code = 'function loop(x) { if (x > 0) { loop(x - 1); } }';
    code += 'loop(100000);';
    vm.runInNewContext(continuation.compile(code));
    done();
  });
  
  it('should run a nested loop function', function(done) {
    var code = 'function loopA(x) { loopB(x); }';
    code += 'function loopB(x) { if (x > 0) { loopA(x - 1); } }';
    code += 'loopA(100000);';
    vm.runInNewContext(continuation.compile(code));
    done();
  });


});
