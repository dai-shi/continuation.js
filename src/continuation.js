/*
  Copyright (C) 2012 Daishi Kato <daishi@axlight.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jshint es5:true */

var esprima = require('esprima');
var escodegen = require('escodegen');
var assert = require('assert');
var _ = require('underscore');

var root = {};

root.parse = function(data) {
  return esprima.parse(data);
};

root.ast_prog_header = function() {
  var code = root.parse("(function() { if (typeof CpsFunction === 'undefined') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === 'undefined') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === 'undefined') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === 'undefined') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }})()");
  assert.equal(code.type, 'Program');
  assert.equal(code.body.length, 1);
  return code.body[0];
};

var new_variable_counter = 1;
root.generate_new_variable_name = function(prefix, exclude_ids) {
  var varname = prefix + new_variable_counter++;
  if (exclude_ids.indexOf(varname) >= 0) {
    return root.generate_new_variable_name(prefix, exclude_ids);
  } else {
    return varname;
  }
};

root.ast_func_wrapper = function(varname) {
  var code = root.parse("var " + varname + " = arguments[arguments.length - 1]; if (" + varname + " instanceof CpsContinuation) { } else { }");
  assert.equal(code.type, 'Program');
  assert.equal(code.body.length, 2);
  return code.body;
};

root.ast_fix_params = function(params) {
  var codeStr = 'switch (arguments.length - 1) {';
  for (var i = 0; i < params.length; i++) {
    assert.equal(params[i].type, 'Identifier');
    codeStr += 'case ' + i + ': ' + params[i].name + ' = undefined; break;';
  }
  codeStr += '}';
  var code = root.parse(codeStr);
  assert.equal(code.type, 'Program');
  assert.equal(code.body.length, 1);
  return code.body[0];
};

root.collect_all_identifiers = function(node) {
  var ids = [];
  var walk = function(node) {
    if (node && node.type === 'Identifier') {
      ids.push(node.name);
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(node);
  return ids;
};

root.check_if_using_arguments = function(node) {
  if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
    return false;
  } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
    return true;
  } else if (node instanceof Object) {
    return _.find(node, root.check_if_using_arguments);
  } else {
    return false;
  }
};

root.deep_clone = function(node) {
  //FIXME this must be too slow
  return JSON.parse(JSON.stringify(node));
};

root.transform_function_body = function(params, defaults, body) {
  assert.equal(body.type, 'BlockStatement');
  root.walk_ast(body.body);
  root.convert_function_declaration_to_expression(body.body);
  var exclude_ids = root.collect_all_identifiers(body.body);
  var k_varname = root.generate_new_variable_name('k', exclude_ids);
  var wrapper = root.ast_func_wrapper(k_varname);
  var using_arguments = root.check_if_using_arguments(body.body); //UNUSED

  // continuation call
  assert.equal(wrapper[1].consequent.type, 'BlockStatement');
  var newbody = root.deep_clone(body.body);
  root.convert_function_call_to_new_cps_call(exclude_ids, body.body);
  var success = root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
  if (!success) {
    newbody = root.create_fallback_cps_body(k_varname, body.body);
  }
  if (params.length > 0) {
    newbody.unshift(root.ast_fix_params(params));
  }
  wrapper[1].consequent.body = newbody;

  // normal call
  assert.equal(wrapper[1].alternate.type, 'BlockStatement');
  wrapper[1].alternate.body = body.body;

  // replace
  body.body = wrapper;
};

root.convert_function_declaration_to_expression = function(node) {
  if (node && node.type === 'FunctionExpression') {
    return;
  } else if (node && node.type === 'FunctionDeclaration') {
    assert.equal(node.id.type, 'Identifier');
    var idname = node.id.name;
    var newnode = _.clone(node); //shallow copy
    newnode.type = 'FunctionExpression';
    newnode.id = null;
    _.each(node, function(value, key) {
      delete node[key];
    });
    node.type = 'VariableDeclaration';
    node.declarations = [{
      type: 'VariableDeclarator',
      id: {
        type: 'Identifier',
        name: idname
      },
      init: newnode
    }],
    node.kind = 'var';
  } else if (node instanceof Object) {
    _.each(node, root.convert_function_declaration_to_expression);
  }
};

