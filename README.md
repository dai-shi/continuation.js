continuation.js
===============

CPS transformer with trampoline technique for Node.js

JavaScript is a nice programming language, but compared to Scheme,
it lacks the tail call optimization.
Node.js is often used with Callback Passing Style programming
without tail call optimization.

This module allows to transform native JavaScript code into
Continuation Passing Style (CPS) code in a best effort manner.
It utilizes so-called trampoline technique to avoid the stack overflow error.
Transforming all function into CPS is not very easy
(and sometimes not very efficient),
hence it has a fallback mechanism, that is, only supported
function style is transformed into CPS and other functions are
called in an original style.
Because of the fallback mechanism, mixing CPS code and non-CPS code
is possible.

It is only tested with Node.js, but might be usable
with other JavaScript engines with minor modifications.

Comparison
----------

Here is the table showing related projects.

| NAME                    | continuation.js | [Continuation][1] | [Brushtail][2] | [Cinch][3]     |
|-------------------------|-----------------|-------------------|----------------|----------------|
| CPS transformation      | Mostly          | Callback style    | No             | Callback style |
| Tail Call Optimization  | Yes             | No                | Yes            | No             |
| Native JavaScript       | Yes             | No                | Yes            | Almost         |
| `require()` integration | Yes             | Yes               | No             | Yes            |

[1]: https://github.com/BYVoid/continuation "BYVoid/continuation"
[2]: https://github.com/pufuwozu/brushtail "pufuwozu/brushtail"
[3]: https://github.com/pguillory/cinch "pguillory/cinch"

How to use
----------

### GitHub

    % git clone https://github.com/dai-shi/continuation.js.git
    % cd continuation.js
    % ./bin/continuation-compile sample/fact.js > cps_fact.js

### NPM

    % npm install continuation.js

and add the following:

    require('continuation.js').enable_on_require();

which transforms all following .js files by `require`.

Examples
--------

    % cat sample/fact.js
    function fact(x) {
      function fact_tail(x, r) {
        if (x === 0) {
          return r;
        } else {
          return fact_tail(x - 1, x * r);
        }
      }
      return fact_tail(x, 1);
    }

    exports.fact = fact;

    % node -e "console.log(require('./sample/fact.js').fact(100000))"
    
    .../continuation.js/sample/fact.js:2
      function fact_tail(x, r) {
                            ^
    RangeError: Maximum call stack size exceeded
    
    % node -e "require('./lib/continuation.js').enable_on_require();console.log(require('./sample/fact.js').fact(100000))"
    Infinity


    % cat sample/mutual.js
    function isEven(x) {
      if (x === 0) {
        return true;
      } else {
        return isOdd(x - 1);
      }
    }

    function isOdd(x) {
      if (x === 0) {
        return false;
      } else {
        return isEven(x - 1);
      }
    }

    exports.isEven = isEven;
    exports.isOdd = isOdd;

    % node -e "console.log(require('./sample/mutual.js').isOdd(1234567))"

    .../sample/mutual.js:1
    tion isEven(x) {
           ^
    RangeError: Maximum call stack size exceeded
    % node -e "require('./lib/continuation.js').enable_on_require();console.log(require('./sample/mutual.js').isOdd(1234567))"
    true

How it works
------------

* 4 classes are defined in the global scope.
    * CpsFunction
    * CpsContinuation
    * CpsResult
    * CpsRun
* CPS enabled functions have the CpsEnabled=true property.
* Traversing AST to transform into CPS, only when possible!
* Keeping original code so that non-CPS is always possible.

Benchmark results
-----------------

The following is the results of Octane benchmark suites (except for one).

| Suite name      | Original      | CPS transformed | Improved? |
|-----------------|---------------|-----------------|-----------|
| Richards        | 370 ops/sec   | 16.90 ops/sec   | No        |
| DeltaBlue       | 178 ops/sec   | 6.24 ops/sec    | No        |
| Encrypt         | 171 ops/sec   | 79.93 ops/sec   | No        |
| Decrypt         | 9.23 ops/sec  | 3.65 ops/sec    | No        |
| RayTrace        | 19.82 ops/sec | 2.23 ops/sec    | No        |
| Earley          | 268 ops/sec   | 20.77 ops/sec   | No        |
| Boyer           | 19.01 ops/sec | 2.14 ops/sec    | No        |
| RegExp          | 7.20 ops/sec  | 5.00 ops/sec    | No        |
| Splay           | 116 ops/sec   | 69.90 ops/sec   | No        |
| NavierStokes    | 2.57 ops/sec  | 2.43 ops/sec    | No        |
| PdfJS           | 2.67 ops/sec  | 2.49 ops/sec    | No        |
| Gameboy         | 0.99 ops/sec  | 0.28 ops/sec    | No        |
| CodeLoadClosure | 343 ops/sec   | 392 ops/sec     | Yes       |
| CodeLoadJQuery  | 10.23 ops/sec | 10.36 ops/sec   | Yes       |
| Box2D           | 2.28 ops/sec  | 2.48 ops/sec    | Yes       |


Limitations
-----------

* Not all calls are transformed into CPS.
* `new Function` is not supported.
* First-class continuation is not supported.

TODOs
-----

* Work with try...catch and throw.
* Transform non-tail calls into CPS.
