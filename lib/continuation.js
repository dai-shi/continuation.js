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
    var ff8 = function (data) {
        var l1 = arguments.length - 1;
        var k2 = arguments[l1];
        if (k2 instanceof CpsContinuation) {
            if (l1 >= 1) {
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
    ff8.CpsEnabled = true;
    return ff8;
}();
root.push = function (lst, itm) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk14) {
            return Array.isArray(itm, kk14);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        for (var i = 0; i < itm.length; i++) {
            lst.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk15) {
                return lst.push(itm[i], kk15);
            }, new CpsContinuation())) : lst.push(itm[i]);
        }
    } else {
        lst.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk16) {
            return lst.push(itm, kk16);
        }, new CpsContinuation())) : lst.push(itm);
    }
};
root.unshift = function (lst, itm, force) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk22) {
            return Array.isArray(itm, kk22);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        itm = itm.reverse.CpsEnabled ? CpsRun(new CpsFunction(function (kk23) {
            return itm.reverse(kk23);
        }, new CpsContinuation())) : itm.reverse();
    } else {
        itm = [itm];
    }
    if (!force) {
        while (lst.length > 0 && lst[0].type === 'FunctionDeclaration') {
            itm.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk24) {
                return itm.push(lst.shift(), kk24);
            }, new CpsContinuation())) : itm.push(lst.shift());
        }
    }
    for (var i = 0; i < itm.length; i++) {
        lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk25) {
            return lst.unshift(itm[i], kk25);
        }, new CpsContinuation())) : lst.unshift(itm[i]);
    }
};
root.ast_prog_header = function () {
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk31) {
            return root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }', kk31);
        }, new CpsContinuation())) : root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk32) {
        return assert.equal(code.type, 'Program', kk32);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    return code.body;
};
root.new_variable_counter = 1;
root.generate_new_variable_name = function CpsEnableWrapper() {
    var ff41 = function (prefix, exclude_ids) {
        var l33 = arguments.length - 1;
        var k34 = arguments[l33];
        if (k34 instanceof CpsContinuation) {
            if (l33 >= 2) {
            } else if (l33 >= 1) {
                exclude_ids = undefined;
            } else if (l33 >= 0) {
                prefix = undefined;
            }
            var varname = prefix + root.new_variable_counter++;
            if (exclude_ids.indexOf(varname) >= 0) {
                return new CpsFunction(function (kk40) {
                    return root.generate_new_variable_name.CpsEnabled ? root.generate_new_variable_name(prefix, exclude_ids, kk40) : root.generate_new_variable_name(prefix, exclude_ids);
                }, k34);
            } else {
                return new CpsResult(k34.k(varname));
            }
            return;
        }
        var varname = prefix + root.new_variable_counter++;
        if ((exclude_ids.indexOf.CpsEnabled ? CpsRun(new CpsFunction(function (kk38) {
                return exclude_ids.indexOf(varname, kk38);
            }, new CpsContinuation())) : exclude_ids.indexOf(varname)) >= 0) {
            return root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk39) {
                return root.generate_new_variable_name(prefix, exclude_ids, kk39);
            }, new CpsContinuation())) : root.generate_new_variable_name(prefix, exclude_ids);
        } else {
            return varname;
        }
    };
    ff41.CpsEnabled = true;
    return ff41;
}();
root.ast_func_header = function (l_varname, t_varname, a_varname, exclude_ids) {
    var i_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk47) {
            return root.generate_new_variable_name('i', exclude_ids, kk47);
        }, new CpsContinuation())) : root.generate_new_variable_name('i', exclude_ids);
    var thisCopy = '';
    if (t_varname) {
        thisCopy = 'var ' + t_varname + ' = this;';
    }
    var argsCopy = '';
    if (a_varname) {
        argsCopy = 'var ' + a_varname + ' = {}; for(var ' + i_varname + ' = 0; ' + i_varname + ' <= ' + l_varname + '; ' + i_varname + '++) { ' + a_varname + '[' + i_varname + '] = arguments[' + i_varname + ']; }' + a_varname + '.length = 1 + ' + l_varname + ';' + a_varname + '.callee = arguments.callee;';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk48) {
            return root.parse('var ' + l_varname + ' = arguments.length - 1;' + thisCopy + argsCopy, kk48);
        }, new CpsContinuation())) : root.parse('var ' + l_varname + ' = arguments.length - 1;' + thisCopy + argsCopy);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk49) {
        return assert.equal(code.type, 'Program', kk49);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    return code.body;
};
root.ast_func_wrapper = function (k_varname, l_varname, a_varname, params) {
    var argsPop = '';
    if (a_varname) {
        argsPop = 'delete ' + a_varname + '[' + l_varname + ']; ' + a_varname + '.length--;';
    }
    var fixParams = '';
    if (params.length > 0) {
        fixParams = 'if (' + l_varname + ' >= ' + params.length + ') {';
        for (var i = params.length - 1; i >= 0; i--) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk55) {
                return assert.equal(params[i].type, 'Identifier', kk55);
            }, new CpsContinuation())) : assert.equal(params[i].type, 'Identifier');
            fixParams += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
        }
        fixParams += '}';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk56) {
            return root.parse('var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}', kk56);
        }, new CpsContinuation())) : root.parse('var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk57) {
        return assert.equal(code.type, 'Program', kk57);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    return code.body;
};
root.collect_all_identifiers = function (node) {
    var ids = [];
    var walk = function CpsEnableWrapper() {
            var ff67 = function (node) {
                var l58 = arguments.length - 1;
                var k59 = arguments[l58];
                if (k59 instanceof CpsContinuation) {
                    if (l58 >= 1) {
                    } else if (l58 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k59.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk65) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk65) : ids.push(node.name);
                        }, k59);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk66) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk66) : _.each(node, walk);
                        }, k59);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk63) {
                        return ids.push(node.name, kk63);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk64) {
                        return _.each(node, walk, kk64);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff67.CpsEnabled = true;
            return ff67;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk73) {
        return walk(node, kk73);
    }, new CpsContinuation())) : walk(node);
    return ids;
};
root.replace_this_var_with = function (body, t_varname) {
    var using_this_var = false;
    var walk = function CpsEnableWrapper() {
            var ff81 = function (node) {
                var l74 = arguments.length - 1;
                var k75 = arguments[l74];
                if (k75 instanceof CpsContinuation) {
                    if (l74 >= 1) {
                    } else if (l74 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k75.k(null));
                    } else if (node && node.type === 'ThisExpression') {
                        node.type = 'Identifier';
                        node.name = t_varname;
                        using_this_var = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk80) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk80) : _.each(node, walk);
                        }, k75);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk79) {
                        return _.each(node, walk, kk79);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff81.CpsEnabled = true;
            return ff81;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk87) {
        return walk(body, kk87);
    }, new CpsContinuation())) : walk(body);
    return using_this_var;
};
root.replace_arguments_with = function (body, a_varname) {
    var using_arguments = false;
    var walk = function CpsEnableWrapper() {
            var ff97 = function (node) {
                var l88 = arguments.length - 1;
                var k89 = arguments[l88];
                if (k89 instanceof CpsContinuation) {
                    if (l88 >= 1) {
                    } else if (l88 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k89.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k89.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk95) {
                            return walk.CpsEnabled ? walk(node.object, kk95) : walk(node.object);
                        }, k89);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk96) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk96) : _.each(node, walk);
                        }, k89);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk93) {
                        return walk(node.object, kk93);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk94) {
                        return _.each(node, walk, kk94);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff97.CpsEnabled = true;
            return ff97;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk103) {
        return walk(body, kk103);
    }, new CpsContinuation())) : walk(body);
    return using_arguments;
};
root.deep_clone = function CpsEnableWrapper() {
    var ff114 = function (node) {
        var l104 = arguments.length - 1;
        var k105 = arguments[l104];
        if (k105 instanceof CpsContinuation) {
            if (l104 >= 1) {
            } else if (l104 >= 0) {
                node = undefined;
            }
            if (node instanceof Date) {
                return new CpsResult(k105.k(node));
            } else if (node instanceof RegExp) {
                return new CpsResult(k105.k(node));
            } else if (Array.isArray(node)) {
                return new CpsFunction(function (kk112) {
                    return _.map.CpsEnabled ? _.map(node, root.deep_clone, kk112) : _.map(node, root.deep_clone);
                }, k105);
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk113) {
                    return _.object.CpsEnabled ? _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }), kk113) : _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }));
                }, k105);
            } else {
                return new CpsResult(k105.k(node));
            }
            return;
        }
        if (node instanceof Date) {
            return node;
        } else if (node instanceof RegExp) {
            return node;
        } else if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
                return Array.isArray(node, kk109);
            }, new CpsContinuation())) : Array.isArray(node)) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk110) {
                return _.map(node, root.deep_clone, kk110);
            }, new CpsContinuation())) : _.map(node, root.deep_clone);
        } else if (node instanceof Object) {
            return _.object.CpsEnabled ? CpsRun(new CpsFunction(function (kk111) {
                return _.object(_.map(_.pairs(node), function (x) {
                    return [
                        x[0],
                        root.deep_clone(x[1])
                    ];
                }), kk111);
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
    ff114.CpsEnabled = true;
    return ff114;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk120) {
        return assert.equal(body.type, 'BlockStatement', kk120);
    }, new CpsContinuation())) : assert.equal(body.type, 'BlockStatement');
    if (body.body.length === 0) {
        return false;
    }
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk121) {
            return root.walk_ast(body.body, kk121);
        }, new CpsContinuation())) : root.walk_ast(body.body);
    var l_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk122) {
            return root.generate_new_variable_name('l', exclude_ids, kk122);
        }, new CpsContinuation())) : root.generate_new_variable_name('l', exclude_ids);
    var k_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk123) {
            return root.generate_new_variable_name('k', exclude_ids, kk123);
        }, new CpsContinuation())) : root.generate_new_variable_name('k', exclude_ids);
    var t_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk124) {
            return root.generate_new_variable_name('t', exclude_ids, kk124);
        }, new CpsContinuation())) : root.generate_new_variable_name('t', exclude_ids);
    var a_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk125) {
            return root.generate_new_variable_name('a', exclude_ids, kk125);
        }, new CpsContinuation())) : root.generate_new_variable_name('a', exclude_ids);
    var using_this_var = root.replace_this_var_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk126) {
            return root.replace_this_var_with(body.body, t_varname, kk126);
        }, new CpsContinuation())) : root.replace_this_var_with(body.body, t_varname);
    var using_arguments = root.replace_arguments_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk127) {
            return root.replace_arguments_with(body.body, a_varname, kk127);
        }, new CpsContinuation())) : root.replace_arguments_with(body.body, a_varname);
    var header = root.ast_func_header.CpsEnabled ? CpsRun(new CpsFunction(function (kk128) {
            return root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids, kk128);
        }, new CpsContinuation())) : root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
    var newbody = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk129) {
            return root.deep_clone(body.body, kk129);
        }, new CpsContinuation())) : root.deep_clone(body.body);
    root.convert_function_call_to_new_cps_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk130) {
        return root.convert_function_call_to_new_cps_call(body.body, exclude_ids, kk130);
    }, new CpsContinuation())) : root.convert_function_call_to_new_cps_call(body.body, exclude_ids);
    var success = root.convert_normal_body_to_cps_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk131) {
            return root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody, kk131);
        }, new CpsContinuation())) : root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    if (success) {
        while (newbody.length > 0) {
            if (newbody[0].type === 'FunctionDeclaration') {
                newbody.shift.CpsEnabled ? CpsRun(new CpsFunction(function (kk132) {
                    return newbody.shift(kk132);
                }, new CpsContinuation())) : newbody.shift();
            } else {
                break;
            }
        }
        var wrapper = root.ast_func_wrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk133) {
                return root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params, kk133);
            }, new CpsContinuation())) : root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
            return assert.ok(wrapper[1].consequent.body.length >= 0, kk134);
        }, new CpsContinuation())) : assert.ok(wrapper[1].consequent.body.length >= 0);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk135) {
            return root.push(wrapper[1].consequent.body, newbody, kk135);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, newbody);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk136) {
            return root.push(wrapper[1].consequent.body, {
                type: 'ReturnStatement',
                argument: null
            }, kk136);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, {
            type: 'ReturnStatement',
            argument: null
        });
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk137) {
            return root.unshift(body.body, wrapper, kk137);
        }, new CpsContinuation())) : root.unshift(body.body, wrapper);
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk138) {
            return root.unshift(body.body, header, kk138);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    } else if (using_this_var || using_arguments) {
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk139) {
            return root.unshift(body.body, header, kk139);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    }
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk140) {
        return _.each(_.flatten(cps_func_ids), function (cps_func_id) {
            root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
        }, kk140);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
    });
    return success;
};
root.convert_function_call_to_new_cps_call = function CpsEnableWrapper() {
    var ff175 = function (body, exclude_ids) {
        var l168 = arguments.length - 1;
        var k169 = arguments[l168];
        if (k169 instanceof CpsContinuation) {
            if (l168 >= 2) {
            } else if (l168 >= 1) {
                exclude_ids = undefined;
            } else if (l168 >= 0) {
                body = undefined;
            }
            var has_side_effect = function CpsEnableWrapper() {
                    var ff148 = function (node) {
                        var l141 = arguments.length - 1;
                        var k142 = arguments[l141];
                        if (k142 instanceof CpsContinuation) {
                            if (l141 >= 1) {
                            } else if (l141 >= 0) {
                                node = undefined;
                            }
                            if (!node) {
                                return new CpsResult(k142.k(false));
                            } else if (node.type === 'FunctionExpression') {
                                return new CpsResult(k142.k(true));
                            } else if (node.type === 'CallExpression') {
                                return new CpsResult(k142.k(true));
                            } else if (node.type === 'UpdateExpression') {
                                return new CpsResult(k142.k(true));
                            } else if (node.type === 'AssignmentExpression') {
                                return new CpsResult(k142.k(true));
                            } else if (node.type === 'NewExpression') {
                                return new CpsResult(k142.k(true));
                            } else if (node instanceof Object) {
                                return new CpsFunction(function (kk147) {
                                    return _.some.CpsEnabled ? _.some(node, has_side_effect, kk147) : _.some(node, has_side_effect);
                                }, k142);
                            } else {
                                return new CpsResult(k142.k(false));
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
                            return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk146) {
                                return _.some(node, has_side_effect, kk146);
                            }, new CpsContinuation())) : _.some(node, has_side_effect);
                        } else {
                            return false;
                        }
                    };
                    ff148.CpsEnabled = true;
                    return ff148;
                }();
            var is_transformable_call = function CpsEnableWrapper() {
                    var ff155 = function (node) {
                        var l149 = arguments.length - 1;
                        var k150 = arguments[l149];
                        if (k150 instanceof CpsContinuation) {
                            if (l149 >= 1) {
                            } else if (l149 >= 0) {
                                node = undefined;
                            }
                            if (!node.callee) {
                                return new CpsResult(k150.k(false));
                            } else if (has_side_effect(node.callee)) {
                                return new CpsResult(k150.k(false));
                            } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                                return new CpsResult(k150.k(false));
                            } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                                return new CpsResult(k150.k(false));
                            } else {
                                return new CpsResult(k150.k(true));
                            }
                            return;
                        }
                        if (!node.callee) {
                            return false;
                        } else if (has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk154) {
                                return has_side_effect(node.callee, kk154);
                            }, new CpsContinuation())) : has_side_effect(node.callee)) {
                            return false;
                        } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                            return false;
                        } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                            return false;
                        } else {
                            return true;
                        }
                    };
                    ff155.CpsEnabled = true;
                    return ff155;
                }();
            var walk = function (node) {
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk161) {
                        return is_transformable_call(node, kk161);
                    }, new CpsContinuation())) : is_transformable_call(node))) {
                    var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                            return root.generate_new_variable_name('kk', exclude_ids, kk162);
                        }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                    var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                            return root.deep_clone(node, kk163);
                        }, new CpsContinuation())) : root.deep_clone(node);
                    cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                        return cpsnode.arguments.push({
                            type: 'Identifier',
                            name: kk_varname
                        }, kk164);
                    }, new CpsContinuation())) : cpsnode.arguments.push({
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
                                                            argument: cpsnode
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
                                type: node.type,
                                callee: node.callee,
                                arguments: node.arguments
                            }
                        };
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                        return _.each(node, function (value, key) {
                            delete node[key];
                        }, kk165);
                    }, new CpsContinuation())) : _.each(node, function (value, key) {
                        delete node[key];
                    });
                    _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                        return _.extend(node, newnode, kk166);
                    }, new CpsContinuation())) : _.extend(node, newnode);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                        return _.each(node, walk, kk167);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            return new CpsFunction(function (kk174) {
                return walk.CpsEnabled ? walk(body, kk174) : walk(body);
            }, k169);
            return;
        }
        var has_side_effect = function CpsEnableWrapper() {
                var ff148 = function (node) {
                    var l141 = arguments.length - 1;
                    var k142 = arguments[l141];
                    if (k142 instanceof CpsContinuation) {
                        if (l141 >= 1) {
                        } else if (l141 >= 0) {
                            node = undefined;
                        }
                        if (!node) {
                            return new CpsResult(k142.k(false));
                        } else if (node.type === 'FunctionExpression') {
                            return new CpsResult(k142.k(true));
                        } else if (node.type === 'CallExpression') {
                            return new CpsResult(k142.k(true));
                        } else if (node.type === 'UpdateExpression') {
                            return new CpsResult(k142.k(true));
                        } else if (node.type === 'AssignmentExpression') {
                            return new CpsResult(k142.k(true));
                        } else if (node.type === 'NewExpression') {
                            return new CpsResult(k142.k(true));
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk147) {
                                return _.some.CpsEnabled ? _.some(node, has_side_effect, kk147) : _.some(node, has_side_effect);
                            }, k142);
                        } else {
                            return new CpsResult(k142.k(false));
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
                        return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk146) {
                            return _.some(node, has_side_effect, kk146);
                        }, new CpsContinuation())) : _.some(node, has_side_effect);
                    } else {
                        return false;
                    }
                };
                ff148.CpsEnabled = true;
                return ff148;
            }();
        var is_transformable_call = function CpsEnableWrapper() {
                var ff155 = function (node) {
                    var l149 = arguments.length - 1;
                    var k150 = arguments[l149];
                    if (k150 instanceof CpsContinuation) {
                        if (l149 >= 1) {
                        } else if (l149 >= 0) {
                            node = undefined;
                        }
                        if (!node.callee) {
                            return new CpsResult(k150.k(false));
                        } else if (has_side_effect(node.callee)) {
                            return new CpsResult(k150.k(false));
                        } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                            return new CpsResult(k150.k(false));
                        } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                            return new CpsResult(k150.k(false));
                        } else {
                            return new CpsResult(k150.k(true));
                        }
                        return;
                    }
                    if (!node.callee) {
                        return false;
                    } else if (has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk154) {
                            return has_side_effect(node.callee, kk154);
                        }, new CpsContinuation())) : has_side_effect(node.callee)) {
                        return false;
                    } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                        return false;
                    } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                        return false;
                    } else {
                        return true;
                    }
                };
                ff155.CpsEnabled = true;
                return ff155;
            }();
        var walk = function (node) {
            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                return;
            } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk161) {
                    return is_transformable_call(node, kk161);
                }, new CpsContinuation())) : is_transformable_call(node))) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk162);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                        return root.deep_clone(node, kk163);
                    }, new CpsContinuation())) : root.deep_clone(node);
                cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                    return cpsnode.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk164);
                }, new CpsContinuation())) : cpsnode.arguments.push({
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
                                                        argument: cpsnode
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
                            type: node.type,
                            callee: node.callee,
                            arguments: node.arguments
                        }
                    };
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                    return _.each(node, function (value, key) {
                        delete node[key];
                    }, kk165);
                }, new CpsContinuation())) : _.each(node, function (value, key) {
                    delete node[key];
                });
                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                    return _.extend(node, newnode, kk166);
                }, new CpsContinuation())) : _.extend(node, newnode);
            } else if (node instanceof Object) {
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                    return _.each(node, walk, kk167);
                }, new CpsContinuation())) : _.each(node, walk);
            }
        };
        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk173) {
            return walk(body, kk173);
        }, new CpsContinuation())) : walk(body);
    };
    ff175.CpsEnabled = true;
    return ff175;
}();
root.convert_statements_into_cps = function (k_varname, exclude_ids, statements) {
    var i = 0;
    while (i < statements.length) {
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk181) {
            return assert.ok(statements[i].type, kk181);
        }, new CpsContinuation())) : assert.ok(statements[i].type);
        assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk182) {
            return assert.equal(statements[i].type.slice(-9), 'Statement', kk182);
        }, new CpsContinuation())) : assert.equal(statements[i].type.slice(-9), 'Statement');
        var converted = root.convert_statement_into_cps.CpsEnabled ? CpsRun(new CpsFunction(function (kk183) {
                return root.convert_statement_into_cps(k_varname, exclude_ids, statements[i], statements.slice(i + 1), kk183);
            }, new CpsContinuation())) : root.convert_statement_into_cps(k_varname, exclude_ids, statements[i], statements.slice(i + 1));
        if (converted) {
            statements.splice.CpsEnabled ? CpsRun(new CpsFunction(function (kk184) {
                return statements.splice(i + 1, kk184);
            }, new CpsContinuation())) : statements.splice(i + 1);
            statements[i] = {
                type: 'ReturnStatement',
                argument: converted
            };
            break;
        }
    }
};
root.convert_statement_into_cps = function CpsEnableWrapper() {
    var ff190 = function (k_varname, exlude_ids, statement, rest) {
        var l185 = arguments.length - 1;
        var k186 = arguments[l185];
        if (k186 instanceof CpsContinuation) {
            if (l185 >= 4) {
            } else if (l185 >= 3) {
                rest = undefined;
            } else if (l185 >= 2) {
                statement = undefined;
            } else if (l185 >= 1) {
                exlude_ids = undefined;
            } else if (l185 >= 0) {
                k_varname = undefined;
            }
            if (statement.type === 'ExpressionStatement') {
            } else {
                return new CpsResult(k186.k(false));
            }
            return;
        }
        if (statement.type === 'ExpressionStatement') {
        } else {
            return false;
        }
    };
    ff190.CpsEnabled = true;
    return ff190;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff221 = function (k_varname, exclude_ids, body) {
        var l214 = arguments.length - 1;
        var k215 = arguments[l214];
        if (k215 instanceof CpsContinuation) {
            if (l214 >= 3) {
            } else if (l214 >= 2) {
                body = undefined;
            } else if (l214 >= 1) {
                exclude_ids = undefined;
            } else if (l214 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk196) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk196);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk197) {
                        return root.deep_clone(call_expression, kk197);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk198) {
                    return call_expression2.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk198);
                }, new CpsContinuation())) : call_expression2.arguments.push({
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
                        },
                        {
                            type: 'Identifier',
                            name: k_varname
                        }
                    ]
                };
            };
            var walk = function (node, tail) {
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return true;
                } else if (node && node.type === 'CallExpression' && !(node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper')) {
                    return false;
                } else if (node && node.type === 'ReturnStatement') {
                    if (node.argument && node.argument.type === 'CallExpression' && !(node.argument.callee && node.argument.callee.type === 'FunctionExpression')) {
                        node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk204) {
                            return create_cps_expression(node.argument, kk204);
                        }, new CpsContinuation())) : create_cps_expression(node.argument);
                        return true;
                    } else {
                        var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk205) {
                                return walk(node.argument, kk205);
                            }, new CpsContinuation())) : walk(node.argument);
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
                    return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk206) {
                        return walk(node.consequent, tail, kk206);
                    }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                        return walk(node.alternate, tail, kk207);
                    }, new CpsContinuation())) : walk(node.alternate, tail));
                } else if (tail && node && node.type === 'BlockStatement') {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                        return walk(node.body, tail, kk208);
                    }, new CpsContinuation())) : walk(node.body, tail);
                } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                        return Array.isArray(node, kk209);
                    }, new CpsContinuation())) : Array.isArray(node))) {
                    for (var i = 0; i < node.length - 1; i++) {
                        var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                                return walk(node[i], kk210);
                            }, new CpsContinuation())) : walk(node[i]);
                        if (!result) {
                            return false;
                        }
                    }
                    var lastone = node[node.length - 1];
                    if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression' && !(lastone.expression.callee && lastone.expression.callee.type === 'FunctionExpression')) {
                        node[node.length - 1] = {
                            type: 'ReturnStatement',
                            argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                                return create_cps_expression(lastone.expression, kk211);
                            }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                        };
                        return true;
                    } else {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                            return walk(lastone, tail, kk212);
                        }, new CpsContinuation())) : walk(lastone, tail);
                    }
                } else if (node instanceof Object) {
                    return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                        return _.every(node, function (x) {
                            return walk(x);
                        }, kk213);
                    }, new CpsContinuation())) : _.every(node, function (x) {
                        return walk(x);
                    });
                } else {
                    return true;
                }
            };
            return new CpsFunction(function (kk220) {
                return walk.CpsEnabled ? walk(body, true, kk220) : walk(body, true);
            }, k215);
            return;
        }
        var create_cps_expression = function (call_expression) {
            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk196) {
                    return root.generate_new_variable_name('kk', exclude_ids, kk196);
                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
            var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk197) {
                    return root.deep_clone(call_expression, kk197);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk198) {
                return call_expression2.arguments.push({
                    type: 'Identifier',
                    name: kk_varname
                }, kk198);
            }, new CpsContinuation())) : call_expression2.arguments.push({
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
                    },
                    {
                        type: 'Identifier',
                        name: k_varname
                    }
                ]
            };
        };
        var walk = function (node, tail) {
            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                return true;
            } else if (node && node.type === 'CallExpression' && !(node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper')) {
                return false;
            } else if (node && node.type === 'ReturnStatement') {
                if (node.argument && node.argument.type === 'CallExpression' && !(node.argument.callee && node.argument.callee.type === 'FunctionExpression')) {
                    node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk204) {
                        return create_cps_expression(node.argument, kk204);
                    }, new CpsContinuation())) : create_cps_expression(node.argument);
                    return true;
                } else {
                    var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk205) {
                            return walk(node.argument, kk205);
                        }, new CpsContinuation())) : walk(node.argument);
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
                return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk206) {
                    return walk(node.consequent, tail, kk206);
                }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                    return walk(node.alternate, tail, kk207);
                }, new CpsContinuation())) : walk(node.alternate, tail));
            } else if (tail && node && node.type === 'BlockStatement') {
                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                    return walk(node.body, tail, kk208);
                }, new CpsContinuation())) : walk(node.body, tail);
            } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                    return Array.isArray(node, kk209);
                }, new CpsContinuation())) : Array.isArray(node))) {
                for (var i = 0; i < node.length - 1; i++) {
                    var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                            return walk(node[i], kk210);
                        }, new CpsContinuation())) : walk(node[i]);
                    if (!result) {
                        return false;
                    }
                }
                var lastone = node[node.length - 1];
                if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression' && !(lastone.expression.callee && lastone.expression.callee.type === 'FunctionExpression')) {
                    node[node.length - 1] = {
                        type: 'ReturnStatement',
                        argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                            return create_cps_expression(lastone.expression, kk211);
                        }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                    };
                    return true;
                } else {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                        return walk(lastone, tail, kk212);
                    }, new CpsContinuation())) : walk(lastone, tail);
                }
            } else if (node instanceof Object) {
                return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                    return _.every(node, function (x) {
                        return walk(x);
                    }, kk213);
                }, new CpsContinuation())) : _.every(node, function (x) {
                    return walk(x);
                });
            } else {
                return true;
            }
        };
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk219) {
            return walk(body, true, kk219);
        }, new CpsContinuation())) : walk(body, true);
    };
    ff221.CpsEnabled = true;
    return ff221;
}();
root.create_cpsenabled_statement = function CpsEnableWrapper() {
    var ff227 = function (cps_func_id) {
        var l222 = arguments.length - 1;
        var k223 = arguments[l222];
        if (k223 instanceof CpsContinuation) {
            if (l222 >= 1) {
            } else if (l222 >= 0) {
                cps_func_id = undefined;
            }
            return new CpsResult(k223.k({
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
            }));
            return;
        }
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
    ff227.CpsEnabled = true;
    return ff227;
}();
root.walk_ast = function (node) {
    var exclude_ids;
    if (node && node.type === 'FunctionDeclaration') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk233) {
            return root.collect_all_identifiers(node.body, kk233);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk234) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk234);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk235) {
                return assert.equal(node.id.type, 'Identifier', kk235);
            }, new CpsContinuation())) : assert.equal(node.id.type, 'Identifier');
            return node.id.name;
        } else {
            return [];
        }
    } else if (node && node.type === 'FunctionExpression') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
            return root.collect_all_identifiers(node.body, kk236);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk237) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk237);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            var ff_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk238) {
                    return root.generate_new_variable_name('ff', exclude_ids, kk238);
                }, new CpsContinuation())) : root.generate_new_variable_name('ff', exclude_ids);
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
                                root.create_cpsenabled_statement.CpsEnabled ? CpsRun(new CpsFunction(function (kk239) {
                                    return root.create_cpsenabled_statement(ff_varname, kk239);
                                }, new CpsContinuation())) : root.create_cpsenabled_statement(ff_varname),
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
            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk240) {
                return _.each(node, function (value, key) {
                    delete node[key];
                }, kk240);
            }, new CpsContinuation())) : _.each(node, function (value, key) {
                delete node[key];
            });
            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk241) {
                return _.extend(node, newnode, kk241);
            }, new CpsContinuation())) : _.extend(node, newnode);
        }
        return [];
    } else if (node && node.type === 'CallExpression') {
        return [];
    } else if (node instanceof Object) {
        return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk242) {
            return _.map(node, root.walk_ast, kk242);
        }, new CpsContinuation())) : _.map(node, root.walk_ast);
    } else {
        return [];
    }
};
root.transform = function (ast) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk248) {
        return assert.equal(ast.type, 'Program', kk248);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk249) {
            return root.walk_ast(ast.body, kk249);
        }, new CpsContinuation())) : root.walk_ast(ast.body);
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk250) {
        return _.each(_.flatten(cps_func_ids), function (cps_func_id) {
            root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
        }, kk250);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
    });
    root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk251) {
        return root.unshift(ast.body, root.ast_prog_header(), true, kk251);
    }, new CpsContinuation())) : root.unshift(ast.body, root.ast_prog_header(), true);
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff259 = function (ast) {
        var l252 = arguments.length - 1;
        var k253 = arguments[l252];
        if (k253 instanceof CpsContinuation) {
            if (l252 >= 1) {
            } else if (l252 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk258) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk258) : escodegen.generate(ast);
            }, k253);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk257) {
            return escodegen.generate(ast, kk257);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff259.CpsEnabled = true;
    return ff259;
}();
root.compile = function CpsEnableWrapper() {
    var ff267 = function (data) {
        var l260 = arguments.length - 1;
        var k261 = arguments[l260];
        if (k261 instanceof CpsContinuation) {
            if (l260 >= 1) {
            } else if (l260 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk266) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk266) : root.generate(root.transform(root.parse(data)));
            }, k261);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk265) {
            return root.generate(root.transform(root.parse(data)), kk265);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff267.CpsEnabled = true;
    return ff267;
}();
root.enable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk280) {
            return require('fs', kk280);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk273) {
                return fs.readFileSync(filename, 'utf8', kk273);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk274) {
            return module._compile(root.compile(data), filename, kk274);
        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
    };
};
root.disable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk293) {
            return require('fs', kk293);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk286) {
                return fs.readFileSync(filename, 'utf8', kk286);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk287) {
            return module._compile(data, filename, kk287);
        }, new CpsContinuation())) : module._compile(data, filename);
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