//XXX should exclude JS and Node functions that are certainly not CPS.
root.convert_function_call_to_new_cps_call = function(exclude_ids, body) {
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return;
    } else if (node && node.type === 'CallExpression') {
      var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
      var newnode = _.clone(node); //shallow copy
      newnode.arguments.push({
        type: 'Identifier',
        name: kk_varname
      });
      _.each(node, function(value, key) {
        delete node[key];
      });
      node.type = 'CallExpression',
      node.callee = {
        type: 'Identifier',
        name: 'CpsRun'
      };
      node.arguments = [{
        type: 'NewExpression',
        callee: {
          type: 'Identifier',
          name: 'CpsFunction'
        },
        arguments: [{
          type: 'FunctionExpression',
          id: null,
          params: [{
            type: 'Identifier',
            name: kk_varname
          }],
          defaults: [],
          body: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: newnode
            }]
          },
          rest: null,
          generator: false,
          expression: false
        }, {
          type: 'NewExpression',
          callee: {
            type: 'Identifier',
            name: 'CpsContinuation'
          },
          arguments: []
        }]
      }];
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(body);
};

//XXX so far only converting tail calls to cps
root.convert_normal_body_to_cps_body = function(k_varname, exclude_ids, body) {
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return true;
    } else if (node && node.type === 'CallExpression') {
      return false;
    } else if (node && node.type === 'ReturnStatement') {
      if (node.argument && node.argument.type === 'CallExpression') {
        var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
        node.argument.arguments.push({
          type: 'Identifier',
          name: kk_varname
        });
        var newargument = {
          type: 'NewExpression',
          callee: {
            type: 'Identifier',
            name: 'CpsFunction'
          },
          arguments: [{
            type: 'FunctionExpression',
            id: null,
            params: [{
              type: 'Identifier',
              name: kk_varname
            }],
            defaults: [],
            body: {
              type: 'BlockStatement',
              body: [{
                type: 'ReturnStatement',
                argument: node.argument
              }]
            },
            rest: null,
            generator: false,
            expression: false
          }, {
            type: 'Identifier',
            name: k_varname
          }]
        };
        node.argument = newargument;
        return true;
      } else {
        var success = walk(node.argument);
        if (success) {
          node.argument = {
            type: 'NewExpression',
            callee: {
              type: 'Identifier',
              name: 'CpsResult'
            },
            arguments: [{
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: k_varname
                },
                property: {
                  type: 'Identifier',
                  name: 'k'
                }
              },
              arguments: [node.argument || {
                type: 'Literal',
                value: null
              }]
            }]
          };
          return true;
        } else {
          return false;
        }
      }
    } else if (node instanceof Object) {
      return _.every(node, walk);
    } else {
      return true;
    }
  };
  return walk(body);
};

root.create_fallback_cps_body = function(k_varname, body) {
  return [{
    type: 'ReturnStatement',
    argument: {
      type: 'NewExpression',
      callee: {
        type: 'Identifier',
        name: 'CpsResult'
      },
      arguments: [{
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: k_varname
          },
          property: {
            type: 'Identifier',
            name: 'k'
          }
        },
        arguments: [{
          type: 'CallExpression',
          callee: {
            type: 'FunctionExpression',
            id: null,
            params: [],
            defaults: [],
            body: {
              type: 'BlockStatement',
              body: body
            },
            rest: null,
            generator: false,
            expression: false
          },
          arguments: []
        }]
      }]
    }
  }];
};

root.walk_ast = function(node) {
  if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
    root.transform_function_body(node.params, node.defaults, node.body);
  } else if (node instanceof Object) {
    _.each(node, root.walk_ast);
  }
};

root.transform = function(ast) {
  assert.equal(ast.type, 'Program');
  root.walk_ast(ast.body);
  ast.body.unshift(root.ast_prog_header());
  return ast;
};

root.generate = function(ast) {
  return escodegen.generate(ast);
};

root.compile = function(data) {
  return root.generate(root.transform(root.parse(data)));
};

root.compile_on_require = function() {
  var fs = require('fs');
  require.extensions['.js'] = function(module, filename) {
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      module._compile(root.transform(root.parse(data)), filename);
    });
  };
};

exports.compile = root.compile;
exports.compile_on_require = root.compile_on_require;

if (process.env.NODE_ENV === 'test') {
  exports.parse = root.parse;
  exports.transform = root.transform;
  exports.generate = root.generate;
}
