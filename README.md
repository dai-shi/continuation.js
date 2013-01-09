continuation.js
===============

CPS transformer with trampoline technique for Node.js

JavaScript is a nice programming language, but compared to Scheme,
it lacks the tail call optimization.
Node.js is often used with Callback Passing Style (CPS) programming,
but with a typical function call style.

This module allows to transform native JavaScript code into
Continuation Passing Style (CPS) code in a best effort manner.
It utilizes so-called trampoline technique to avoid the stack overflow error.
Transforming all function into CPS is tremendously hard,
hence it has a fallback mechanism, that is, only supported
function style is transformed into CPS and other functions are
called in an original style.

It is only tested with Node.js, but could be usable
with other JavaScript engines.

Comparison
----------

Here is the table showing related projects.

| NAME                    | continuation.js | [Continuation][1] | [Brushtail][2] | [Cinch][3] |
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

    % node -e "console.log(require('./sample/fact.js').fact(100000))"
    
    .../continuation.js/sample/fact.js:2
      function fact_tail(x, r) {
                            ^
    RangeError: Maximum call stack size exceeded
    
    % node -e "console.log(require('./cps_fact.js').fact(100000))"
    Infinity

### NPM

    % npm install continuation.js

and add the following:

    require('continuation.js').enable_on_require();

which transforms all following .js files by `require`.

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

Limitations
-----------

* There are some overhead, obviously.
* Not all calls are transformed into CPS.
* `new Function` is not supported.
* First-class continuation is not supported.

TODOs
-----

* Work with try...catch and throw.
* Better documents.
* Transform non-tail calls into CPS.
* More tests.
* Support for current continuations (feasible?)

