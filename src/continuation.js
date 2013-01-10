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

root.push = function(lst, itm) {
  if (Array.isArray(itm)) {
    for (var i = 0; i < itm.length; i++) {
      lst.push(itm[i]);
    }
  } else {
    lst.push(itm);
  }
};

root.unshift = function(lst, itm, force) {
  if (Array.isArray(itm)) {
    itm = itm.reverse();
  } else {
    itm = [itm];
  }
  if (!force) {
    while (lst.length > 0 && lst[0].type === 'FunctionDeclaration') {
      itm.push(lst.shift());
    }
  }
  for (var i = 0; i < itm.length; i++) {
    lst.unshift(itm[i]);
  }
};

root.ast_prog_header = function() {
  var code = root.parse("if (typeof CpsFunction === 'undefined') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === 'undefined') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === 'undefined') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === 'undefined') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }");
  assert.equal(code.type, 'Program');
  return code.body;
};

root.new_variable_counter = 1;
root.generate_new_variable_name = function(prefix, exclude_ids) {
  var varname = prefix + root.new_variable_counter++;
  if (exclude_ids.indexOf(varname) >= 0) {
    return root.generate_new_variable_name(prefix, exclude_ids);
  } else {
    return varname;
  }
};

root.ast_func_header = function(l_varname, t_varname, a_varname, exclude_ids) {
  var i_varname = root.generate_new_variable_name('i', exclude_ids);
  var thisCopy = '';
  if (t_varname) {
    thisCopy = "var " + t_varname + " = this;";
  }
  var argsCopy = '';
  if (a_varname) {
    argsCopy = "var " + a_varname + " = {}; for(var " + i_varname + " = 0; " + i_varname + " <= " + l_varname + "; " + i_varname + "++) { " + a_varname + "[" + i_varname + "] = arguments[" + i_varname + "]; }" + a_varname + ".length = 1 + " + l_varname + ";" + a_varname + ".callee = arguments.callee;";
  }
  var code = root.parse("var " + l_varname + " = arguments.length - 1;" + thisCopy + argsCopy);
  assert.equal(code.type, 'Program');
  return code.body;
};

root.ast_func_wrapper = function(k_varname, l_varname, a_varname, params) {
  var argsPop = '';
  if (a_varname) {
    argsPop = "delete " + a_varname + "[" + l_varname + "]; " + a_varname + ".length--;";
  }
  var fixParams = '';
  if (params.length > 0) {
    fixParams = 'if (' + l_varname + ' >= ' + params.length + ') {';
    for (var i = params.length - 1; i >= 0; i--) {
      assert.equal(params[i].type, 'Identifier');
      fixParams += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
    }
    fixParams += '}';
  }
  var code = root.parse("var " + k_varname + " = arguments[" + l_varname + "]; if (" + k_varname + " instanceof CpsContinuation) { " + argsPop + fixParams + "}");
  assert.equal(code.type, 'Program');
  return code.body;
};

root.collect_all_identifiers = function(node) {
  var ids = [];
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return;
    } else if (node && node.type === 'Identifier') {
      ids.push(node.name);
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(node);
  return ids;
};

root.replace_this_var_with = function(body, t_varname) {
  var using_this_var = false;
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return;
    } else if (node && node.type === 'ThisExpression') {
      node.type = 'Identifier';
      node.name = t_varname;
      using_this_var = true;
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(body);
  return using_this_var;
};

root.replace_arguments_with = function(body, a_varname) {
  var using_arguments = false;
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return;
    } else if (node && node.type === 'Property') {
      return;
    } else if (node && node.type === 'MemberExpression') {
      walk(node.object);
    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
      node.name = a_varname;
      using_arguments = true;
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(body);
  return using_arguments;
};

root.deep_clone = function(node) {
  if (node instanceof Date) {
    return node;
  } else if (node instanceof RegExp) {
    return node;
  } else if (Array.isArray(node)) {
    return _.map(node, root.deep_clone);
  } else if (node instanceof Object) {
    return _.object(_.map(_.pairs(node), function(x) {
      return [x[0], root.deep_clone(x[1])];
    }));
  } else {
    return node;
  }
};

