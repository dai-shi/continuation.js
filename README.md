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
<th><a href="http://glat.info/jscheck/tomrec.xhtml">tailopt.js</a></th>
</tr>
<tr>
<td>Tail call optimization</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Mutual recursion</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>Yes</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Native JavaScript</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>More or less</td>
<td>More or less</td>
</tr>
<tr>
<td>`require()` integration</td>
<td>Yes</td>
<td>No</td>
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

<table>
<tr>
<th>Suite name</th>
<th>Original</th>
<th>CPS transformed</th>
</tr>

<tr>
<td>Richards.Richards</td>
<td>364 ops/sec</td>
<td>28.14 ops/sec</td>
</tr>
<tr>
<td>DeltaBlue.DeltaBlue</td>
<td>181 ops/sec</td>
<td>23.87 ops/sec</td>
</tr>
<tr>
<td>Crypto.Encrypt</td>
<td>172 ops/sec</td>
<td>160 ops/sec</td>
</tr>
<tr>
<td>Crypto.Decrypt</td>
<td>9.08 ops/sec</td>
<td>8.52 ops/sec</td>
</tr>
<tr>
<td>RayTrace.RayTrace</td>
<td>18.54 ops/sec</td>
<td>5.21 ops/sec</td>
</tr>
<tr>
<td>EarleyBoyer.Earley</td>
<td>280 ops/sec</td>
<td>71.44 ops/sec</td>
</tr>
<tr>
<td>EarleyBoyer.Boyer</td>
<td>18.86 ops/sec</td>
<td>4.53 ops/sec</td>
</tr>
<tr>
<td>RegExp.RegExp</td>
<td>7.11 ops/sec</td>
<td>7.13 ops/sec</td>
</tr>
<tr>
<td>Splay.Splay</td>
<td>121 ops/sec</td>
<td>110 ops/sec</td>
</tr>
<tr>
<td>NavierStokes.NavierStokes</td>
<td>3.61 ops/sec</td>
<td>2.89 ops/sec</td>
</tr>
<tr>
<td>PdfJS.PdfJS</td>
<td>2.85 ops/sec</td>
<td>2.83 ops/sec</td>
</tr>
<tr>
<td>Gameboy.Gameboy</td>
<td>1.08 ops/sec</td>
<td>0.59 ops/sec</td>
</tr>
<tr>
<td>CodeLoad.CodeLoadClosure</td>
<td>382 ops/sec</td>
<td>368 ops/sec</td>
</tr>
<tr>
<td>CodeLoad.CodeLoadJQuery</td>
<td>10.01 ops/sec</td>
<td>11.12 ops/sec</td>
</tr>
<tr>
<td>Box2D.Box2D</td>
<td>2.53 ops/sec</td>
<td>2.55 ops/sec</td>
</tr>

</table>

Since trampoline is costly,
performance drops in most suites especially basic ones.
Whereas in relatively complex suites, there are some cases
when performance is comparable.

TODOs
-----

* Work with try...catch and throw.
* Transform simple non-tail recursive calls into CPS.
