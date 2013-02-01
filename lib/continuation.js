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
root.push = function CpsEnableWrapper() {
    var ff18 = function (lst, itm) {
        var l9 = arguments.length - 1;
        var k10 = arguments[l9];
        if (k10 instanceof CpsContinuation) {
            if (l9 >= 2) {
            } else if (l9 >= 1) {
                itm = undefined;
            } else if (l9 >= 0) {
                lst = undefined;
            }
            if (Array.isArray(itm)) {
                for (var i = 0; i < itm.length; i++) {
                    lst.push(itm[i]);
                }
            } else {
                return new CpsFunction(function (kk17) {
                    return lst.push.CpsEnabled ? lst.push(itm, kk17) : lst.push(itm);
                }, k10);
            }
            return;
        }
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
    ff18.CpsEnabled = true;
    return ff18;
}();
root.unshift = function (lst, itm, force) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk24) {
            return Array.isArray(itm, kk24);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        itm = itm.reverse.CpsEnabled ? CpsRun(new CpsFunction(function (kk25) {
            return itm.reverse(kk25);
        }, new CpsContinuation())) : itm.reverse();
    } else {
        itm = [itm];
    }
    if (!force) {
        while (lst.length > 0 && lst[0].type === 'FunctionDeclaration') {
            itm.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk26) {
                return itm.push(lst.shift(), kk26);
            }, new CpsContinuation())) : itm.push(lst.shift());
        }
    }
    for (var i = 0; i < itm.length; i++) {
        lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk27) {
            return lst.unshift(itm[i], kk27);
        }, new CpsContinuation())) : lst.unshift(itm[i]);
    }
};
root.ast_prog_header = function () {
    var ast = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk33) {
            return root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }', kk33);
        }, new CpsContinuation())) : root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk34) {
        return assert.equal(ast.type, 'Program', kk34);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    return ast.body;
};
root.new_variable_counter = 1;
root.generate_new_variable_name = function CpsEnableWrapper() {
    var ff43 = function (prefix, exclude_ids) {
        var l35 = arguments.length - 1;
        var k36 = arguments[l35];
        if (k36 instanceof CpsContinuation) {
            if (l35 >= 2) {
            } else if (l35 >= 1) {
                exclude_ids = undefined;
            } else if (l35 >= 0) {
                prefix = undefined;
            }
            var varname = prefix + root.new_variable_counter++;
            if (exclude_ids.indexOf(varname) >= 0) {
                return new CpsFunction(function (kk42) {
                    return root.generate_new_variable_name.CpsEnabled ? root.generate_new_variable_name(prefix, exclude_ids, kk42) : root.generate_new_variable_name(prefix, exclude_ids);
                }, k36);
            } else {
                return new CpsResult(k36.k(varname));
            }
            return;
        }
        var varname = prefix + root.new_variable_counter++;
        if ((exclude_ids.indexOf.CpsEnabled ? CpsRun(new CpsFunction(function (kk40) {
                return exclude_ids.indexOf(varname, kk40);
            }, new CpsContinuation())) : exclude_ids.indexOf(varname)) >= 0) {
            return root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk41) {
                return root.generate_new_variable_name(prefix, exclude_ids, kk41);
            }, new CpsContinuation())) : root.generate_new_variable_name(prefix, exclude_ids);
        } else {
            return varname;
        }
    };
    ff43.CpsEnabled = true;
    return ff43;
}();
root.ast_func_header = function (l_varname, t_varname, a_varname, exclude_ids) {
    var i_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk49) {
            return root.generate_new_variable_name('i', exclude_ids, kk49);
        }, new CpsContinuation())) : root.generate_new_variable_name('i', exclude_ids);
    var code = 'var ' + l_varname + ' = arguments.length - 1;';
    if (t_varname) {
        code += 'var ' + t_varname + ' = this;';
    }
    if (a_varname) {
        code += 'var ' + a_varname + ' = {}; for(var ' + i_varname + ' = 0; ' + i_varname + ' <= ' + l_varname + '; ' + i_varname + '++) { ' + a_varname + '[' + i_varname + '] = arguments[' + i_varname + ']; }' + a_varname + '.length = 1 + ' + l_varname + ';' + a_varname + '.callee = arguments.callee;';
    }
    var ast = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk50) {
            return root.parse(code, kk50);
        }, new CpsContinuation())) : root.parse(code);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk51) {
        return assert.equal(ast.type, 'Program', kk51);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    return ast.body;
};
root.ast_func_wrapper = function (k_varname, l_varname, a_varname, params) {
    var code = 'var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ';
    if (a_varname) {
        code += 'delete ' + a_varname + '[' + l_varname + ']; ' + a_varname + '.length--;';
    }
    if (params.length > 0) {
        code += 'if (' + l_varname + ' >= ' + params.length + ') {';
        for (var i = params.length - 1; i >= 0; i--) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk57) {
                return assert.equal(params[i].type, 'Identifier', kk57);
            }, new CpsContinuation())) : assert.equal(params[i].type, 'Identifier');
            code += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
        }
        code += '}';
    }
    code += '}';
    var ast = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk58) {
            return root.parse(code, kk58);
        }, new CpsContinuation())) : root.parse(code);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk59) {
        return assert.equal(ast.type, 'Program', kk59);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    return ast.body;
};
root.collect_all_identifiers = function (node) {
    var ids = [];
    var walk = function CpsEnableWrapper() {
            var ff69 = function (node) {
                var l60 = arguments.length - 1;
                var k61 = arguments[l60];
                if (k61 instanceof CpsContinuation) {
                    if (l60 >= 1) {
                    } else if (l60 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k61.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk67) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk67) : ids.push(node.name);
                        }, k61);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk68) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk68) : _.each(node, walk);
                        }, k61);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk65) {
                        return ids.push(node.name, kk65);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk66) {
                        return _.each(node, walk, kk66);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff69.CpsEnabled = true;
            return ff69;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk75) {
        return walk(node, kk75);
    }, new CpsContinuation())) : walk(node);
    return ids;
};
root.replace_this_var_with = function (body, t_varname) {
    var using_this_var = false;
    var walk = function CpsEnableWrapper() {
            var ff83 = function (node) {
                var l76 = arguments.length - 1;
                var k77 = arguments[l76];
                if (k77 instanceof CpsContinuation) {
                    if (l76 >= 1) {
                    } else if (l76 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k77.k(null));
                    } else if (node && node.type === 'ThisExpression') {
                        node.type = 'Identifier';
                        node.name = t_varname;
                        using_this_var = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk82) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk82) : _.each(node, walk);
                        }, k77);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk81) {
                        return _.each(node, walk, kk81);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff83.CpsEnabled = true;
            return ff83;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk89) {
        return walk(body, kk89);
    }, new CpsContinuation())) : walk(body);
    return using_this_var;
};
root.replace_arguments_with = function (body, a_varname) {
    var using_arguments = false;
    var walk = function CpsEnableWrapper() {
            var ff99 = function (node) {
                var l90 = arguments.length - 1;
                var k91 = arguments[l90];
                if (k91 instanceof CpsContinuation) {
                    if (l90 >= 1) {
                    } else if (l90 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k91.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k91.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk97) {
                            return walk.CpsEnabled ? walk(node.object, kk97) : walk(node.object);
                        }, k91);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk98) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk98) : _.each(node, walk);
                        }, k91);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk95) {
                        return walk(node.object, kk95);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk96) {
                        return _.each(node, walk, kk96);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff99.CpsEnabled = true;
            return ff99;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk105) {
        return walk(body, kk105);
    }, new CpsContinuation())) : walk(body);
    return using_arguments;
};
root.deep_clone = function CpsEnableWrapper() {
    var ff116 = function (node) {
        var l106 = arguments.length - 1;
        var k107 = arguments[l106];
        if (k107 instanceof CpsContinuation) {
            if (l106 >= 1) {
            } else if (l106 >= 0) {
                node = undefined;
            }
            if (node instanceof Date) {
                return new CpsResult(k107.k(node));
            } else if (node instanceof RegExp) {
                return new CpsResult(k107.k(node));
            } else if (Array.isArray(node)) {
                return new CpsFunction(function (kk114) {
                    return _.map.CpsEnabled ? _.map(node, root.deep_clone, kk114) : _.map(node, root.deep_clone);
                }, k107);
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk115) {
                    return _.object.CpsEnabled ? _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }), kk115) : _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone(x[1])
                        ];
                    }));
                }, k107);
            } else {
                return new CpsResult(k107.k(node));
            }
            return;
        }
        if (node instanceof Date) {
            return node;
        } else if (node instanceof RegExp) {
            return node;
        } else if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk111) {
                return Array.isArray(node, kk111);
            }, new CpsContinuation())) : Array.isArray(node)) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk112) {
                return _.map(node, root.deep_clone, kk112);
            }, new CpsContinuation())) : _.map(node, root.deep_clone);
        } else if (node instanceof Object) {
            return _.object.CpsEnabled ? CpsRun(new CpsFunction(function (kk113) {
                return _.object(_.map(_.pairs(node), function (x) {
                    return [
                        x[0],
                        root.deep_clone(x[1])
                    ];
                }), kk113);
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
    ff116.CpsEnabled = true;
    return ff116;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk122) {
        return assert.equal(body.type, 'BlockStatement', kk122);
    }, new CpsContinuation())) : assert.equal(body.type, 'BlockStatement');
    if (body.body.length === 0) {
        return false;
    }
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk123) {
            return root.walk_ast(body.body, kk123);
        }, new CpsContinuation())) : root.walk_ast(body.body);
    var l_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk124) {
            return root.generate_new_variable_name('l', exclude_ids, kk124);
        }, new CpsContinuation())) : root.generate_new_variable_name('l', exclude_ids);
    var k_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk125) {
            return root.generate_new_variable_name('k', exclude_ids, kk125);
        }, new CpsContinuation())) : root.generate_new_variable_name('k', exclude_ids);
    var t_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk126) {
            return root.generate_new_variable_name('t', exclude_ids, kk126);
        }, new CpsContinuation())) : root.generate_new_variable_name('t', exclude_ids);
    var a_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk127) {
            return root.generate_new_variable_name('a', exclude_ids, kk127);
        }, new CpsContinuation())) : root.generate_new_variable_name('a', exclude_ids);
    var using_this_var = root.replace_this_var_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk128) {
            return root.replace_this_var_with(body.body, t_varname, kk128);
        }, new CpsContinuation())) : root.replace_this_var_with(body.body, t_varname);
    var using_arguments = root.replace_arguments_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk129) {
            return root.replace_arguments_with(body.body, a_varname, kk129);
        }, new CpsContinuation())) : root.replace_arguments_with(body.body, a_varname);
    var header = root.ast_func_header.CpsEnabled ? CpsRun(new CpsFunction(function (kk130) {
            return root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids, kk130);
        }, new CpsContinuation())) : root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
    var newbody = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk131) {
            return root.deep_clone(body, kk131);
        }, new CpsContinuation())) : root.deep_clone(body);
    root.convert_function_call_to_new_cps_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk132) {
        return root.convert_function_call_to_new_cps_call(body.body, exclude_ids, kk132);
    }, new CpsContinuation())) : root.convert_function_call_to_new_cps_call(body.body, exclude_ids);
    var success = root.convert_normal_body_to_cps_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk133) {
            return root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody, kk133);
        }, new CpsContinuation())) : root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    if (success) {
        while (newbody.body.length > 0) {
            if (newbody.body[0].type === 'FunctionDeclaration') {
                newbody.body.shift.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
                    return newbody.body.shift(kk134);
                }, new CpsContinuation())) : newbody.body.shift();
            } else {
                break;
            }
        }
        var wrapper = root.ast_func_wrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk135) {
                return root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params, kk135);
            }, new CpsContinuation())) : root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk136) {
            return assert.ok(wrapper[1].consequent.body.length >= 0, kk136);
        }, new CpsContinuation())) : assert.ok(wrapper[1].consequent.body.length >= 0);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk137) {
            return root.push(wrapper[1].consequent.body, newbody.body, kk137);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, newbody.body);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk138) {
            return root.push(wrapper[1].consequent.body, {
                type: 'ReturnStatement',
                argument: null
            }, kk138);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, {
            type: 'ReturnStatement',
            argument: null
        });
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk139) {
            return root.unshift(body.body, wrapper, kk139);
        }, new CpsContinuation())) : root.unshift(body.body, wrapper);
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk140) {
            return root.unshift(body.body, header, kk140);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    } else if (using_this_var || using_arguments) {
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk141) {
            return root.unshift(body.body, header, kk141);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    }
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk142) {
        return _.each(_.flatten(cps_func_ids), function (cps_func_id) {
            root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
        }, kk142);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
    });
    return success;
};
root.has_side_effect = function CpsEnableWrapper() {
    var ff150 = function (node) {
        var l143 = arguments.length - 1;
        var k144 = arguments[l143];
        if (k144 instanceof CpsContinuation) {
            if (l143 >= 1) {
            } else if (l143 >= 0) {
                node = undefined;
            }
            if (!node) {
                return new CpsResult(k144.k(false));
            } else if (node.type === 'FunctionExpression') {
                return new CpsResult(k144.k(true));
            } else if (node.type === 'CallExpression') {
                return new CpsResult(k144.k(true));
            } else if (node.type === 'UpdateExpression') {
                return new CpsResult(k144.k(true));
            } else if (node.type === 'AssignmentExpression') {
                return new CpsResult(k144.k(true));
            } else if (node.type === 'NewExpression') {
                return new CpsResult(k144.k(true));
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk149) {
                    return _.some.CpsEnabled ? _.some(node, root.has_side_effect, kk149) : _.some(node, root.has_side_effect);
                }, k144);
            } else {
                return new CpsResult(k144.k(false));
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
            return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk148) {
                return _.some(node, root.has_side_effect, kk148);
            }, new CpsContinuation())) : _.some(node, root.has_side_effect);
        } else {
            return false;
        }
    };
    ff150.CpsEnabled = true;
    return ff150;
}();
root.convert_function_call_to_new_cps_call = function CpsEnableWrapper() {
    var ff179 = function (body, exclude_ids) {
        var l172 = arguments.length - 1;
        var k173 = arguments[l172];
        if (k173 instanceof CpsContinuation) {
            if (l172 >= 2) {
            } else if (l172 >= 1) {
                exclude_ids = undefined;
            } else if (l172 >= 0) {
                body = undefined;
            }
            var is_transformable_call = function (node) {
                if (!node.callee) {
                    return false;
                } else if (root.has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk156) {
                        return root.has_side_effect(node.callee, kk156);
                    }, new CpsContinuation())) : root.has_side_effect(node.callee)) {
                    return false;
                } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                    return false;
                } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                    return false;
                } else {
                    return true;
                }
            };
            var walk = function CpsEnableWrapper() {
                    var ff171 = function (node) {
                        var l157 = arguments.length - 1;
                        var k158 = arguments[l157];
                        if (k158 instanceof CpsContinuation) {
                            if (l157 >= 1) {
                            } else if (l157 >= 0) {
                                node = undefined;
                            }
                            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                                return new CpsResult(k158.k(null));
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
                                _.each(node, function (value, key) {
                                    delete node[key];
                                });
                                return new CpsFunction(function (kk169) {
                                    return _.extend.CpsEnabled ? _.extend(node, newnode, kk169) : _.extend(node, newnode);
                                }, k158);
                            } else if (node instanceof Object) {
                                return new CpsFunction(function (kk170) {
                                    return _.each.CpsEnabled ? _.each(node, walk, kk170) : _.each(node, walk);
                                }, k158);
                            }
                            return;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return;
                        } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                                return is_transformable_call(node, kk162);
                            }, new CpsContinuation())) : is_transformable_call(node))) {
                            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                                    return root.generate_new_variable_name('kk', exclude_ids, kk163);
                                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                            var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                                    return root.deep_clone(node, kk164);
                                }, new CpsContinuation())) : root.deep_clone(node);
                            cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                                return cpsnode.arguments.push({
                                    type: 'Identifier',
                                    name: kk_varname
                                }, kk165);
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
                            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                                return _.each(node, function (value, key) {
                                    delete node[key];
                                }, kk166);
                            }, new CpsContinuation())) : _.each(node, function (value, key) {
                                delete node[key];
                            });
                            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                                return _.extend(node, newnode, kk167);
                            }, new CpsContinuation())) : _.extend(node, newnode);
                        } else if (node instanceof Object) {
                            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                                return _.each(node, walk, kk168);
                            }, new CpsContinuation())) : _.each(node, walk);
                        }
                    };
                    ff171.CpsEnabled = true;
                    return ff171;
                }();
            return new CpsFunction(function (kk178) {
                return walk.CpsEnabled ? walk(body, kk178) : walk(body);
            }, k173);
            return;
        }
        var is_transformable_call = function (node) {
            if (!node.callee) {
                return false;
            } else if (root.has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk156) {
                    return root.has_side_effect(node.callee, kk156);
                }, new CpsContinuation())) : root.has_side_effect(node.callee)) {
                return false;
            } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                return false;
            } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                return false;
            } else {
                return true;
            }
        };
        var walk = function CpsEnableWrapper() {
                var ff171 = function (node) {
                    var l157 = arguments.length - 1;
                    var k158 = arguments[l157];
                    if (k158 instanceof CpsContinuation) {
                        if (l157 >= 1) {
                        } else if (l157 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k158.k(null));
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
                            _.each(node, function (value, key) {
                                delete node[key];
                            });
                            return new CpsFunction(function (kk169) {
                                return _.extend.CpsEnabled ? _.extend(node, newnode, kk169) : _.extend(node, newnode);
                            }, k158);
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk170) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk170) : _.each(node, walk);
                            }, k158);
                        }
                        return;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return;
                    } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                            return is_transformable_call(node, kk162);
                        }, new CpsContinuation())) : is_transformable_call(node))) {
                        var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                                return root.generate_new_variable_name('kk', exclude_ids, kk163);
                            }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                        var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                                return root.deep_clone(node, kk164);
                            }, new CpsContinuation())) : root.deep_clone(node);
                        cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                            return cpsnode.arguments.push({
                                type: 'Identifier',
                                name: kk_varname
                            }, kk165);
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
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                            return _.each(node, function (value, key) {
                                delete node[key];
                            }, kk166);
                        }, new CpsContinuation())) : _.each(node, function (value, key) {
                            delete node[key];
                        });
                        _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                            return _.extend(node, newnode, kk167);
                        }, new CpsContinuation())) : _.extend(node, newnode);
                    } else if (node instanceof Object) {
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                            return _.each(node, walk, kk168);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff171.CpsEnabled = true;
                return ff171;
            }();
        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk177) {
            return walk(body, kk177);
        }, new CpsContinuation())) : walk(body);
    };
    ff179.CpsEnabled = true;
    return ff179;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff252 = function (k_varname, exclude_ids, body) {
        var l245 = arguments.length - 1;
        var k246 = arguments[l245];
        if (k246 instanceof CpsContinuation) {
            if (l245 >= 3) {
            } else if (l245 >= 2) {
                body = undefined;
            } else if (l245 >= 1) {
                exclude_ids = undefined;
            } else if (l245 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk185) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk185);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var call_expression1 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk186) {
                        return root.deep_clone(call_expression, kk186);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk187) {
                        return root.deep_clone(call_expression, kk187);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk188) {
                    return call_expression2.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk188);
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
            var is_callee_cpsenablewrapper = function (node) {
                return node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper';
            };
            var walk = function CpsEnableWrapper() {
                    var ff244 = function (node, tail, wrapped) {
                        var l199 = arguments.length - 1;
                        var k200 = arguments[l199];
                        if (k200 instanceof CpsContinuation) {
                            if (l199 >= 3) {
                            } else if (l199 >= 2) {
                                wrapped = undefined;
                            } else if (l199 >= 1) {
                                tail = undefined;
                            } else if (l199 >= 0) {
                                node = undefined;
                            }
                            var transformed;
                            var i;
                            if (node === undefined || node === null) {
                                return new CpsResult(k200.k(0));
                            } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                                return new CpsResult(k200.k(0));
                            } else if (node.type === 'CallExpression') {
                                if (tail && !wrapped && !is_callee_cpsenablewrapper(node) && !root.has_side_effect(node.callee)) {
                                    var newnode = create_cps_expression(node);
                                    _.each(node, function (value, key) {
                                        delete node[key];
                                    });
                                    _.extend(node, newnode);
                                    return new CpsResult(k200.k(1));
                                } else {
                                    return new CpsResult(k200.k(0));
                                }
                            } else if (node.type === 'ConditionalExpression') {
                                return new CpsResult(k200.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'SequenceExpression') {
                                transformed = 0;
                                for (i = 0; i < node.expressions.length; i++) {
                                    transformed += walk(node.expressions[i], false, wrapped);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression') {
                                return new CpsResult(k200.k(0));
                            } else if (node.type === 'BlockStatement') {
                                transformed = 0;
                                for (i = 0; i < node.body.length; i++) {
                                    transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'ExpressionStatement') {
                                transformed = walk(node.expression, tail, wrapped);
                                if (transformed) {
                                    node.type = 'ReturnStatement';
                                    node.argument = node.expression;
                                    delete node.expression;
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                                return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                            } else if (node.type === 'ForStatement') {
                                return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                            } else if (node.type === 'ForInStatement') {
                                return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                            } else if (node.type === 'IfStatement') {
                                return new CpsResult(k200.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                            } else if (node.type === 'LabeledStatement') {
                                return new CpsFunction(function (kk242) {
                                    return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk242) : walk(node.body, tail, wrapped);
                                }, k200);
                            } else if (node.type === 'WithStatement') {
                                return new CpsResult(k200.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                            } else if (node.type === 'ReturnStatement') {
                                transformed = walk(node.argument, !wrapped, false);
                                if (transformed === 0) {
                                    node.argument = create_cps_result(node.argument);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'TryStatement') {
                                transformed = walk(node.block, tail, true);
                                for (i = 0; i < node.guardedHandlers.length; i++) {
                                    transformed += walk(node.guardedHandlers[i].body, tail, true);
                                }
                                for (i = 0; i < node.handlers.length; i++) {
                                    transformed += walk(node.handlers[i].body, tail, true);
                                }
                                transformed += walk(node.finalizer, tail, wrapped);
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'ThrowStatement') {
                                return new CpsFunction(function (kk243) {
                                    return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk243) : walk(node.argument, false, wrapped);
                                }, k200);
                            } else if (node.type === 'SwitchStatement') {
                                transformed = walk(node.discriminant, false, wrapped);
                                for (i = 0; i < node.cases.length; i++) {
                                    transformed += walk(node.cases[i], false, wrapped);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'SwitchCase') {
                                transformed = walk(node.test, false, wrapped);
                                for (i = 0; i < node.consequent.length; i++) {
                                    transformed += walk(node.consequent[i], false, wrapped);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement') {
                                return new CpsResult(k200.k(0));
                            } else if (node.type === 'VariableDeclaration') {
                                transformed = 0;
                                for (i = 0; i < node.declarations.length; i++) {
                                    transformed += walk(node.declarations[i].init, false, wrapped);
                                }
                                return new CpsResult(k200.k(transformed));
                            } else if (node.type === 'Identifier') {
                                return new CpsResult(k200.k(0));
                            } else if (node.type === 'Literal') {
                                return new CpsResult(k200.k(0));
                            } else {
                                console.warn('continuing with unsupported node type: ' + node.type);
                                return new CpsResult(k200.k(0));
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
                            if (tail && !wrapped && !(is_callee_cpsenablewrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk204) {
                                    return is_callee_cpsenablewrapper(node, kk204);
                                }, new CpsContinuation())) : is_callee_cpsenablewrapper(node)) && !(root.has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk205) {
                                    return root.has_side_effect(node.callee, kk205);
                                }, new CpsContinuation())) : root.has_side_effect(node.callee))) {
                                var newnode = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk206) {
                                        return create_cps_expression(node, kk206);
                                    }, new CpsContinuation())) : create_cps_expression(node);
                                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                                    return _.each(node, function (value, key) {
                                        delete node[key];
                                    }, kk207);
                                }, new CpsContinuation())) : _.each(node, function (value, key) {
                                    delete node[key];
                                });
                                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                                    return _.extend(node, newnode, kk208);
                                }, new CpsContinuation())) : _.extend(node, newnode);
                                return 1;
                            } else {
                                return 0;
                            }
                        } else if (node.type === 'ConditionalExpression') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                                return walk(node.test, false, wrapped, kk209);
                            }, new CpsContinuation())) : walk(node.test, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                                return walk(node.consequent, tail, wrapped, kk210);
                            }, new CpsContinuation())) : walk(node.consequent, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                                return walk(node.alternate, tail, wrapped, kk211);
                            }, new CpsContinuation())) : walk(node.alternate, tail, wrapped));
                        } else if (node.type === 'SequenceExpression') {
                            transformed = 0;
                            for (i = 0; i < node.expressions.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                                    return walk(node.expressions[i], false, wrapped, kk212);
                                }, new CpsContinuation())) : walk(node.expressions[i], false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression') {
                            return 0;
                        } else if (node.type === 'BlockStatement') {
                            transformed = 0;
                            for (i = 0; i < node.body.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                                    return walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped, kk213);
                                }, new CpsContinuation())) : walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'ExpressionStatement') {
                            transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk214) {
                                return walk(node.expression, tail, wrapped, kk214);
                            }, new CpsContinuation())) : walk(node.expression, tail, wrapped);
                            if (transformed) {
                                node.type = 'ReturnStatement';
                                node.argument = node.expression;
                                delete node.expression;
                            }
                            return transformed;
                        } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk215) {
                                return walk(node.body, false, wrapped, kk215);
                            }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk216) {
                                return walk(node.test, false, wrapped, kk216);
                            }, new CpsContinuation())) : walk(node.test, false, wrapped));
                        } else if (node.type === 'ForStatement') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                                return walk(node.body, false, wrapped, kk217);
                            }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk218) {
                                return walk(node.init, false, wrapped, kk218);
                            }, new CpsContinuation())) : walk(node.init, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk219) {
                                return walk(node.test, false, wrapped, kk219);
                            }, new CpsContinuation())) : walk(node.test, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk220) {
                                return walk(node.update, false, wrapped, kk220);
                            }, new CpsContinuation())) : walk(node.update, false, wrapped));
                        } else if (node.type === 'ForInStatement') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk221) {
                                return walk(node.body, false, wrapped, kk221);
                            }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk222) {
                                return walk(node.left, false, wrapped, kk222);
                            }, new CpsContinuation())) : walk(node.left, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk223) {
                                return walk(node.right, false, wrapped, kk223);
                            }, new CpsContinuation())) : walk(node.right, false, wrapped));
                        } else if (node.type === 'IfStatement') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk224) {
                                return walk(node.consequent, tail, wrapped, kk224);
                            }, new CpsContinuation())) : walk(node.consequent, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk225) {
                                return walk(node.alternate, tail, wrapped, kk225);
                            }, new CpsContinuation())) : walk(node.alternate, tail, wrapped));
                        } else if (node.type === 'LabeledStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk226) {
                                return walk(node.body, tail, wrapped, kk226);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                        } else if (node.type === 'WithStatement') {
                            return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk227) {
                                return walk(node.body, tail, wrapped, kk227);
                            }, new CpsContinuation())) : walk(node.body, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk228) {
                                return walk(node.object, false, wrapped, kk228);
                            }, new CpsContinuation())) : walk(node.object, false, wrapped));
                        } else if (node.type === 'ReturnStatement') {
                            transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk229) {
                                return walk(node.argument, !wrapped, false, kk229);
                            }, new CpsContinuation())) : walk(node.argument, !wrapped, false);
                            if (transformed === 0) {
                                node.argument = create_cps_result.CpsEnabled ? CpsRun(new CpsFunction(function (kk230) {
                                    return create_cps_result(node.argument, kk230);
                                }, new CpsContinuation())) : create_cps_result(node.argument);
                            }
                            return transformed;
                        } else if (node.type === 'TryStatement') {
                            transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk231) {
                                return walk(node.block, tail, true, kk231);
                            }, new CpsContinuation())) : walk(node.block, tail, true);
                            for (i = 0; i < node.guardedHandlers.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk232) {
                                    return walk(node.guardedHandlers[i].body, tail, true, kk232);
                                }, new CpsContinuation())) : walk(node.guardedHandlers[i].body, tail, true);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk233) {
                                    return walk(node.handlers[i].body, tail, true, kk233);
                                }, new CpsContinuation())) : walk(node.handlers[i].body, tail, true);
                            }
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk234) {
                                return walk(node.finalizer, tail, wrapped, kk234);
                            }, new CpsContinuation())) : walk(node.finalizer, tail, wrapped);
                            return transformed;
                        } else if (node.type === 'ThrowStatement') {
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk235) {
                                return walk(node.argument, false, wrapped, kk235);
                            }, new CpsContinuation())) : walk(node.argument, false, wrapped);
                        } else if (node.type === 'SwitchStatement') {
                            transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return walk(node.discriminant, false, wrapped, kk236);
                            }, new CpsContinuation())) : walk(node.discriminant, false, wrapped);
                            for (i = 0; i < node.cases.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk237) {
                                    return walk(node.cases[i], false, wrapped, kk237);
                                }, new CpsContinuation())) : walk(node.cases[i], false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'SwitchCase') {
                            transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk238) {
                                return walk(node.test, false, wrapped, kk238);
                            }, new CpsContinuation())) : walk(node.test, false, wrapped);
                            for (i = 0; i < node.consequent.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk239) {
                                    return walk(node.consequent[i], false, wrapped, kk239);
                                }, new CpsContinuation())) : walk(node.consequent[i], false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement') {
                            return 0;
                        } else if (node.type === 'VariableDeclaration') {
                            transformed = 0;
                            for (i = 0; i < node.declarations.length; i++) {
                                transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk240) {
                                    return walk(node.declarations[i].init, false, wrapped, kk240);
                                }, new CpsContinuation())) : walk(node.declarations[i].init, false, wrapped);
                            }
                            return transformed;
                        } else if (node.type === 'Identifier') {
                            return 0;
                        } else if (node.type === 'Literal') {
                            return 0;
                        } else {
                            console.warn.CpsEnabled ? CpsRun(new CpsFunction(function (kk241) {
                                return console.warn('continuing with unsupported node type: ' + node.type, kk241);
                            }, new CpsContinuation())) : console.warn('continuing with unsupported node type: ' + node.type);
                            return 0;
                        }
                    };
                    ff244.CpsEnabled = true;
                    return ff244;
                }();
            return new CpsFunction(function (kk251) {
                return walk.CpsEnabled ? walk(body, true, false, kk251) : walk(body, true, false);
            }, k246);
            return;
        }
        var create_cps_expression = function (call_expression) {
            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk185) {
                    return root.generate_new_variable_name('kk', exclude_ids, kk185);
                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
            var call_expression1 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk186) {
                    return root.deep_clone(call_expression, kk186);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk187) {
                    return root.deep_clone(call_expression, kk187);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk188) {
                return call_expression2.arguments.push({
                    type: 'Identifier',
                    name: kk_varname
                }, kk188);
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
        var is_callee_cpsenablewrapper = function (node) {
            return node.callee && node.callee.id && node.callee.id.type === 'Identifier' && node.callee.id.name === 'CpsEnableWrapper';
        };
        var walk = function CpsEnableWrapper() {
                var ff244 = function (node, tail, wrapped) {
                    var l199 = arguments.length - 1;
                    var k200 = arguments[l199];
                    if (k200 instanceof CpsContinuation) {
                        if (l199 >= 3) {
                        } else if (l199 >= 2) {
                            wrapped = undefined;
                        } else if (l199 >= 1) {
                            tail = undefined;
                        } else if (l199 >= 0) {
                            node = undefined;
                        }
                        var transformed;
                        var i;
                        if (node === undefined || node === null) {
                            return new CpsResult(k200.k(0));
                        } else if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                            return new CpsResult(k200.k(0));
                        } else if (node.type === 'CallExpression') {
                            if (tail && !wrapped && !is_callee_cpsenablewrapper(node) && !root.has_side_effect(node.callee)) {
                                var newnode = create_cps_expression(node);
                                _.each(node, function (value, key) {
                                    delete node[key];
                                });
                                _.extend(node, newnode);
                                return new CpsResult(k200.k(1));
                            } else {
                                return new CpsResult(k200.k(0));
                            }
                        } else if (node.type === 'ConditionalExpression') {
                            return new CpsResult(k200.k(walk(node.test, false, wrapped) + walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'SequenceExpression') {
                            transformed = 0;
                            for (i = 0; i < node.expressions.length; i++) {
                                transformed += walk(node.expressions[i], false, wrapped);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression') {
                            return new CpsResult(k200.k(0));
                        } else if (node.type === 'BlockStatement') {
                            transformed = 0;
                            for (i = 0; i < node.body.length; i++) {
                                transformed += walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'ExpressionStatement') {
                            transformed = walk(node.expression, tail, wrapped);
                            if (transformed) {
                                node.type = 'ReturnStatement';
                                node.argument = node.expression;
                                delete node.expression;
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                            return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.test, false, wrapped)));
                        } else if (node.type === 'ForStatement') {
                            return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.init, false, wrapped) + walk(node.test, false, wrapped) + walk(node.update, false, wrapped)));
                        } else if (node.type === 'ForInStatement') {
                            return new CpsResult(k200.k(walk(node.body, false, wrapped) + walk(node.left, false, wrapped) + walk(node.right, false, wrapped)));
                        } else if (node.type === 'IfStatement') {
                            return new CpsResult(k200.k(walk(node.consequent, tail, wrapped) + walk(node.alternate, tail, wrapped)));
                        } else if (node.type === 'LabeledStatement') {
                            return new CpsFunction(function (kk242) {
                                return walk.CpsEnabled ? walk(node.body, tail, wrapped, kk242) : walk(node.body, tail, wrapped);
                            }, k200);
                        } else if (node.type === 'WithStatement') {
                            return new CpsResult(k200.k(walk(node.body, tail, wrapped) + walk(node.object, false, wrapped)));
                        } else if (node.type === 'ReturnStatement') {
                            transformed = walk(node.argument, !wrapped, false);
                            if (transformed === 0) {
                                node.argument = create_cps_result(node.argument);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'TryStatement') {
                            transformed = walk(node.block, tail, true);
                            for (i = 0; i < node.guardedHandlers.length; i++) {
                                transformed += walk(node.guardedHandlers[i].body, tail, true);
                            }
                            for (i = 0; i < node.handlers.length; i++) {
                                transformed += walk(node.handlers[i].body, tail, true);
                            }
                            transformed += walk(node.finalizer, tail, wrapped);
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'ThrowStatement') {
                            return new CpsFunction(function (kk243) {
                                return walk.CpsEnabled ? walk(node.argument, false, wrapped, kk243) : walk(node.argument, false, wrapped);
                            }, k200);
                        } else if (node.type === 'SwitchStatement') {
                            transformed = walk(node.discriminant, false, wrapped);
                            for (i = 0; i < node.cases.length; i++) {
                                transformed += walk(node.cases[i], false, wrapped);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'SwitchCase') {
                            transformed = walk(node.test, false, wrapped);
                            for (i = 0; i < node.consequent.length; i++) {
                                transformed += walk(node.consequent[i], false, wrapped);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement') {
                            return new CpsResult(k200.k(0));
                        } else if (node.type === 'VariableDeclaration') {
                            transformed = 0;
                            for (i = 0; i < node.declarations.length; i++) {
                                transformed += walk(node.declarations[i].init, false, wrapped);
                            }
                            return new CpsResult(k200.k(transformed));
                        } else if (node.type === 'Identifier') {
                            return new CpsResult(k200.k(0));
                        } else if (node.type === 'Literal') {
                            return new CpsResult(k200.k(0));
                        } else {
                            console.warn('continuing with unsupported node type: ' + node.type);
                            return new CpsResult(k200.k(0));
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
                        if (tail && !wrapped && !(is_callee_cpsenablewrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk204) {
                                return is_callee_cpsenablewrapper(node, kk204);
                            }, new CpsContinuation())) : is_callee_cpsenablewrapper(node)) && !(root.has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk205) {
                                return root.has_side_effect(node.callee, kk205);
                            }, new CpsContinuation())) : root.has_side_effect(node.callee))) {
                            var newnode = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk206) {
                                    return create_cps_expression(node, kk206);
                                }, new CpsContinuation())) : create_cps_expression(node);
                            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                                return _.each(node, function (value, key) {
                                    delete node[key];
                                }, kk207);
                            }, new CpsContinuation())) : _.each(node, function (value, key) {
                                delete node[key];
                            });
                            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                                return _.extend(node, newnode, kk208);
                            }, new CpsContinuation())) : _.extend(node, newnode);
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (node.type === 'ConditionalExpression') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                            return walk(node.test, false, wrapped, kk209);
                        }, new CpsContinuation())) : walk(node.test, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                            return walk(node.consequent, tail, wrapped, kk210);
                        }, new CpsContinuation())) : walk(node.consequent, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                            return walk(node.alternate, tail, wrapped, kk211);
                        }, new CpsContinuation())) : walk(node.alternate, tail, wrapped));
                    } else if (node.type === 'SequenceExpression') {
                        transformed = 0;
                        for (i = 0; i < node.expressions.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                                return walk(node.expressions[i], false, wrapped, kk212);
                            }, new CpsContinuation())) : walk(node.expressions[i], false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'AssignmentExpression' || node.type === 'BinaryExpression' || node.type === 'UpdateExpression' || node.type === 'MemberExpression' || node.type === 'LogicalExpression' || node.type === 'ArrayExpression' || node.type === 'ObjectExpression' || node.type === 'UnaryExpression' || node.type === 'NewExpression') {
                        return 0;
                    } else if (node.type === 'BlockStatement') {
                        transformed = 0;
                        for (i = 0; i < node.body.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                                return walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped, kk213);
                            }, new CpsContinuation())) : walk(node.body[i], i === node.body.length - 1 ? tail : false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'ExpressionStatement') {
                        transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk214) {
                            return walk(node.expression, tail, wrapped, kk214);
                        }, new CpsContinuation())) : walk(node.expression, tail, wrapped);
                        if (transformed) {
                            node.type = 'ReturnStatement';
                            node.argument = node.expression;
                            delete node.expression;
                        }
                        return transformed;
                    } else if (node.type === 'DoWhileStatement' || node.type === 'WhileStatement') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk215) {
                            return walk(node.body, false, wrapped, kk215);
                        }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk216) {
                            return walk(node.test, false, wrapped, kk216);
                        }, new CpsContinuation())) : walk(node.test, false, wrapped));
                    } else if (node.type === 'ForStatement') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                            return walk(node.body, false, wrapped, kk217);
                        }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk218) {
                            return walk(node.init, false, wrapped, kk218);
                        }, new CpsContinuation())) : walk(node.init, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk219) {
                            return walk(node.test, false, wrapped, kk219);
                        }, new CpsContinuation())) : walk(node.test, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk220) {
                            return walk(node.update, false, wrapped, kk220);
                        }, new CpsContinuation())) : walk(node.update, false, wrapped));
                    } else if (node.type === 'ForInStatement') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk221) {
                            return walk(node.body, false, wrapped, kk221);
                        }, new CpsContinuation())) : walk(node.body, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk222) {
                            return walk(node.left, false, wrapped, kk222);
                        }, new CpsContinuation())) : walk(node.left, false, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk223) {
                            return walk(node.right, false, wrapped, kk223);
                        }, new CpsContinuation())) : walk(node.right, false, wrapped));
                    } else if (node.type === 'IfStatement') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk224) {
                            return walk(node.consequent, tail, wrapped, kk224);
                        }, new CpsContinuation())) : walk(node.consequent, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk225) {
                            return walk(node.alternate, tail, wrapped, kk225);
                        }, new CpsContinuation())) : walk(node.alternate, tail, wrapped));
                    } else if (node.type === 'LabeledStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk226) {
                            return walk(node.body, tail, wrapped, kk226);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped);
                    } else if (node.type === 'WithStatement') {
                        return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk227) {
                            return walk(node.body, tail, wrapped, kk227);
                        }, new CpsContinuation())) : walk(node.body, tail, wrapped)) + (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk228) {
                            return walk(node.object, false, wrapped, kk228);
                        }, new CpsContinuation())) : walk(node.object, false, wrapped));
                    } else if (node.type === 'ReturnStatement') {
                        transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk229) {
                            return walk(node.argument, !wrapped, false, kk229);
                        }, new CpsContinuation())) : walk(node.argument, !wrapped, false);
                        if (transformed === 0) {
                            node.argument = create_cps_result.CpsEnabled ? CpsRun(new CpsFunction(function (kk230) {
                                return create_cps_result(node.argument, kk230);
                            }, new CpsContinuation())) : create_cps_result(node.argument);
                        }
                        return transformed;
                    } else if (node.type === 'TryStatement') {
                        transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk231) {
                            return walk(node.block, tail, true, kk231);
                        }, new CpsContinuation())) : walk(node.block, tail, true);
                        for (i = 0; i < node.guardedHandlers.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk232) {
                                return walk(node.guardedHandlers[i].body, tail, true, kk232);
                            }, new CpsContinuation())) : walk(node.guardedHandlers[i].body, tail, true);
                        }
                        for (i = 0; i < node.handlers.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk233) {
                                return walk(node.handlers[i].body, tail, true, kk233);
                            }, new CpsContinuation())) : walk(node.handlers[i].body, tail, true);
                        }
                        transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk234) {
                            return walk(node.finalizer, tail, wrapped, kk234);
                        }, new CpsContinuation())) : walk(node.finalizer, tail, wrapped);
                        return transformed;
                    } else if (node.type === 'ThrowStatement') {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk235) {
                            return walk(node.argument, false, wrapped, kk235);
                        }, new CpsContinuation())) : walk(node.argument, false, wrapped);
                    } else if (node.type === 'SwitchStatement') {
                        transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                            return walk(node.discriminant, false, wrapped, kk236);
                        }, new CpsContinuation())) : walk(node.discriminant, false, wrapped);
                        for (i = 0; i < node.cases.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk237) {
                                return walk(node.cases[i], false, wrapped, kk237);
                            }, new CpsContinuation())) : walk(node.cases[i], false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'SwitchCase') {
                        transformed = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk238) {
                            return walk(node.test, false, wrapped, kk238);
                        }, new CpsContinuation())) : walk(node.test, false, wrapped);
                        for (i = 0; i < node.consequent.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk239) {
                                return walk(node.consequent[i], false, wrapped, kk239);
                            }, new CpsContinuation())) : walk(node.consequent[i], false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'EmptyStatement') {
                        return 0;
                    } else if (node.type === 'VariableDeclaration') {
                        transformed = 0;
                        for (i = 0; i < node.declarations.length; i++) {
                            transformed += walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk240) {
                                return walk(node.declarations[i].init, false, wrapped, kk240);
                            }, new CpsContinuation())) : walk(node.declarations[i].init, false, wrapped);
                        }
                        return transformed;
                    } else if (node.type === 'Identifier') {
                        return 0;
                    } else if (node.type === 'Literal') {
                        return 0;
                    } else {
                        console.warn.CpsEnabled ? CpsRun(new CpsFunction(function (kk241) {
                            return console.warn('continuing with unsupported node type: ' + node.type, kk241);
                        }, new CpsContinuation())) : console.warn('continuing with unsupported node type: ' + node.type);
                        return 0;
                    }
                };
                ff244.CpsEnabled = true;
                return ff244;
            }();
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk250) {
            return walk(body, true, false, kk250);
        }, new CpsContinuation())) : walk(body, true, false);
    };
    ff252.CpsEnabled = true;
    return ff252;
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
    var ff274 = function (node) {
        var l258 = arguments.length - 1;
        var k259 = arguments[l258];
        if (k259 instanceof CpsContinuation) {
            if (l258 >= 1) {
            } else if (l258 >= 0) {
                node = undefined;
            }
            var exclude_ids;
            if (node && node.type === 'FunctionDeclaration') {
                exclude_ids = root.collect_all_identifiers(node.body);
                if (root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
                    assert.equal(node.id.type, 'Identifier');
                    return new CpsResult(k259.k(node.id.name));
                } else {
                    return new CpsResult(k259.k([]));
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
                return new CpsResult(k259.k([]));
            } else if (node && node.type === 'CallExpression') {
                return new CpsResult(k259.k([]));
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk273) {
                    return _.map.CpsEnabled ? _.map(node, root.walk_ast, kk273) : _.map(node, root.walk_ast);
                }, k259);
            } else {
                return new CpsResult(k259.k([]));
            }
            return;
        }
        var exclude_ids;
        if (node && node.type === 'FunctionDeclaration') {
            exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk263) {
                return root.collect_all_identifiers(node.body, kk263);
            }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
            if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk264) {
                    return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk264);
                }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
                assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk265) {
                    return assert.equal(node.id.type, 'Identifier', kk265);
                }, new CpsContinuation())) : assert.equal(node.id.type, 'Identifier');
                return node.id.name;
            } else {
                return [];
            }
        } else if (node && node.type === 'FunctionExpression') {
            exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk266) {
                return root.collect_all_identifiers(node.body, kk266);
            }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
            if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk267) {
                    return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk267);
                }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
                var ff_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk268) {
                        return root.generate_new_variable_name('ff', exclude_ids, kk268);
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
                                    root.create_cpsenabled_statement.CpsEnabled ? CpsRun(new CpsFunction(function (kk269) {
                                        return root.create_cpsenabled_statement(ff_varname, kk269);
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
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk270) {
                    return _.each(node, function (value, key) {
                        delete node[key];
                    }, kk270);
                }, new CpsContinuation())) : _.each(node, function (value, key) {
                    delete node[key];
                });
                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk271) {
                    return _.extend(node, newnode, kk271);
                }, new CpsContinuation())) : _.extend(node, newnode);
            }
            return [];
        } else if (node && node.type === 'CallExpression') {
            return [];
        } else if (node instanceof Object) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk272) {
                return _.map(node, root.walk_ast, kk272);
            }, new CpsContinuation())) : _.map(node, root.walk_ast);
        } else {
            return [];
        }
    };
    ff274.CpsEnabled = true;
    return ff274;
}();
root.transform = function (ast) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk280) {
        return assert.equal(ast.type, 'Program', kk280);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk281) {
            return root.walk_ast(ast.body, kk281);
        }, new CpsContinuation())) : root.walk_ast(ast.body);
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk282) {
        return _.each(_.flatten(cps_func_ids), function (cps_func_id) {
            root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
        }, kk282);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function (cps_func_id) {
        root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
    });
    root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk283) {
        return root.unshift(ast.body, root.ast_prog_header(), true, kk283);
    }, new CpsContinuation())) : root.unshift(ast.body, root.ast_prog_header(), true);
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff291 = function (ast) {
        var l284 = arguments.length - 1;
        var k285 = arguments[l284];
        if (k285 instanceof CpsContinuation) {
            if (l284 >= 1) {
            } else if (l284 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk290) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk290) : escodegen.generate(ast);
            }, k285);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk289) {
            return escodegen.generate(ast, kk289);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff291.CpsEnabled = true;
    return ff291;
}();
root.compile = function CpsEnableWrapper() {
    var ff299 = function (data) {
        var l292 = arguments.length - 1;
        var k293 = arguments[l292];
        if (k293 instanceof CpsContinuation) {
            if (l292 >= 1) {
            } else if (l292 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk298) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk298) : root.generate(root.transform(root.parse(data)));
            }, k293);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk297) {
            return root.generate(root.transform(root.parse(data)), kk297);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff299.CpsEnabled = true;
    return ff299;
}();
root.saved_require_js_function = null;
root.enable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk314) {
            return require('fs', kk314);
        }, new CpsContinuation())) : require('fs');
    if (!root.saved_require_js_function) {
        root.saved_require_js_function = require.extensions['.js'];
        require.extensions['.js'] = function CpsEnableWrapper() {
            var ff308 = function (module, filename) {
                var l300 = arguments.length - 1;
                var k301 = arguments[l300];
                if (k301 instanceof CpsContinuation) {
                    if (l300 >= 2) {
                    } else if (l300 >= 1) {
                        filename = undefined;
                    } else if (l300 >= 0) {
                        module = undefined;
                    }
                    var data = fs.readFileSync(filename, 'utf8');
                    return new CpsFunction(function (kk307) {
                        return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk307) : module._compile(root.compile(data), filename);
                    }, k301);
                    return;
                }
                var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk305) {
                        return fs.readFileSync(filename, 'utf8', kk305);
                    }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk306) {
                    return module._compile(root.compile(data), filename, kk306);
                }, new CpsContinuation())) : module._compile(root.compile(data), filename);
            };
            ff308.CpsEnabled = true;
            return ff308;
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