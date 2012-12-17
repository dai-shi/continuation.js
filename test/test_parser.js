var assert = require('assert');

process.env.NODE_ENV = 'test';
var continuation = require('../src/continuation.js');

describe('basic parser', function() {

  it('should parse empty functions', function(done) {
    assert.deepEqual(continuation.parse('function foo(){}'), {
      "type": "Program",
      "body": [{
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "foo"
        },
        "params": [],
        "defaults": [],
        "body": {
          "type": "BlockStatement",
          "body": []
        },
        "rest": null,
        "generator": false,
        "expression": false
      }]
    });
    assert.deepEqual(continuation.parse('foo = function(){}'), {
      "type": "Program",
      "body": [{
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "operator": "=",
          "left": {
            "type": "Identifier",
            "name": "foo"
          },
          "right": {
            "type": "FunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "rest": null,
            "generator": false,
            "expression": false
          }
        }
      }]
    });
    assert.deepEqual(continuation.parse('var foo = function(){}'), {
      "type": "Program",
      "body": [{
        "type": "VariableDeclaration",
        "declarations": [{
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "foo"
          },
          "init": {
            "type": "FunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "rest": null,
            "generator": false,
            "expression": false
          }
        }],
        "kind": "var"
      }]
    });
    done();
  });

  it('should parse some functions', function(done) {
    assert.deepEqual(continuation.parse('function foo(){console.log(arguments[3]);for(var i = 0; ; ){}}'), {
      "type": "Program",
      "body": [{
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "foo"
        },
        "params": [],
        "defaults": [],
        "body": {
          "type": "BlockStatement",
          "body": [{
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                  "type": "Identifier",
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "name": "log"
                }
              },
              "arguments": [{
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "arguments"
                },
                "property": {
                  "type": "Literal",
                  "value": 3
                }
              }]
            }
          }, {
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [{
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 0
                }
              }],
              "kind": "var"
            },
            "test": null,
            "update": null,
            "body": {
              "type": "BlockStatement",
              "body": []
            }
          }]
        },
        "rest": null,
        "generator": false,
        "expression": false
      }]
    });
    assert.deepEqual(continuation.parse('function foo() { var x = 1; return bar(x, 2) * 2; }'), {
      "type": "Program",
      "body": [{
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "foo"
        },
        "params": [],
        "defaults": [],
        "body": {
          "type": "BlockStatement",
          "body": [{
            "type": "VariableDeclaration",
            "declarations": [{
              "type": "VariableDeclarator",
              "id": {
                "type": "Identifier",
                "name": "x"
              },
              "init": {
                "type": "Literal",
                "value": 1
              }
            }],
            "kind": "var"
          }, {
            "type": "ReturnStatement",
            "argument": {
              "type": "BinaryExpression",
              "operator": "*",
              "left": {
                "type": "CallExpression",
                "callee": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "arguments": [{
                  "type": "Identifier",
                  "name": "x"
                }, {
                  "type": "Literal",
                  "value": 2
                }]
              },
              "right": {
                "type": "Literal",
                "value": 2
              }
            }
          }]
        },
        "rest": null,
        "generator": false,
        "expression": false
      }]
    });
    done();
  });


});
