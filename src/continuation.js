/*
  Copyright (C) 2013, Daishi Kato <daishi@axlight.com>
  All rights reserved.

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
  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
  THE POSSIBILITY OF SUCH DAMAGE.
*/

/* jshint es5: true */

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
  var ast = root.parse("if (typeof CpsFunction === 'undefined') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === 'undefined') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === 'undefined') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === 'undefined') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }");
  assert.equal(ast.type, 'Program');
  return ast.body;
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
  var code = "var " + l_varname + " = arguments.length - 1;";
  if (t_varname) {
    code += "var " + t_varname + " = this;";
  }
  if (a_varname) {
    code += "var " + a_varname + " = {}; for(var " + i_varname + " = 0; " + i_varname + " <= " + l_varname + "; " + i_varname + "++) { " + a_varname + "[" + i_varname + "] = arguments[" + i_varname + "]; }" + a_varname + ".length = 1 + " + l_varname + ";" + a_varname + ".callee = arguments.callee;";
  }
  var ast = root.parse(code);
  assert.equal(ast.type, 'Program');
  return ast.body;
};

root.ast_func_wrapper = function(k_varname, l_varname, a_varname, params) {
  var code = "var " + k_varname + " = arguments[" + l_varname + "]; if (" + k_varname + " instanceof CpsContinuation) { ";
  if (a_varname) {
    code += "delete " + a_varname + "[" + l_varname + "]; " + a_varname + ".length--;";
  }
  if (params.length > 0) {
    code += "if (" + l_varname + " === " + params.length + ") {";
    for (var i = params.length - 1; i >= 0; i--) {
      assert.equal(params[i].type, 'Identifier');
      code += "} else if (" + l_varname + " >= " + i + ") {" + params[i].name + " = undefined;";
    }
    code += "}";
  }
  code += "}";
  var ast = root.parse(code);
  assert.equal(ast.type, 'Program');
  return ast.body;
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
  var tmpbody = root.deep_clone(body);
  var using_this_var = false;
  var using_arguments = false;
  var cpsenabled = false;
  if (root.convert_function_call_to_cpsrun_call(tmpbody, exclude_ids)) { //XXX just checking if tail call exists, could be improved
    using_this_var = root.replace_this_var_with(body.body, t_varname);
    using_arguments = root.replace_arguments_with(body.body, a_varname);
    var newbody = root.deep_clone(body);
    root.convert_function_call_to_cpsrun_call(body, exclude_ids);
    cpsenabled = root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    var header = root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
    if (cpsenabled) {
      while (newbody.body.length > 0) {
        if (newbody.body[0].type === 'FunctionDeclaration') {
          newbody.body.shift();
        } else {
          break;
        }
      }
      var wrapper = root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
      assert.ok(wrapper[1].consequent.body.length >= 0);
      root.push(wrapper[1].consequent.body, newbody.body);
      root.push(wrapper[1].consequent.body, {
        type: 'ReturnStatement',
        argument: null
      });
      root.unshift(body.body, wrapper);
      root.unshift(body.body, header);
    } else if (using_this_var || using_arguments) {
      root.unshift(body.body, header);
    }
  }

  _.each(_.flatten(cps_func_ids), function(cps_func_id) {
    root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
  });
  return cpsenabled;
};

