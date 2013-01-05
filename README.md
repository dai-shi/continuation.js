continuation.js
===============

Continuation support for Node.js

* It transforms JavaScript code into Continuation Passing Style (CPS) code in a best effort manner.
* No new syntax or keyword is required.
* Fallback mechanism works when CPS is not possible or not implemented.
* Tail calls are properly handled.

Comparison
----------

Here is the table showing related projects.

| NAME                    | continuation.js | [Continuation][1] | [Brushtail][2] | [Cinch][3]   |
|-------------------------|-----------------|-------------------|----------------|--------------|
| Tail Call Optimization  | Yes             | Yes               | Yes            | No           |
| CPS                     | Yes             | Yes               | No             | Yes          |
| Native JavaScript       | Yes             | No                | Yes            | Yes (almost) |
| `require()` integration | Yes             | Yes               | No             | Yes          |

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

