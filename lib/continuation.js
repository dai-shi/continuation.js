if (typeof CpsFunction === 'undefined') {
    CpsFunction = function (f, k) {
        this.f = f;
        this.k = k;
    };
}
if (typeof CpsContinuation === 'undefined') {
    CpsContinuation = function (k) {
        if (k) {
            this.k = k;
        } else {
            this.k = function (r) {
                return r;
            };
        }
    };
}
if (typeof CpsResult === 'undefined') {
    CpsResult = function (r) {
        this.r = r;
    };
}
if (typeof CpsRun === 'undefined') {
    CpsRun = function (x) {
        var last_k;
        while (x instanceof CpsFunction) {
            last_k = x.k;
            x = x.f(x.k);
        }
        if (x instanceof CpsResult) {
            return x.r;
        } else {
            return last_k.k(x);
        }
    };
}
var esprima = require('esprima');
var escodegen = require('escodegen');
var assert = require('assert');
var _ = require('underscore');
var root = {};
root.parse = function CpsEnableWrapper() {
    var ff9 = function (data) {
        var l1 = arguments.length - 1;
        var k2 = arguments[l1];
        if (k2 instanceof CpsContinuation) {
            if (l1 === 1) {
            } else if (l1 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk7) {
                return esprima.parse.CpsEnabled ? esprima.parse(data, kk7) : esprima.parse(data);
            }, k2);
            return;
        }
        return esprima.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk6) {
            return esprima.parse(data, kk6);
        }, new CpsContinuation())) : esprima.parse(data);
    };
    ff9.CpsEnabled = true;
    return ff9;
}();
root.push = function CpsEnableWrapper() {
    var ff18 = function (lst, itm) {
        var l10 = arguments.length - 1;
        var k11 = arguments[l10];
        if (k11 instanceof CpsContinuation) {
            if (l10 === 2) {
            } else if (l10 >= 1) {
                itm = undefined;
            } else if (l10 >= 0) {
                lst = undefined;
            }
            if (Array.isArray(itm)) {
                for (var i = 0; i < itm.length; i++) {
                    lst.push(itm[i]);
                }
            } else {
                return new CpsFunction(function (kk16) {
                    return lst.push.CpsEnabled ? lst.push(itm, kk16) : lst.push(itm);
                }, k11);
            }
            return;
        }
        if (Array.isArray(itm)) {
            for (var i = 0; i < itm.length; i++) {
                lst.push(itm[i]);
            }
        } else {
            lst.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk15) {
                return lst.push(itm, kk15);
            }, new CpsContinuation())) : lst.push(itm);
        }
    };
    ff18.CpsEnabled = true;
    return ff18;
}();
root.unshift = function (lst, itm, force) {
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
root.ast_prog_header = function () {
    var ast = root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }');
    assert.equal(ast.type, 'Program');
    return ast.body;
};
root.new_variable_counter = 1;
root.generate_new_variable_name = function CpsEnableWrapper() {
    var ff35 = function (prefix, exclude_ids) {
        var l27 = arguments.length - 1;
        var k28 = arguments[l27];
        if (k28 instanceof CpsContinuation) {
            if (l27 === 2) {
            } else if (l27 >= 1) {
                exclude_ids = undefined;
            } else if (l27 >= 0) {
                prefix = undefined;
            }
            var varname = prefix + root.new_variable_counter++;
            if (exclude_ids.indexOf(varname) >= 0) {
                return new CpsFunction(function (kk33) {
                    return root.generate_new_variable_name.CpsEnabled ? root.generate_new_variable_name(prefix, exclude_ids, kk33) : root.generate_new_variable_name(prefix, exclude_ids);
                }, k28);
            } else {
                return new CpsResult(k28.k(varname));
            }
            return;
        }
        var varname = prefix + root.new_variable_counter++;
        if (exclude_ids.indexOf(varname) >= 0) {
            return root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk32) {
                return root.generate_new_variable_name(prefix, exclude_ids, kk32);
            }, new CpsContinuation())) : root.generate_new_variable_name(prefix, exclude_ids);
        } else {
            return varname;
        }
    };
    ff35.CpsEnabled = true;
    return ff35;
}();
root.ast_func_header = function (l_varname, t_varname, a_varname, exclude_ids) {
    var i_varname = root.generate_new_variable_name('i', exclude_ids);
    var code = 'var ' + l_varname + ' = arguments.length - 1;';
    if (t_varname) {
        code += 'var ' + t_varname + ' = this;';
    }
    if (a_varname) {
        code += 'var ' + a_varname + ' = {}; for(var ' + i_varname + ' = 0; ' + i_varname + ' <= ' + l_varname + '; ' + i_varname + '++) { ' + a_varname + '[' + i_varname + '] = arguments[' + i_varname + ']; }' + a_varname + '.length = 1 + ' + l_varname + ';' + a_varname + '.callee = arguments.callee;';
    }
    var ast = root.parse(code);
    assert.equal(ast.type, 'Program');
    return ast.body;
};
root.ast_func_wrapper = function (k_varname, l_varname, a_varname, params) {
    var code = 'var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ';
    if (a_varname) {
        code += 'delete ' + a_varname + '[' + l_varname + ']; ' + a_varname + '.length--;';
    }
    if (params.length > 0) {
        code += 'if (' + l_varname + ' === ' + params.length + ') {';
        for (var i = params.length - 1; i >= 0; i--) {
            assert.equal(params[i].type, 'Identifier');
            code += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
        }
        code += '}';
    }
    code += '}';
    var ast = root.parse(code);
    assert.equal(ast.type, 'Program');
    return ast.body;
};
root.collect_all_identifiers = function (node) {
    var ids = [];
    var walk = function CpsEnableWrapper() {
            var ff55 = function (node) {
                var l44 = arguments.length - 1;
                var k45 = arguments[l44];
                if (k45 instanceof CpsContinuation) {
                    if (l44 === 1) {
                    } else if (l44 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k45.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk52) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk52) : ids.push(node.name);
                        }, k45);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk53) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk53) : _.each(node, walk);
                        }, k45);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk50) {
                        return ids.push(node.name, kk50);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk51) {
                        return _.each(node, walk, kk51);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff55.CpsEnabled = true;
            return ff55;
        }();
    walk(node);
    return ids;
};
root.replace_this_var_with = function (body, t_varname) {
    var using_this_var = false;
    var walk = function CpsEnableWrapper() {
            var ff68 = function (node) {
                var l60 = arguments.length - 1;
                var k61 = arguments[l60];
                if (k61 instanceof CpsContinuation) {
                    if (l60 === 1) {
                    } else if (l60 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k61.k(null));
                    } else if (node && node.type === 'ThisExpression') {
                        node.type = 'Identifier';
                        node.name = t_varname;
                        using_this_var = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk66) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk66) : _.each(node, walk);
                        }, k61);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'ThisExpression') {
                    node.type = 'Identifier';
                    node.name = t_varname;
                    using_this_var = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk65) {
                        return _.each(node, walk, kk65);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff68.CpsEnabled = true;
            return ff68;
        }();
    walk(body);
    return using_this_var;
};
root.replace_arguments_with = function (body, a_varname) {
    var using_arguments = false;
    var walk = function CpsEnableWrapper() {
            var ff84 = function (node) {
                var l73 = arguments.length - 1;
                var k74 = arguments[l73];
                if (k74 instanceof CpsContinuation) {
                    if (l73 === 1) {
                    } else if (l73 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k74.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k74.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk81) {
                            return walk.CpsEnabled ? walk(node.object, kk81) : walk(node.object);
                        }, k74);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk82) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk82) : _.each(node, walk);
                        }, k74);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk79) {
                        return walk(node.object, kk79);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk80) {
                        return _.each(node, walk, kk80);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff84.CpsEnabled = true;
            return ff84;
        }();
    walk(body);
    return using_arguments;
};
root.deep_clone = function CpsEnableWrapper() {
    var ff100 = function (node) {
        var l89 = arguments.length - 1;
        var k90 = arguments[l89];
        if (k90 instanceof CpsContinuation) {
            if (l89 === 1) {
            } else if (l89 >= 0) {
                node = undefined;
            }
            if (node instanceof Date) {
                return new CpsResult(k90.k(node));
            } else if (node instanceof RegExp) {
                return new CpsResult(k90.k(node));
            } else if (Array.isArray(node)) {
                return new CpsFunction(function (kk97) {
                    return _.map.CpsEnabled ? _.map(node, root.deep_clone, kk97) : _.map(node, root.deep_clone);
                }, k90);
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk98) {
                    return _.object.CpsEnabled ? _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }), kk98) : _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }));
                }, k90);
            } else {
                return new CpsResult(k90.k(node));
            }
            return;
        }
        if (node instanceof Date) {
            return node;
        } else if (node instanceof RegExp) {
            return node;
        } else if (Array.isArray(node)) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk95) {
                return _.map(node, root.deep_clone, kk95);
            }, new CpsContinuation())) : _.map(node, root.deep_clone);
        } else if (node instanceof Object) {
            return _.object.CpsEnabled ? CpsRun(new CpsFunction(function (kk96) {
                return _.object(_.map(_.pairs(node), function (x) {
                    return [
                        x[0],
                        root.deep_clone(x[1])
                    ];
                }), kk96);
            }, new CpsContinuation())) : _.object(_.map(_.pairs(node), function (x) {
                return [
                    x[0],
                    root.deep_clone(x[1])
                ];
            }));
        } else {
            return node;
        }
    };
    ff100.CpsEnabled = true;
    return ff100;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal(body.type, 'BlockStatement');
    if (body.body.length === 0) {
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
    if (root.convert_function_call_to_cpsrun_call(tmpbody, exclude_ids)) {
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
    _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
    });
    return cpsenabled;
};
root.is_callee_having_side_effect = function (node) {
    var has_side_effect = function CpsEnableWrapper() {
            var ff113 = function (node) {
                var l105 = arguments.length - 1;
                var k106 = arguments[l105];
                if (k106 instanceof CpsContinuation) {
                    if (l105 === 1) {
                    } else if (l105 >= 0) {
                        node = undefined;
                    }
                    if (!node) {
                        return new CpsResult(k106.k(false));
                    } else if (node.type === 'FunctionExpression') {
                        return new CpsResult(k106.k(true));
                    } else if (node.type === 'CallExpression') {
                        return new CpsResult(k106.k(true));
                    } else if (node.type === 'UpdateExpression') {
                        return new CpsResult(k106.k(true));
                    } else if (node.type === 'AssignmentExpression') {
                        return new CpsResult(k106.k(true));
                    } else if (node.type === 'NewExpression') {
                        return new CpsResult(k106.k(true));
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk111) {
                            return _.some.CpsEnabled ? _.some(node, has_side_effect, kk111) : _.some(node, has_side_effect);
                        }, k106);
                    } else {
                        return new CpsResult(k106.k(false));
                    }
                    return;
                }
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
                    return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk110) {
                        return _.some(node, has_side_effect, kk110);
                    }, new CpsContinuation())) : _.some(node, has_side_effect);
                } else {
                    return false;
                }
            };
            ff113.CpsEnabled = true;
            return ff113;
        }();
    return node.callee && has_side_effect(node.callee);
};
root.is_callee_cpsenablewrapper = function (node) {
    return node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper';
};
root.convert_function_call_to_cpsrun_call = function CpsEnableWrapper() {
    var ff162 = function (body, exclude_ids) {
        var l154 = arguments.length - 1;
        var k155 = arguments[l154];
        if (k155 instanceof CpsContinuation) {
            if (l154 === 2) {
            } else if (l154 >= 1) {
                exclude_ids = undefined;
            } else if (l154 >= 0) {
                body = undefined;
            }
            var create_cpsrun_call = function (call_expression) {
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
                                arguments: [
                                    {
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
                                    },
                                    {
                                        type: 'NewExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'CpsContinuation'
                                        },
                                        arguments: []
                                    }
                                ]
                            }]
                    },
                    alternate: {
                        type: call_expression1.type,
                        callee: call_expression1.callee,
                        arguments: call_expression1.arguments
                    }
                };
            };
            var is_callee_using_apply = function (node) {
                return node.callee && node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply';
            };
            var walk = function CpsEnableWrapper() {
                    var ff153 = function (node, tail, wrapped) {
                        var l130 = arguments.length - 1;
                        var k131 = arguments[l130];
                        if (k131 instanceof CpsContinuation) {
                            if (l130 === 3) {
                            } else if (l130 >= 2) {
                                wrapped = undefined;
                            } else if (l130 >= 1) {
                                tail = undefined;
                            } else if (l130 >= 0) {
                                node = undefined;
                            }
                            var transformed;
                            var i;
                            if (node === undefined || node === null) {
                                return new CpsResult(k131.k(0));
                            } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                                return new CpsResult(k131.k(0));
                            } else if (node.type === 'CallExpression') {
                                if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node) && !is_callee_using_apply(node)) {
                                    var newnode = create_cpsrun_call(node);
                                    _.each(node, function (value, key) {
                                        delete node[key];
                                    });
                                    _.extend(node, newnode);
                                    return new CpsResult(k131.k(1));
                                } else {
                                    return new CpsResult(k131.k(0));
                                }
                            } else if (node.type === 'ConditionalExpression') {
                                return new CpsResult(k131.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'SequenceExpression') {
                                transformed = 0;
                                for (i = 0; i < node.expressions.length; i++) {
                                    transformed += walk(node.expressions[i], false, wrapped);
                                }
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
                                return new CpsResult(k131.k(0));
                            } else if (node.type === 'BlockStatement') {
                                transformed = 0;
                                for (i = 0; i < node.body.length; i++) {
                                    transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                                }
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'ExpressionStatement') {
                                return new CpsFunction(function (kk146) {
                                    return walk.CpsEnabled ? walk(node.expression, tail, wrapped, kk146) : walk(node.expression, tail, wrapped);
                                }, k131);
                            } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                                return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                            } else if (node.type === 'ForStatement') {
                                return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                            } else if (node.type === 'ForInStatement') {
                                return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                            } else if (node.type === 'IfStatement') {
                                return new CpsResult(k131.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'LabeledStatement') {
                                return new CpsFunction(function (kk147) {
                                    return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk147) : walk(node.body, tail, wrapped);
                                }, k131);
                            } else if (node.type === 'WithStatement') {
                                return new CpsResult(k131.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                            } else if (node.type === 'ReturnStatement') {
                                return new CpsFunction(function (kk148) {
                                    return walk.CpsEnabled ? walk(node.argument, !wrapped, false, kk148) : walk(node.argument, !wrapped, false);
                                }, k131);
                            } else if (node.type === 'TryStatement') {
                                transformed = walk(node.block, tail, true);
                                for (i = 0; i < node.guardedHandlers.length; i++) {
                                    transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                                }
                                for (i = 0; i < node.handlers.length; i++) {
                                    transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                                }
                                transformed += walk(node.finalizer, tail, wrapped);
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'CatchClause') {
                                return new CpsFunction(function (kk149) {
                                    return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk149) : walk(node.body, tail, wrapped);
                                }, k131);
                            } else if (node.type === 'ThrowStatement') {
                                return new CpsFunction(function (kk150) {
                                    return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk150) : walk(node.argument, false, wrapped);
                                }, k131);
                            } else if (node.type === 'SwitchStatement') {
                                transformed = walk(node.discriminant, false, wrapped);
                                for (i = 0; i < node.cases.length; i++) {
                                    transformed += walk(node.cases[i], false, wrapped);
                                }
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'SwitchCase') {
                                transformed = walk(node.test, false, wrapped);
                                for (i = 0; i < node.consequent.length; i++) {
                                    transformed += walk(node.consequent[i], false, wrapped);
                                }
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
                                return new CpsResult(k131.k(0));
                            } else if (node.type === 'VariableDeclaration') {
                                transformed = 0;
                                for (i = 0; i < node.declarations.length; i++) {
                                    transformed += walk(node.declarations[i], false, wrapped);
                                }
                                return new CpsResult(k131.k(transformed));
                            } else if (node.type === 'VariableDeclarator') {
                                return new CpsFunction(function (kk151) {
                                    return walk.CpsEnabled ? walk(node.init, false, wrapped, kk151) : walk(node.init, false, wrapped);
                                }, k131);
                            } else if (node.type === 'Identifier') {
                                return new CpsResult(k131.k(0));
                            } else if (node.type === 'Literal') {
                                return new CpsResult(k131.k(0));
                            } else {
                                console.warn('continuing with unexpected node type: ' + node.type);
                                return new CpsResult(k131.k(0));
                            }
                            return;
                        }
                        var transformed;
                        var i;
                        if (node === undefined || node === null) {
                            return 0;
                        } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                            return 0;
                        } else if (node.type === 'CallExpression') {
                            if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node) && !is_callee_using_apply(node)) {
                                var newnode = create_cpsrun_call(node);
                                _.each(node, function (value, key) {
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
                                transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'ExpressionStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk140) {
                                return walk(node.expression, tail, wrapped, kk140);
                            }, new CpsContinuation())) : walk(node.expression, tail, wrapped);
                        } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                            return walk(node.body, false, wrapped) + walk(node.test, false, wrapped);
                        } else if (node.type === 'ForStatement') {
                            return walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped);
                        } else if (node.type === 'ForInStatement') {
                            return walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped);
                        } else if (node.type === 'IfStatement') {
                            return walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);
                        } else if (node.type === 'LabeledStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk141) {
                                return walk(node.body, tail, wrapped, kk141);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                        } else if (node.type === 'WithStatement') {
                            return walk(node.body, tail, wrapped) + walk(node.object, false, wrapped);
                        } else if (node.type === 'ReturnStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk142) {
                                return walk(node.argument, !wrapped, false, kk142);
                            }, new CpsContinuation())) : walk(node.argument, !wrapped, false);
                        } else if (node.type === 'TryStatement') {
                            transformed = walk(node.block, tail, true);
                            for (i = 0; i < node.guardedHandlers.length; i++) {
                                transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            transformed += walk(node.finalizer, tail, wrapped);
                            return transformed;
                        } else if (node.type === 'CatchClause') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk143) {
                                return walk(node.body, tail, wrapped, kk143);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                        } else if (node.type === 'ThrowStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk144) {
                                return walk(node.argument, false, wrapped, kk144);
                            }, new CpsContinuation())) : walk(node.argument, false, wrapped);
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
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk145) {
                                return walk(node.init, false, wrapped, kk145);
                            }, new CpsContinuation())) : walk(node.init, false, wrapped);
                        } else if (node.type === 'Identifier') {
                            return 0;
                        } else if (node.type === 'Literal') {
                            return 0;
                        } else {
                            console.warn('continuing with unexpected node type: ' + node.type);
                            return 0;
                        }
                    };
                    ff153.CpsEnabled = true;
                    return ff153;
                }();
            return new CpsFunction(function (kk160) {
                return walk.CpsEnabled ? walk(body, true, false, kk160) : walk(body, true, false);
            }, k155);
            return;
        }
        var create_cpsrun_call = function (call_expression) {
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
                            arguments: [
                                {
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
                                },
                                {
                                    type: 'NewExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'CpsContinuation'
                                    },
                                    arguments: []
                                }
                            ]
                        }]
                },
                alternate: {
                    type: call_expression1.type,
                    callee: call_expression1.callee,
                    arguments: call_expression1.arguments
                }
            };
        };
        var is_callee_using_apply = function (node) {
            return node.callee && node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply';
        };
        var walk = function CpsEnableWrapper() {
                var ff153 = function (node, tail, wrapped) {
                    var l130 = arguments.length - 1;
                    var k131 = arguments[l130];
                    if (k131 instanceof CpsContinuation) {
                        if (l130 === 3) {
                        } else if (l130 >= 2) {
                            wrapped = undefined;
                        } else if (l130 >= 1) {
                            tail = undefined;
                        } else if (l130 >= 0) {
                            node = undefined;
                        }
                        var transformed;
                        var i;
                        if (node === undefined || node === null) {
                            return new CpsResult(k131.k(0));
                        } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                            return new CpsResult(k131.k(0));
                        } else if (node.type === 'CallExpression') {
                            if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node) && !is_callee_using_apply(node)) {
                                var newnode = create_cpsrun_call(node);
                                _.each(node, function (value, key) {
                                    delete node[key];
                                });
                                _.extend(node, newnode);
                                return new CpsResult(k131.k(1));
                            } else {
                                return new CpsResult(k131.k(0));
                            }
                        } else if (node.type === 'ConditionalExpression') {
                            return new CpsResult(k131.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'SequenceExpression') {
                            transformed = 0;
                            for (i = 0; i < node.expressions.length; i++) {
                                transformed += walk(node.expressions[i], false, wrapped);
                            }
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
                            return new CpsResult(k131.k(0));
                        } else if (node.type === 'BlockStatement') {
                            transformed = 0;
                            for (i = 0; i < node.body.length; i++) {
                                transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                            }
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'ExpressionStatement') {
                            return new CpsFunction(function (kk146) {
                                return walk.CpsEnabled ? walk(node.expression, tail, wrapped, kk146) : walk(node.expression, tail, wrapped);
                            }, k131);
                        } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                            return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                        } else if (node.type === 'ForStatement') {
                            return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                        } else if (node.type === 'ForInStatement') {
                            return new CpsResult(k131.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                        } else if (node.type === 'IfStatement') {
                            return new CpsResult(k131.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'LabeledStatement') {
                            return new CpsFunction(function (kk147) {
                                return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk147) : walk(node.body, tail, wrapped);
                            }, k131);
                        } else if (node.type === 'WithStatement') {
                            return new CpsResult(k131.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                        } else if (node.type === 'ReturnStatement') {
                            return new CpsFunction(function (kk148) {
                                return walk.CpsEnabled ? walk(node.argument, !wrapped, false, kk148) : walk(node.argument, !wrapped, false);
                            }, k131);
                        } else if (node.type === 'TryStatement') {
                            transformed = walk(node.block, tail, true);
                            for (i = 0; i < node.guardedHandlers.length; i++) {
                                transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            transformed += walk(node.finalizer, tail, wrapped);
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'CatchClause') {
                            return new CpsFunction(function (kk149) {
                                return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk149) : walk(node.body, tail, wrapped);
                            }, k131);
                        } else if (node.type === 'ThrowStatement') {
                            return new CpsFunction(function (kk150) {
                                return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk150) : walk(node.argument, false, wrapped);
                            }, k131);
                        } else if (node.type === 'SwitchStatement') {
                            transformed = walk(node.discriminant, false, wrapped);
                            for (i = 0; i < node.cases.length; i++) {
                                transformed += walk(node.cases[i], false, wrapped);
                            }
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'SwitchCase') {
                            transformed = walk(node.test, false, wrapped);
                            for (i = 0; i < node.consequent.length; i++) {
                                transformed += walk(node.consequent[i], false, wrapped);
                            }
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
                            return new CpsResult(k131.k(0));
                        } else if (node.type === 'VariableDeclaration') {
                            transformed = 0;
                            for (i = 0; i < node.declarations.length; i++) {
                                transformed += walk(node.declarations[i], false, wrapped);
                            }
                            return new CpsResult(k131.k(transformed));
                        } else if (node.type === 'VariableDeclarator') {
                            return new CpsFunction(function (kk151) {
                                return walk.CpsEnabled ? walk(node.init, false, wrapped, kk151) : walk(node.init, false, wrapped);
                            }, k131);
                        } else if (node.type === 'Identifier') {
                            return new CpsResult(k131.k(0));
                        } else if (node.type === 'Literal') {
                            return new CpsResult(k131.k(0));
                        } else {
                            console.warn('continuing with unexpected node type: ' + node.type);
                            return new CpsResult(k131.k(0));
                        }
                        return;
                    }
                    var transformed;
                    var i;
                    if (node === undefined || node === null) {
                        return 0;
                    } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                        return 0;
                    } else if (node.type === 'CallExpression') {
                        if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node) && !is_callee_using_apply(node)) {
                            var newnode = create_cpsrun_call(node);
                            _.each(node, function (value, key) {
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
                            transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'ExpressionStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk140) {
                            return walk(node.expression, tail, wrapped, kk140);
                        }, new CpsContinuation())) : walk(node.expression, tail, wrapped);
                    } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                        return walk(node.body, false, wrapped) + walk(node.test, false, wrapped);
                    } else if (node.type === 'ForStatement') {
                        return walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped);
                    } else if (node.type === 'ForInStatement') {
                        return walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped);
                    } else if (node.type === 'IfStatement') {
                        return walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped);
                    } else if (node.type === 'LabeledStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk141) {
                            return walk(node.body, tail, wrapped, kk141);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                    } else if (node.type === 'WithStatement') {
                        return walk(node.body, tail, wrapped) + walk(node.object, false, wrapped);
                    } else if (node.type === 'ReturnStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk142) {
                            return walk(node.argument, !wrapped, false, kk142);
                        }, new CpsContinuation())) : walk(node.argument, !wrapped, false);
                    } else if (node.type === 'TryStatement') {
                        transformed = walk(node.block, tail, true);
                        for (i = 0; i < node.guardedHandlers.length; i++) {
                            transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                        }
                        for (i = 0; i < node.handlers.length; i++) {
                            transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                        }
                        transformed += walk(node.finalizer, tail, wrapped);
                        return transformed;
                    } else if (node.type === 'CatchClause') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk143) {
                            return walk(node.body, tail, wrapped, kk143);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                    } else if (node.type === 'ThrowStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk144) {
                            return walk(node.argument, false, wrapped, kk144);
                        }, new CpsContinuation())) : walk(node.argument, false, wrapped);
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
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk145) {
                            return walk(node.init, false, wrapped, kk145);
                        }, new CpsContinuation())) : walk(node.init, false, wrapped);
                    } else if (node.type === 'Identifier') {
                        return 0;
                    } else if (node.type === 'Literal') {
                        return 0;
                    } else {
                        console.warn('continuing with unexpected node type: ' + node.type);
                        return 0;
                    }
                };
                ff153.CpsEnabled = true;
                return ff153;
            }();
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk159) {
            return walk(body, true, false, kk159);
        }, new CpsContinuation())) : walk(body, true, false);
    };
    ff162.CpsEnabled = true;
    return ff162;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff197 = function (k_varname, exclude_ids, body) {
        var l189 = arguments.length - 1;
        var k190 = arguments[l189];
        if (k190 instanceof CpsContinuation) {
            if (l189 === 3) {
            } else if (l189 >= 2) {
                body = undefined;
            } else if (l189 >= 1) {
                exclude_ids = undefined;
            } else if (l189 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
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
                    arguments: [
                        {
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
                        },
                        {
                            type: 'Identifier',
                            name: k_varname
                        }
                    ]
                };
            };
            var create_cps_result = function (expression) {
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
            var walk = function CpsEnableWrapper() {
                    var ff188 = function (node, tail, wrapped) {
                        var l171 = arguments.length - 1;
                        var k172 = arguments[l171];
                        if (k172 instanceof CpsContinuation) {
                            if (l171 === 3) {
                            } else if (l171 >= 2) {
                                wrapped = undefined;
                            } else if (l171 >= 1) {
                                tail = undefined;
                            } else if (l171 >= 0) {
                                node = undefined;
                            }
                            var transformed;
                            var i;
                            if (node === undefined || node === null) {
                                return new CpsResult(k172.k(0));
                            } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                                return new CpsResult(k172.k(0));
                            } else if (node.type === 'CallExpression') {
                                if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node)) {
                                    var newnode = create_cps_expression(node);
                                    _.each(node, function (value, key) {
                                        delete node[key];
                                    });
                                    _.extend(node, newnode);
                                    return new CpsResult(k172.k(1));
                                } else {
                                    return new CpsResult(k172.k(0));
                                }
                            } else if (node.type === 'ConditionalExpression') {
                                return new CpsResult(k172.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'SequenceExpression') {
                                transformed = 0;
                                for (i = 0; i < node.expressions.length; i++) {
                                    transformed += walk(node.expressions[i], false, wrapped);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
                                return new CpsResult(k172.k(0));
                            } else if (node.type === 'BlockStatement') {
                                transformed = 0;
                                for (i = 0; i < node.body.length; i++) {
                                    transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'ExpressionStatement') {
                                transformed = walk(node.expression, tail, wrapped);
                                if (transformed) {
                                    node.type = 'ReturnStatement';
                                    node.argument = node.expression;
                                    delete node.expression;
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                                return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                            } else if (node.type === 'ForStatement') {
                                return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                            } else if (node.type === 'ForInStatement') {
                                return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                            } else if (node.type === 'IfStatement') {
                                return new CpsResult(k172.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'LabeledStatement') {
                                return new CpsFunction(function (kk183) {
                                    return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk183) : walk(node.body, tail, wrapped);
                                }, k172);
                            } else if (node.type === 'WithStatement') {
                                return new CpsResult(k172.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                            } else if (node.type === 'ReturnStatement') {
                                transformed = walk(node.argument, !wrapped, false);
                                if (transformed === 0) {
                                    node.argument = create_cps_result(node.argument);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'TryStatement') {
                                transformed = walk(node.block, tail, true);
                                for (i = 0; i < node.guardedHandlers.length; i++) {
                                    transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                                }
                                for (i = 0; i < node.handlers.length; i++) {
                                    transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                                }
                                transformed += walk(node.finalizer, tail, wrapped);
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'CatchClause') {
                                return new CpsFunction(function (kk184) {
                                    return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk184) : walk(node.body, tail, wrapped);
                                }, k172);
                            } else if (node.type === 'ThrowStatement') {
                                return new CpsFunction(function (kk185) {
                                    return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk185) : walk(node.argument, false, wrapped);
                                }, k172);
                            } else if (node.type === 'SwitchStatement') {
                                transformed = walk(node.discriminant, false, wrapped);
                                for (i = 0; i < node.cases.length; i++) {
                                    transformed += walk(node.cases[i], false, wrapped);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'SwitchCase') {
                                transformed = walk(node.test, false, wrapped);
                                for (i = 0; i < node.consequent.length; i++) {
                                    transformed += walk(node.consequent[i], false, wrapped);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
                                return new CpsResult(k172.k(0));
                            } else if (node.type === 'VariableDeclaration') {
                                transformed = 0;
                                for (i = 0; i < node.declarations.length; i++) {
                                    transformed += walk(node.declarations[i], false, wrapped);
                                }
                                return new CpsResult(k172.k(transformed));
                            } else if (node.type === 'VariableDeclarator') {
                                return new CpsFunction(function (kk186) {
                                    return walk.CpsEnabled ? walk(node.init, false, wrapped, kk186) : walk(node.init, false, wrapped);
                                }, k172);
                            } else if (node.type === 'Identifier') {
                                return new CpsResult(k172.k(0));
                            } else if (node.type === 'Literal') {
                                return new CpsResult(k172.k(0));
                            } else {
                                console.warn('continuing with unexpected node type: ' + node.type);
                                return new CpsResult(k172.k(0));
                            }
                            return;
                        }
                        var transformed;
                        var i;
                        if (node === undefined || node === null) {
                            return 0;
                        } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                            return 0;
                        } else if (node.type === 'CallExpression') {
                            if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node)) {
                                var newnode = create_cps_expression(node);
                                _.each(node, function (value, key) {
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
                                transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
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
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk179) {
                                return walk(node.body, tail, wrapped, kk179);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped);
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
                                transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            transformed += walk(node.finalizer, tail, wrapped);
                            return transformed;
                        } else if (node.type === 'CatchClause') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk180) {
                                return walk(node.body, tail, wrapped, kk180);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                        } else if (node.type === 'ThrowStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk181) {
                                return walk(node.argument, false, wrapped, kk181);
                            }, new CpsContinuation())) : walk(node.argument, false, wrapped);
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
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk182) {
                                return walk(node.init, false, wrapped, kk182);
                            }, new CpsContinuation())) : walk(node.init, false, wrapped);
                        } else if (node.type === 'Identifier') {
                            return 0;
                        } else if (node.type === 'Literal') {
                            return 0;
                        } else {
                            console.warn('continuing with unexpected node type: ' + node.type);
                            return 0;
                        }
                    };
                    ff188.CpsEnabled = true;
                    return ff188;
                }();
            return new CpsFunction(function (kk195) {
                return walk.CpsEnabled ? walk(body, true, false, kk195) : walk(body, true, false);
            }, k190);
            return;
        }
        var create_cps_expression = function (call_expression) {
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
                arguments: [
                    {
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
                    },
                    {
                        type: 'Identifier',
                        name: k_varname
                    }
                ]
            };
        };
        var create_cps_result = function (expression) {
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
        var walk = function CpsEnableWrapper() {
                var ff188 = function (node, tail, wrapped) {
                    var l171 = arguments.length - 1;
                    var k172 = arguments[l171];
                    if (k172 instanceof CpsContinuation) {
                        if (l171 === 3) {
                        } else if (l171 >= 2) {
                            wrapped = undefined;
                        } else if (l171 >= 1) {
                            tail = undefined;
                        } else if (l171 >= 0) {
                            node = undefined;
                        }
                        var transformed;
                        var i;
                        if (node === undefined || node === null) {
                            return new CpsResult(k172.k(0));
                        } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                            return new CpsResult(k172.k(0));
                        } else if (node.type === 'CallExpression') {
                            if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node)) {
                                var newnode = create_cps_expression(node);
                                _.each(node, function (value, key) {
                                    delete node[key];
                                });
                                _.extend(node, newnode);
                                return new CpsResult(k172.k(1));
                            } else {
                                return new CpsResult(k172.k(0));
                            }
                        } else if (node.type === 'ConditionalExpression') {
                            return new CpsResult(k172.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'SequenceExpression') {
                            transformed = 0;
                            for (i = 0; i < node.expressions.length; i++) {
                                transformed += walk(node.expressions[i], false, wrapped);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression' || node.type === 'ThisExpression') {
                            return new CpsResult(k172.k(0));
                        } else if (node.type === 'BlockStatement') {
                            transformed = 0;
                            for (i = 0; i < node.body.length; i++) {
                                transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'ExpressionStatement') {
                            transformed = walk(node.expression, tail, wrapped);
                            if (transformed) {
                                node.type = 'ReturnStatement';
                                node.argument = node.expression;
                                delete node.expression;
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                            return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                        } else if (node.type === 'ForStatement') {
                            return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                        } else if (node.type === 'ForInStatement') {
                            return new CpsResult(k172.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                        } else if (node.type === 'IfStatement') {
                            return new CpsResult(k172.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'LabeledStatement') {
                            return new CpsFunction(function (kk183) {
                                return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk183) : walk(node.body, tail, wrapped);
                            }, k172);
                        } else if (node.type === 'WithStatement') {
                            return new CpsResult(k172.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                        } else if (node.type === 'ReturnStatement') {
                            transformed = walk(node.argument, !wrapped, false);
                            if (transformed === 0) {
                                node.argument = create_cps_result(node.argument);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'TryStatement') {
                            transformed = walk(node.block, tail, true);
                            for (i = 0; i < node.guardedHandlers.length; i++) {
                                transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                            }
                            transformed += walk(node.finalizer, tail, wrapped);
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'CatchClause') {
                            return new CpsFunction(function (kk184) {
                                return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk184) : walk(node.body, tail, wrapped);
                            }, k172);
                        } else if (node.type === 'ThrowStatement') {
                            return new CpsFunction(function (kk185) {
                                return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk185) : walk(node.argument, false, wrapped);
                            }, k172);
                        } else if (node.type === 'SwitchStatement') {
                            transformed = walk(node.discriminant, false, wrapped);
                            for (i = 0; i < node.cases.length; i++) {
                                transformed += walk(node.cases[i], false, wrapped);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'SwitchCase') {
                            transformed = walk(node.test, false, wrapped);
                            for (i = 0; i < node.consequent.length; i++) {
                                transformed += walk(node.consequent[i], false, wrapped);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
                            return new CpsResult(k172.k(0));
                        } else if (node.type === 'VariableDeclaration') {
                            transformed = 0;
                            for (i = 0; i < node.declarations.length; i++) {
                                transformed += walk(node.declarations[i], false, wrapped);
                            }
                            return new CpsResult(k172.k(transformed));
                        } else if (node.type === 'VariableDeclarator') {
                            return new CpsFunction(function (kk186) {
                                return walk.CpsEnabled ? walk(node.init, false, wrapped, kk186) : walk(node.init, false, wrapped);
                            }, k172);
                        } else if (node.type === 'Identifier') {
                            return new CpsResult(k172.k(0));
                        } else if (node.type === 'Literal') {
                            return new CpsResult(k172.k(0));
                        } else {
                            console.warn('continuing with unexpected node type: ' + node.type);
                            return new CpsResult(k172.k(0));
                        }
                        return;
                    }
                    var transformed;
                    var i;
                    if (node === undefined || node === null) {
                        return 0;
                    } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                        return 0;
                    } else if (node.type === 'CallExpression') {
                        if (tail && !wrapped && !root.is_callee_cpsenablewrapper(node) && !root.is_callee_having_side_effect(node)) {
                            var newnode = create_cps_expression(node);
                            _.each(node, function (value, key) {
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
                            transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
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
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk179) {
                            return walk(node.body, tail, wrapped, kk179);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped);
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
                            transformed += walk(node.guardedHandlers[i].body, tail, node.finalizer ? true : wrapped);
                        }
                        for (i = 0; i < node.handlers.length; i++) {
                            transformed += walk(node.handlers[i].body, tail, node.finalizer ? true : wrapped);
                        }
                        transformed += walk(node.finalizer, tail, wrapped);
                        return transformed;
                    } else if (node.type === 'CatchClause') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk180) {
                            return walk(node.body, tail, wrapped, kk180);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                    } else if (node.type === 'ThrowStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk181) {
                            return walk(node.argument, false, wrapped, kk181);
                        }, new CpsContinuation())) : walk(node.argument, false, wrapped);
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
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk182) {
                            return walk(node.init, false, wrapped, kk182);
                        }, new CpsContinuation())) : walk(node.init, false, wrapped);
                    } else if (node.type === 'Identifier') {
                        return 0;
                    } else if (node.type === 'Literal') {
                        return 0;
                    } else {
                        console.warn('continuing with unexpected node type: ' + node.type);
                        return 0;
                    }
                };
                ff188.CpsEnabled = true;
                return ff188;
            }();
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk194) {
            return walk(body, true, false, kk194);
        }, new CpsContinuation())) : walk(body, true, false);
    };
    ff197.CpsEnabled = true;
    return ff197;
}();
root.create_cpsenabled_statement = function (cps_func_id) {
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
root.walk_ast = function CpsEnableWrapper() {
    var ff210 = function (node) {
        var l202 = arguments.length - 1;
        var k203 = arguments[l202];
        if (k203 instanceof CpsContinuation) {
            if (l202 === 1) {
            } else if (l202 >= 0) {
                node = undefined;
            }
            var exclude_ids;
            if (node && node.type === 'FunctionDeclaration') {
                exclude_ids = root.collect_all_identifiers(node.body);
                if (root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
                    assert.equal(node.id.type, 'Identifier');
                    return new CpsResult(k203.k(node.id.name));
                } else {
                    return new CpsResult(k203.k([]));
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
                                    body: [
                                        {
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
                                        root.create_cpsenabled_statement(ff_varname),
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: ff_varname
                                            }
                                        }
                                    ],
                                    rest: null,
                                    generator: false,
                                    expression: false
                                }
                            },
                            arguments: []
                        };
                    _.each(node, function (value, key) {
                        delete node[key];
                    });
                    _.extend(node, newnode);
                }
                return new CpsResult(k203.k([]));
            } else if (node && node.type === 'CallExpression') {
                return new CpsResult(k203.k([]));
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk208) {
                    return _.map.CpsEnabled ? _.map(node, root.walk_ast, kk208) : _.map(node, root.walk_ast);
                }, k203);
            } else {
                return new CpsResult(k203.k([]));
            }
            return;
        }
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
                                body: [
                                    {
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
                                    root.create_cpsenabled_statement(ff_varname),
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Identifier',
                                            name: ff_varname
                                        }
                                    }
                                ],
                                rest: null,
                                generator: false,
                                expression: false
                            }
                        },
                        arguments: []
                    };
                _.each(node, function (value, key) {
                    delete node[key];
                });
                _.extend(node, newnode);
            }
            return [];
        } else if (node && node.type === 'CallExpression') {
            return [];
        } else if (node instanceof Object) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                return _.map(node, root.walk_ast, kk207);
            }, new CpsContinuation())) : _.map(node, root.walk_ast);
        } else {
            return [];
        }
    };
    ff210.CpsEnabled = true;
    return ff210;
}();
root.transform = function (ast) {
    assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast(ast.body);
    _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
    });
    root.unshift(ast.body, root.ast_prog_header(), true);
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff223 = function (ast) {
        var l215 = arguments.length - 1;
        var k216 = arguments[l215];
        if (k216 instanceof CpsContinuation) {
            if (l215 === 1) {
            } else if (l215 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk221) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk221) : escodegen.generate(ast);
            }, k216);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk220) {
            return escodegen.generate(ast, kk220);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff223.CpsEnabled = true;
    return ff223;
}();
root.compile = function CpsEnableWrapper() {
    var ff232 = function (data) {
        var l224 = arguments.length - 1;
        var k225 = arguments[l224];
        if (k225 instanceof CpsContinuation) {
            if (l224 === 1) {
            } else if (l224 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk230) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk230) : root.generate(root.transform(root.parse(data)));
            }, k225);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk229) {
            return root.generate(root.transform(root.parse(data)), kk229);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff232.CpsEnabled = true;
    return ff232;
}();
root.saved_require_js_function = null;
root.enable_on_require = function () {
    var fs = require('fs');
    if (!root.saved_require_js_function) {
        root.saved_require_js_function = require.extensions['.js'];
        require.extensions['.js'] = function CpsEnableWrapper() {
            var ff241 = function (module, filename) {
                var l233 = arguments.length - 1;
                var k234 = arguments[l233];
                if (k234 instanceof CpsContinuation) {
                    if (l233 === 2) {
                    } else if (l233 >= 1) {
                        filename = undefined;
                    } else if (l233 >= 0) {
                        module = undefined;
                    }
                    var data = fs.readFileSync(filename, 'utf8');
                    return new CpsFunction(function (kk239) {
                        return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk239) : module._compile(root.compile(data), filename);
                    }, k234);
                    return;
                }
                var data = fs.readFileSync(filename, 'utf8');
                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk238) {
                    return module._compile(root.compile(data), filename, kk238);
                }, new CpsContinuation())) : module._compile(root.compile(data), filename);
            };
            ff241.CpsEnabled = true;
            return ff241;
        }();
    }
};
root.disable_on_require = function () {
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