root.is_callee_having_side_effect = function(node) {
  var has_side_effect = function(node) {
    if (!node) {
      return false;
    } else if (node.type === 'FunctionExpression') {
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
  return node.callee && has_side_effect(node.callee);
};

root.is_callee_cpsenablewrapper = function(node) {
  return node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper';
};

// only converting tail calls
root.convert_function_call_to_cpsrun_call = function(body, exclude_ids) {
  var create_cpsrun_call = function(call_expression) {
    var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
    var call_expression1 = root.deep_clone(call_expression);
    var call_expression2 = root.deep_clone(call_expression);
    call_expression2.arguments.push({
      type: 'Identifier',
      name: kk_varname
    });
    return {
      type: 'ConditionalExpression',
      test: {
        type: 'MemberExpression',
        computed: false,
        object: call_expression1.callee,
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
                argument: call_expression2
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
        type: call_expression1.type,
        callee: call_expression1.callee,
        arguments: call_expression1.arguments
      }
    };
  };

  var is_callee_using_apply = function(node) {
    return node.callee && node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply';
  };

  // the walk function below returns the number of CpsRun transformation.
  var walk = function(node, tail, wrapped) {
    var transformed;
    var i;
    if (node === undefined || node === null) {
      return 0;

    } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
      return 0;

    } else if (node.type === 'CallExpression') {
      if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node) && !is_callee_using_apply(node)) {
        var newnode = create_cpsrun_call(node);
        _.each(node, function(value, key) {
          delete node[key];
        });
        _.extend(node, newnode);
        return 1;
      } else {
        return 0;
      }

    } else if (node.type === 'ConditionalExpression') {
      return walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);

    } else if (node.type === 'SequenceExpression') {
      transformed = 0;
      for (i = 0; i < node.expressions.length; i++) {
        transformed += walk(node.expressions[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
      return 0;

    } else if (node.type === 'BlockStatement') {
      transformed = 0;
      for (i = 0; i < node.body.length; i++) {
        transformed += walk(node.body[i], (i === node.body.length - 1 ? tail : false), wrapped);
      }
      return transformed;

    } else if (node.type === 'ExpressionStatement') {
      return walk(node.expression, tail, wrapped);

    } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
      return walk(node.body, false, wrapped) + walk(node.test, false, wrapped);

    } else if (node.type === 'ForStatement') {
      return walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped);

    } else if (node.type === 'ForInStatement') {
      return walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped);

    } else if (node.type === 'IfStatement') {
      return walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);

    } else if (node.type === 'LabeledStatement') {
      return walk(node.body, tail, wrapped);

    } else if (node.type === 'WithStatement') {
      return walk(node.body, tail, wrapped) + walk(node.object, false, wrapped);

    } else if (node.type === 'ReturnStatement') {
      return walk(node.argument, !wrapped, false);

    } else if (node.type === 'TryStatement') {
      transformed = walk(node.block, tail, true);
      for (i = 0; i < node.guardedHandlers.length; i++) {
        transformed += walk(node.guardedHandlers[i].body, tail, (node.finalizer ? true : wrapped));
      }
      for (i = 0; i < node.handlers.length; i++) {
        transformed += walk(node.handlers[i].body, tail, (node.finalizer ? true : wrapped));
      }
      transformed += walk(node.finalizer, tail, wrapped);
      return transformed;

    } else if (node.type === 'CatchClause') {
      return walk(node.body, tail, wrapped);

    } else if (node.type === 'ThrowStatement') {
      return walk(node.argument, false, wrapped);

    } else if (node.type === 'SwitchStatement') {
      transformed = walk(node.discriminant, false, wrapped);
      for (i = 0; i < node.cases.length; i++) {
        transformed += walk(node.cases[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'SwitchCase') {
      transformed = walk(node.test, false, wrapped);
      for (i = 0; i < node.consequent.length; i++) {
        transformed += walk(node.consequent[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
      return 0;

    } else if (node.type === 'VariableDeclaration') {
      transformed = 0;
      for (i = 0; i < node.declarations.length; i++) {
        transformed += walk(node.declarations[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'VariableDeclarator') {
      return walk(node.init, false, wrapped);

    } else if (node.type === 'Identifier') {
      return 0;

    } else if (node.type === 'Literal') {
      return 0;

    } else {
      console.warn('continuing with unexpected node type: ' + node.type);
      return 0;
    }
  };
  return walk(body, true, false);
};

// only converting tail calls
root.convert_normal_body_to_cps_body = function(k_varname, exclude_ids, body) {
  var create_cps_expression = function(call_expression) {
    var kk_varname = root.generate_new_variable_name('kk', exclude_ids);
    var call_expression1 = root.deep_clone(call_expression);
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
                object: call_expression1.callee,
                property: {
                  type: 'Identifier',
                  name: 'CpsEnabled'
                }
              },
              consequent: call_expression2,
              alternate: call_expression1

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

  var create_cps_result = function(expression) {
    return {
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
        arguments: [expression || {
          type: 'Literal',
          value: null
        }]
      }]
    };
  };

  // the walk function below returns the number of CpsFunction/CpsResult transformation.
  var walk = function(node, tail, wrapped) {
    var transformed;
    var i;
    if (node === undefined || node === null) {
      return 0;

    } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
      return 0;

    } else if (node.type === 'CallExpression') {
      if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node)) {
        var newnode = create_cps_expression(node);
        _.each(node, function(value, key) {
          delete node[key];
        });
        _.extend(node, newnode);
        return 1;
      } else {
        return 0;
      }

    } else if (node.type === 'ConditionalExpression') {
      return walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);

    } else if (node.type === 'SequenceExpression') {
      transformed = 0;
      for (i = 0; i < node.expressions.length; i++) {
        transformed += walk(node.expressions[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
      return 0;

    } else if (node.type === 'BlockStatement') {
      transformed = 0;
      for (i = 0; i < node.body.length; i++) {
        transformed += walk(node.body[i], (i === node.body.length - 1 ? tail : false), wrapped);
      }
      return transformed;

    } else if (node.type === 'ExpressionStatement') {
      transformed = walk(node.expression, tail, wrapped);
      if (transformed) {
        node.type = 'ReturnStatement';
        node.argument = node.expression;
        delete node.expression;
      }
      return transformed;

    } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
      return walk(node.body, false, wrapped) + walk(node.test, false, wrapped);

    } else if (node.type === 'ForStatement') {
      return walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped);

    } else if (node.type === 'ForInStatement') {
      return walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped);

    } else if (node.type === 'IfStatement') {
      return walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);

    } else if (node.type === 'LabeledStatement') {
      return walk(node.body, tail, wrapped);

    } else if (node.type === 'WithStatement') {
      return walk(node.body, tail, wrapped) + walk(node.object, false, wrapped);

    } else if (node.type === 'ReturnStatement') {
      transformed = walk(node.argument, !wrapped, false);
      if (transformed === 0) {
        node.argument = create_cps_result(node.argument);
      }
      return transformed;

    } else if (node.type === 'TryStatement') {
      transformed = walk(node.block, tail, true);
      for (i = 0; i < node.guardedHandlers.length; i++) {
        transformed += walk(node.guardedHandlers[i].body, tail, (node.finalizer ? true : wrapped));
      }
      for (i = 0; i < node.handlers.length; i++) {
        transformed += walk(node.handlers[i].body, tail, (node.finalizer ? true : wrapped));
      }
      transformed += walk(node.finalizer, tail, wrapped);
      return transformed;

    } else if (node.type === 'CatchClause') {
      return walk(node.body, tail, wrapped);

    } else if (node.type === 'ThrowStatement') {
      return walk(node.argument, false, wrapped);

    } else if (node.type === 'SwitchStatement') {
      transformed = walk(node.discriminant, false, wrapped);
      for (i = 0; i < node.cases.length; i++) {
        transformed += walk(node.cases[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'SwitchCase') {
      transformed = walk(node.test, false, wrapped);
      for (i = 0; i < node.consequent.length; i++) {
        transformed += walk(node.consequent[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
      return 0;

    } else if (node.type === 'VariableDeclaration') {
      transformed = 0;
      for (i = 0; i < node.declarations.length; i++) {
        transformed += walk(node.declarations[i], false, wrapped);
      }
      return transformed;

    } else if (node.type === 'VariableDeclarator') {
      return walk(node.init, false, wrapped);

    } else if (node.type === 'Identifier') {
      return 0;

    } else if (node.type === 'Literal') {
      return 0;

    } else {
      console.warn('continuing with unexpected node type: ' + node.type);
      return 0;
    }
  };
  return walk(body, true, false);
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

root.saved_require_js_function = null;

root.enable_on_require = function() {
  var fs = require('fs');
  if (!root.saved_require_js_function) {
    root.saved_require_js_function = require.extensions['.js'];
    require.extensions['.js'] = function(module, filename) {
      var data = fs.readFileSync(filename, 'utf8');
      module._compile(root.compile(data), filename);
    };
  }
};

root.disable_on_require = function() {
  if (root.saved_require_js_function) {
    require.extensions['.js'] = root.saved_require_js_function;
    root.saved_require_js_function = null;
  }
};


exports.compile = root.compile;
exports.enable_on_require = root.enable_on_require;
exports.disable_on_require = root.disable_on_require;

if (process.env.NODE_ENV === 'test') {
  exports.parse = root.parse;
  exports.transform = root.transform;
  exports.generate = root.generate;
}