root.transform_function_body = function(params, defaults, body, exclude_ids) {
  assert.equal(body.type, 'BlockStatement');
  if (body.body.length === 0) {
    // we should not transform empty functions
    return false;
  }
  var cps_func_ids = root.walk_ast(body.body);
  var l_varname = root.generate_new_variable_name('l', exclude_ids);
  var k_varname = root.generate_new_variable_name('k', exclude_ids);
  var t_varname = root.generate_new_variable_name('t', exclude_ids);
  var a_varname = root.generate_new_variable_name('a', exclude_ids);
  var using_this_var = root.replace_this_var_with(body.body, t_varname);
  var using_arguments = root.replace_arguments_with(body.body, a_varname);
  var header = root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
  var newbody = root.deep_clone(body.body);
  root.convert_function_call_to_new_cps_call(body.body, exclude_ids);
  var success = root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
  if (success) {
    while (newbody.length > 0) {
      if (newbody[0].type === 'FunctionDeclaration') {
        newbody.shift();
      } else {
        break;
      }
    }
    var wrapper = root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
    assert.ok(wrapper[1].consequent.body.length >= 0);
    root.push(wrapper[1].consequent.body, newbody);
    root.push(wrapper[1].consequent.body, {
      type: 'ReturnStatement',
      argument: null
    });
    root.unshift(body.body, wrapper);
    root.unshift(body.body, header);
  } else if (using_this_var || using_arguments) {
    root.unshift(body.body, header);
  }
  _.each(_.flatten(cps_func_ids), function(cps_func_id) {
    root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
  });
  return success;
};

root.convert_function_call_to_new_cps_call = function(body, exclude_ids) {
  var has_side_effect = function(node) {
    if (!node) {
      return false;
    } else if (node.type === 'FunctionExpression') { //not really side-effect
      return true;
    } else if (node.type === 'CallExpression') {
      return true;
    } else if (node.type === 'UpdateExpression') {
      return true;
    } else if (node.type === 'AssignmentExpression') {
      return true;
    } else if (node.type === 'NewExpression') {
      return true;
    } else if (node instanceof Object) {
      return _.some(node, has_side_effect);
    } else {
      return false;
    }
  };
  var is_transformable_call = function(node) {
    if (!node.callee) {
      return false;
    } else if (has_side_effect(node.callee)) {
      return false;
    } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
      return false;
    } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
      return false;
    } else {
      return true;
    }
  };
  var walk = function(node) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return;
    } else if (node && node.type === 'CallExpression' && is_transformable_call(node)) {
      var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
      var cpsnode = root.deep_clone(node);
      cpsnode.arguments.push({
        type: 'Identifier',
        name: kk_varname
      });
      var newnode = {
        type: 'ConditionalExpression',
        test: {
          type: 'MemberExpression',
          computed: false,
          object: node.callee,
          property: {
            type: 'Identifier',
            name: 'CpsEnabled'
          }
        },
        consequent: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'CpsRun'
          },
          arguments: [{
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
                  argument: cpsnode
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
          }]
        },
        alternate: {
          type: node.type,
          callee: node.callee,
          arguments: node.arguments
        }
      };
      _.each(node, function(value, key) {
        delete node[key];
      });
      _.extend(node, newnode);
    } else if (node instanceof Object) {
      _.each(node, walk);
    }
  };
  walk(body);
};

root.convert_statements_into_cps = function(k_varname, exclude_ids, statements) {
  var i = 0;
  while (i < statements.length) {
    assert.ok(statements[i].type);
    assert.equal(statements[i].type.slice(-9), 'Statement');
    var converted = root.convert_statement_into_cps(k_varname, exclude_ids, statements[i], statements.slice(i + 1));
    if (converted) {
      statements.splice(i + 1);
      statements[i] = {
        type: 'ReturnStatement',
        argument: converted
      };
      break;
    }
  }
};

root.convert_statement_into_cps = function(k_varname, exlude_ids, statement, rest) {
  if (statement.type === 'ExpressionStatement') {
    //TODO
  } else {
    return false;
  }
};

