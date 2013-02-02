continuation.js
===============

A module for tail call optimization by Continuation Passing Style (CPS)
transformation with trampoline technique for Node.js

JavaScript is a nice programming language, but compared to Scheme,
it doesn't handle tail calls properly.
Node.js is often used with callback functions,
which tend to be tail calls (but not necessarily recursions)
consuming call stacks.

This module allows to transform native JavaScript code into
CPS code in a best effort manner.
It utilizes so-called trampoline technique to avoid a stack overflow error.
Transforming all functions into CPS is not very easy
(and sometimes not very efficient),
hence it has a fallback mechanism, that is, only supported
function style is transformed into CPS and other functions are
called in an original style.
Because of the fallback mechanism, mixing CPS code and non-CPS code
is possible.

Comparison
----------

Here is the table showing modules that support tail call optimization.

<table>
<tr>
<th>NAME</th>
<th>continuation.js</th>
<th><a href="https://github.com/pufuwozu/brushtail">Brushtail</a></th>
<th><a href="https://github.com/natefaubion/tailrec.js">tailrec.js</a></th>
<th><a href="https://github.com/jayferd/thunk.js">thunk.js</a></th>
<th><a href="https://github.com/Gozala/js-tail-call">tail-call</a></th>
</tr>
<tr>
<td>Tail Call Optimization</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Mutual Recursion</td>
<td>Yes</td>
<td>No</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td>Native JavaScript</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>Almost</td>
</tr>
<tr>
<td>`require()` integration</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>No</td>
</tr>
</table>

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

Simple factorial function:

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

Mutual recursion example:

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
* Traversing AST to transform into CPS in a best effort manner.
* Keeping original code so that non-CPS is always possible.

Benchmark results
-----------------

The following is the results of Octane benchmark suites (except for one).

| Suite name      | Original      | CPS transformed | Improved? |
|-----------------|---------------|-----------------|-----------|
| Richards        | 324 ops/sec   | 38.28 ops/sec   | No        |
| DeltaBlue       | 188 ops/sec   | 12.90 ops/sec   | No        |
| Encrypt         | 162 ops/sec   | 122 ops/sec     | No        |
| Decrypt         | 8.62 ops/sec  | 6.86 ops/sec    | No        |
| RayTrace        | 19.71 ops/sec | 4.10 ops/sec    | No        |
| Earley          | 278 ops/sec   | 33.91 ops/sec   | No        |
| Boyer           | 18.19 ops/sec | 1.60 ops/sec    | No        |
| RegExp          | 7.12 ops/sec  | 5.14 ops/sec    | No        |
| Splay           | 123 ops/sec   | 75.21 ops/sec   | No        |
| NavierStokes    | 2.40 ops/sec  | 3.13 ops/sec    | Yes       |
| PdfJS           | 2.85 ops/sec  | 2.68 ops/sec    | No        |
| Gameboy         | 0.98 ops/sec  | 0.35 ops/sec    | No        |
| CodeLoadClosure | 370 ops/sec   | 372 ops/sec     | Yes       |
| CodeLoadJQuery  | 8.83 ops/sec  | 10.61 ops/sec   | Yes       |
| Box2D           | 2.33 ops/sec  | 2.54 ops/sec    | Yes       |

Since trampoline is costly,
performance drops in most suites especially basic ones.
Whereas in relatively complex suites, there are some cases
when performance is improved. (Anybody interested why this is happening?)

Limitations
-----------

* Not all calls are transformed into CPS.
* `new Function` is not supported.
* First-class continuation is not supported.

TODOs
-----

* Work with try...catch and throw.
* Transform non-tail recursive calls into CPS.