// only converting obvious tail calls or return calls to cps
root.convert_normal_body_to_cps_body = function(k_varname, exclude_ids, body) {
  var create_cps_expression = function(call_expression) {
    var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
    var call_expression2 = root.deep_clone(call_expression);
    call_expression2.arguments.push({
      type: 'Identifier',
      name: kk_varname
    });
    return {
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
            argument: {
              type: 'ConditionalExpression',
              test: {
                type: 'MemberExpression',
                computed: false,
                object: call_expression.callee,
                property: {
                  type: 'Identifier',
                  name: 'CpsEnabled'
                }
              },
              consequent: call_expression2,
              alternate: call_expression

            }
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
  };
  var walk = function(node, tail) {
    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
      return true;
    } else if (node && node.type === 'CallExpression' && !(node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper')) {
      return false;
    } else if (node && node.type === 'ReturnStatement') {
      if (node.argument && node.argument.type === 'CallExpression' && !(node.argument.callee && node.argument.callee.type === 'FunctionExpression')) {
        node.argument = create_cps_expression(node.argument);
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
    } else if (tail && node && node.type === 'IfStatement') {
      return walk(node.consequent, tail) && walk(node.alternate, tail);
    } else if (tail && node && node.type === 'BlockStatement') {
      return walk(node.body, tail);
    } else if (tail && Array.isArray(node)) {
      for (var i = 0; i < node.length - 1; i++) {
        var result = walk(node[i]);
        if (!result) {
          return false;
        }
      }
      var lastone = node[node.length - 1];
      if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression' && !(lastone.expression.callee && lastone.expression.callee.type === 'FunctionExpression')) {
        node[node.length - 1] = {
          type: 'ReturnStatement',
          argument: create_cps_expression(lastone.expression)
        };
        return true;
      } else {
        return walk(lastone, tail);
      }
    } else if (node instanceof Object) {
      return _.every(node, function(x) {
        return walk(x);
      });
    } else {
      return true;
    }
  };
  return walk(body, true);
};

root.create_cpsenabled_statement = function(cps_func_id) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: cps_func_id
        },
        property: {
          type: 'Identifier',
          name: 'CpsEnabled'
        }
      },
      right: {
        type: 'Literal',
        value: true
      }
    }
  };
};

root.walk_ast = function(node) {
  var exclude_ids;
  if (node && node.type === 'FunctionDeclaration') {
    exclude_ids = root.collect_all_identifiers(node.body);
    if (root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
      assert.equal(node.id.type, 'Identifier');
      return node.id.name;
    } else {
      return [];
    }
  } else if (node && node.type === 'FunctionExpression') {
    exclude_ids = root.collect_all_identifiers(node.body);
    if (root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
      var ff_varname = root.generate_new_variable_name('ff', exclude_ids);
      var newnode = {
        type: 'CallExpression',
        callee: {
          type: 'FunctionExpression',
          id: {
            type: 'Identifier',
            name: 'CpsEnableWrapper'
          },
          params: [],
          defaults: [],
          body: {
            type: 'BlockStatement',
            body: [{
              type: 'VariableDeclaration',
              declarations: [{
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: ff_varname
                },
                init: {
                  type: node.type,
                  id: node.id,
                  params: node.params,
                  defaults: node.defaults,
                  body: node.body,
                  rest: node.rest,
                  generator: node.generator,
                  expression: node.expression
                }
              }],
              kind: 'var'
            },
            root.create_cpsenabled_statement(ff_varname), {
              type: 'ReturnStatement',
              argument: {
                type: 'Identifier',
                name: ff_varname
              }
            }],
            rest: null,
            generator: false,
            expression: false
          }
        },
        arguments: []
      };

      _.each(node, function(value, key) {
        delete node[key];
      });
      _.extend(node, newnode);
    }
    return [];
  } else if (node && node.type === 'CallExpression') {
    // ignore functions in CallExpression
    return [];
  } else if (node instanceof Object) {
    return _.map(node, root.walk_ast);
  } else {
    return [];
  }
};

root.transform = function(ast) {
  assert.equal(ast.type, 'Program');
  var cps_func_ids = root.walk_ast(ast.body);
  _.each(_.flatten(cps_func_ids), function(cps_func_id) {
    root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
  });
  root.unshift(ast.body, root.ast_prog_header(), true);
  return ast;
};

root.generate = function(ast) {
  return escodegen.generate(ast);
};

root.compile = function(data) {
  return root.generate(root.transform(root.parse(data)));
};

root.enable_on_require = function() {
  var fs = require('fs');
  require.extensions['.js'] = function(module, filename) {
    var data = fs.readFileSync(filename, 'utf8');
    module._compile(root.compile(data), filename);
  };
};

//XXX not sure if this is really identical to the original function.
root.disable_on_require = function() {
  var fs = require('fs');
  require.extensions['.js'] = function(module, filename) {
    var data = fs.readFileSync(filename, 'utf8');
    module._compile(data, filename);
  };
};


exports.compile = root.compile;
exports.enable_on_require = root.enable_on_require;
exports.disable_on_require = root.disable_on_require;

if (process.env.NODE_ENV === 'test') {
  exports.parse = root.parse;
  exports.transform = root.transform;
  exports.generate = root.generate;
}
