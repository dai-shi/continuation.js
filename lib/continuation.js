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
    var ff120 = function (node) {
        var l110 = arguments.length - 1;
        var k111 = arguments[l110];
        if (k111 instanceof CpsContinuation) {
            if (l110 >= 1) {
            } else if (l110 >= 0) {
                node = undefined;
            }
            if (node instanceof Date) {
                return new CpsResult(k111.k(node));
            } else if (node instanceof RegExp) {
                return new CpsResult(k111.k(node));
            } else if (Array.isArray(node)) {
                return new CpsFunction(function (kk118) {
                    return _.map.CpsEnabled ? _.map(node, root.deep_clone, kk118) : _.map(node, root.deep_clone);
                }, k111);
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk119) {
                    return _.object.CpsEnabled ? _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
                                return root.deep_clone(x[1], kk109);
                            }, new CpsContinuation())) : root.deep_clone(x[1])
                        ];
                    }), kk119) : _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
                                return root.deep_clone(x[1], kk109);
                            }, new CpsContinuation())) : root.deep_clone(x[1])
                        ];
                    }));
                }, k111);
            } else {
                return new CpsResult(k111.k(node));
            }
            return;
        }
        if (node instanceof Date) {
            return node;
        } else if (node instanceof RegExp) {
            return node;
        } else if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk115) {
                return Array.isArray(node, kk115);
            }, new CpsContinuation())) : Array.isArray(node)) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk116) {
                return _.map(node, root.deep_clone, kk116);
            }, new CpsContinuation())) : _.map(node, root.deep_clone);
        } else if (node instanceof Object) {
            return _.object.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
                return _.object(_.map(_.pairs(node), function (x) {
                    return [
                        x[0],
                        root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
                            return root.deep_clone(x[1], kk109);
                        }, new CpsContinuation())) : root.deep_clone(x[1])
                    ];
                }), kk117);
            }, new CpsContinuation())) : _.object(_.map(_.pairs(node), function (x) {
                return [
                    x[0],
                    root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
                        return root.deep_clone(x[1], kk109);
                    }, new CpsContinuation())) : root.deep_clone(x[1])
                ];
            }));
        } else {
            return node;
        }
    };
    ff120.CpsEnabled = true;
    return ff120;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
        return assert.equal(body.type, 'BlockStatement', kk134);
    }, new CpsContinuation())) : assert.equal(body.type, 'BlockStatement');
    if (body.body.length === 0) {
        return false;
    }
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk135) {
            return root.walk_ast(body.body, kk135);
        }, new CpsContinuation())) : root.walk_ast(body.body);
    var l_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk136) {
            return root.generate_new_variable_name('l', exclude_ids, kk136);
        }, new CpsContinuation())) : root.generate_new_variable_name('l', exclude_ids);
    var k_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk137) {
            return root.generate_new_variable_name('k', exclude_ids, kk137);
        }, new CpsContinuation())) : root.generate_new_variable_name('k', exclude_ids);
    var t_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk138) {
            return root.generate_new_variable_name('t', exclude_ids, kk138);
        }, new CpsContinuation())) : root.generate_new_variable_name('t', exclude_ids);
    var a_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk139) {
            return root.generate_new_variable_name('a', exclude_ids, kk139);
        }, new CpsContinuation())) : root.generate_new_variable_name('a', exclude_ids);
    var using_this_var = root.replace_this_var_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk140) {
            return root.replace_this_var_with(body.body, t_varname, kk140);
        }, new CpsContinuation())) : root.replace_this_var_with(body.body, t_varname);
    var using_arguments = root.replace_arguments_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk141) {
            return root.replace_arguments_with(body.body, a_varname, kk141);
        }, new CpsContinuation())) : root.replace_arguments_with(body.body, a_varname);
    var header = root.ast_func_header.CpsEnabled ? CpsRun(new CpsFunction(function (kk142) {
            return root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids, kk142);
        }, new CpsContinuation())) : root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
    var newbody = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk143) {
            return root.deep_clone(body.body, kk143);
        }, new CpsContinuation())) : root.deep_clone(body.body);
    root.convert_function_call_to_new_cps_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk144) {
        return root.convert_function_call_to_new_cps_call(body.body, exclude_ids, kk144);
    }, new CpsContinuation())) : root.convert_function_call_to_new_cps_call(body.body, exclude_ids);
    var success = root.convert_normal_body_to_cps_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk145) {
            return root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody, kk145);
        }, new CpsContinuation())) : root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    if (success) {
        while (newbody.length > 0) {
            if (newbody[0].type === 'FunctionDeclaration') {
                newbody.shift.CpsEnabled ? CpsRun(new CpsFunction(function (kk146) {
                    return newbody.shift(kk146);
                }, new CpsContinuation())) : newbody.shift();
            } else {
                break;
            }
        }
        var wrapper = root.ast_func_wrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk147) {
                return root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params, kk147);
            }, new CpsContinuation())) : root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk148) {
            return assert.ok(wrapper[1].consequent.body.length >= 0, kk148);
        }, new CpsContinuation())) : assert.ok(wrapper[1].consequent.body.length >= 0);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk149) {
            return root.push(wrapper[1].consequent.body, newbody, kk149);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, newbody);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk150) {
            return root.push(wrapper[1].consequent.body, {
                type: 'ReturnStatement',
                argument: null
            }, kk150);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, {
            type: 'ReturnStatement',
            argument: null
        });
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk151) {
            return root.unshift(body.body, wrapper, kk151);
        }, new CpsContinuation())) : root.unshift(body.body, wrapper);
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk152) {
            return root.unshift(body.body, header, kk152);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    } else if (using_this_var || using_arguments) {
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk153) {
            return root.unshift(body.body, header, kk153);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    }
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk154) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff128 = function (cps_func_id) {
                var l121 = arguments.length - 1;
                var k122 = arguments[l121];
                if (k122 instanceof CpsContinuation) {
                    if (l121 >= 1) {
                    } else if (l121 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk127) {
                        return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk127) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k122);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk126) {
                    return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk126);
                }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff128.CpsEnabled = true;
            return ff128;
        }(), kk154);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff128 = function (cps_func_id) {
            var l121 = arguments.length - 1;
            var k122 = arguments[l121];
            if (k122 instanceof CpsContinuation) {
                if (l121 >= 1) {
                } else if (l121 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk127) {
                    return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk127) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                }, k122);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk126) {
                return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk126);
            }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff128.CpsEnabled = true;
        return ff128;
    }());
    return success;
};
root.convert_function_call_to_new_cps_call = function CpsEnableWrapper() {
    var ff195 = function (body, exclude_ids) {
        var l188 = arguments.length - 1;
        var k189 = arguments[l188];
        if (k189 instanceof CpsContinuation) {
            if (l188 >= 2) {
            } else if (l188 >= 1) {
                exclude_ids = undefined;
            } else if (l188 >= 0) {
                body = undefined;
            }
            var has_side_effect = function CpsEnableWrapper() {
                    var ff162 = function (node) {
                        var l155 = arguments.length - 1;
                        var k156 = arguments[l155];
                        if (k156 instanceof CpsContinuation) {
                            if (l155 >= 1) {
                            } else if (l155 >= 0) {
                                node = undefined;
                            }
                            if (!node) {
                                return new CpsResult(k156.k(false));
                            } else if (node.type === 'CallExpression') {
                                return new CpsResult(k156.k(true));
                            } else if (node.type === 'UpdateExpression') {
                                return new CpsResult(k156.k(true));
                            } else if (node.type === 'AssignmentExpression') {
                                return new CpsResult(k156.k(true));
                            } else if (node.type === 'NewExpression') {
                                return new CpsResult(k156.k(true));
                            } else if (node instanceof Object) {
                                return new CpsFunction(function (kk161) {
                                    return _.some.CpsEnabled ? _.some(node, has_side_effect, kk161) : _.some(node, has_side_effect);
                                }, k156);
                            } else {
                                return new CpsResult(k156.k(false));
                            }
                            return;
                        }
                        if (!node) {
                            return false;
                        } else if (node.type === 'CallExpression') {
                            return true;
                        } else if (node.type === 'UpdateExpression') {
                            return true;
                        } else if (node.type === 'AssignmentExpression') {
                            return true;
                        } else if (node.type === 'NewExpression') {
                            return true;
                        } else if (node instanceof Object) {
                            return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk160) {
                                return _.some(node, has_side_effect, kk160);
                            }, new CpsContinuation())) : _.some(node, has_side_effect);
                        } else {
                            return false;
                        }
                    };
                    ff162.CpsEnabled = true;
                    return ff162;
                }();
            var is_transformable_call = function CpsEnableWrapper() {
                    var ff169 = function (node) {
                        var l163 = arguments.length - 1;
                        var k164 = arguments[l163];
                        if (k164 instanceof CpsContinuation) {
                            if (l163 >= 1) {
                            } else if (l163 >= 0) {
                                node = undefined;
                            }
                            if (!node.callee) {
                                return new CpsResult(k164.k(false));
                            } else if (has_side_effect(node.callee)) {
                                return new CpsResult(k164.k(false));
                            } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                                return new CpsResult(k164.k(false));
                            } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                                return new CpsResult(k164.k(false));
                            } else {
                                return new CpsResult(k164.k(true));
                            }
                            return;
                        }
                        if (!node.callee) {
                            return false;
                        } else if (has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                                return has_side_effect(node.callee, kk168);
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
                    ff169.CpsEnabled = true;
                    return ff169;
                }();
            var walk = function (node) {
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk181) {
                        return is_transformable_call(node, kk181);
                    }, new CpsContinuation())) : is_transformable_call(node))) {
                    var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk182) {
                            return root.generate_new_variable_name('kk', exclude_ids, kk182);
                        }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                    var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk183) {
                            return root.deep_clone(node, kk183);
                        }, new CpsContinuation())) : root.deep_clone(node);
                    cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk184) {
                        return cpsnode.arguments.push({
                            type: 'Identifier',
                            name: kk_varname
                        }, kk184);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk185) {
                        return _.each(node, function CpsEnableWrapper() {
                            var ff175 = function (value, key) {
                                var l170 = arguments.length - 1;
                                var k171 = arguments[l170];
                                if (k171 instanceof CpsContinuation) {
                                    if (l170 >= 2) {
                                    } else if (l170 >= 1) {
                                        key = undefined;
                                    } else if (l170 >= 0) {
                                        value = undefined;
                                    }
                                    delete node[key];
                                    return;
                                }
                                delete node[key];
                            };
                            ff175.CpsEnabled = true;
                            return ff175;
                        }(), kk185);
                    }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                        var ff175 = function (value, key) {
                            var l170 = arguments.length - 1;
                            var k171 = arguments[l170];
                            if (k171 instanceof CpsContinuation) {
                                if (l170 >= 2) {
                                } else if (l170 >= 1) {
                                    key = undefined;
                                } else if (l170 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff175.CpsEnabled = true;
                        return ff175;
                    }());
                    _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk186) {
                        return _.extend(node, newnode, kk186);
                    }, new CpsContinuation())) : _.extend(node, newnode);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk187) {
                        return _.each(node, walk, kk187);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            return new CpsFunction(function (kk194) {
                return walk.CpsEnabled ? walk(body, kk194) : walk(body);
            }, k189);
            return;
        }
        var has_side_effect = function CpsEnableWrapper() {
                var ff162 = function (node) {
                    var l155 = arguments.length - 1;
                    var k156 = arguments[l155];
                    if (k156 instanceof CpsContinuation) {
                        if (l155 >= 1) {
                        } else if (l155 >= 0) {
                            node = undefined;
                        }
                        if (!node) {
                            return new CpsResult(k156.k(false));
                        } else if (node.type === 'CallExpression') {
                            return new CpsResult(k156.k(true));
                        } else if (node.type === 'UpdateExpression') {
                            return new CpsResult(k156.k(true));
                        } else if (node.type === 'AssignmentExpression') {
                            return new CpsResult(k156.k(true));
                        } else if (node.type === 'NewExpression') {
                            return new CpsResult(k156.k(true));
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk161) {
                                return _.some.CpsEnabled ? _.some(node, has_side_effect, kk161) : _.some(node, has_side_effect);
                            }, k156);
                        } else {
                            return new CpsResult(k156.k(false));
                        }
                        return;
                    }
                    if (!node) {
                        return false;
                    } else if (node.type === 'CallExpression') {
                        return true;
                    } else if (node.type === 'UpdateExpression') {
                        return true;
                    } else if (node.type === 'AssignmentExpression') {
                        return true;
                    } else if (node.type === 'NewExpression') {
                        return true;
                    } else if (node instanceof Object) {
                        return _.some.CpsEnabled ? CpsRun(new CpsFunction(function (kk160) {
                            return _.some(node, has_side_effect, kk160);
                        }, new CpsContinuation())) : _.some(node, has_side_effect);
                    } else {
                        return false;
                    }
                };
                ff162.CpsEnabled = true;
                return ff162;
            }();
        var is_transformable_call = function CpsEnableWrapper() {
                var ff169 = function (node) {
                    var l163 = arguments.length - 1;
                    var k164 = arguments[l163];
                    if (k164 instanceof CpsContinuation) {
                        if (l163 >= 1) {
                        } else if (l163 >= 0) {
                            node = undefined;
                        }
                        if (!node.callee) {
                            return new CpsResult(k164.k(false));
                        } else if (has_side_effect(node.callee)) {
                            return new CpsResult(k164.k(false));
                        } else if (node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper') {
                            return new CpsResult(k164.k(false));
                        } else if (node.callee.type === 'MembershipExpression' && node.callee.property.type === 'Identifier' && node.callee.property.name === 'apply') {
                            return new CpsResult(k164.k(false));
                        } else {
                            return new CpsResult(k164.k(true));
                        }
                        return;
                    }
                    if (!node.callee) {
                        return false;
                    } else if (has_side_effect.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                            return has_side_effect(node.callee, kk168);
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
                ff169.CpsEnabled = true;
                return ff169;
            }();
        var walk = function (node) {
            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                return;
            } else if (node && node.type === 'CallExpression' && (is_transformable_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk181) {
                    return is_transformable_call(node, kk181);
                }, new CpsContinuation())) : is_transformable_call(node))) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk182) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk182);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk183) {
                        return root.deep_clone(node, kk183);
                    }, new CpsContinuation())) : root.deep_clone(node);
                cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk184) {
                    return cpsnode.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk184);
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
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk185) {
                    return _.each(node, function CpsEnableWrapper() {
                        var ff175 = function (value, key) {
                            var l170 = arguments.length - 1;
                            var k171 = arguments[l170];
                            if (k171 instanceof CpsContinuation) {
                                if (l170 >= 2) {
                                } else if (l170 >= 1) {
                                    key = undefined;
                                } else if (l170 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff175.CpsEnabled = true;
                        return ff175;
                    }(), kk185);
                }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                    var ff175 = function (value, key) {
                        var l170 = arguments.length - 1;
                        var k171 = arguments[l170];
                        if (k171 instanceof CpsContinuation) {
                            if (l170 >= 2) {
                            } else if (l170 >= 1) {
                                key = undefined;
                            } else if (l170 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff175.CpsEnabled = true;
                    return ff175;
                }());
                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk186) {
                    return _.extend(node, newnode, kk186);
                }, new CpsContinuation())) : _.extend(node, newnode);
            } else if (node instanceof Object) {
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk187) {
                    return _.each(node, walk, kk187);
                }, new CpsContinuation())) : _.each(node, walk);
            }
        };
        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk193) {
            return walk(body, kk193);
        }, new CpsContinuation())) : walk(body);
    };
    ff195.CpsEnabled = true;
    return ff195;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff234 = function (k_varname, exclude_ids, body) {
        var l227 = arguments.length - 1;
        var k228 = arguments[l227];
        if (k228 instanceof CpsContinuation) {
            if (l227 >= 3) {
            } else if (l227 >= 2) {
                body = undefined;
            } else if (l227 >= 1) {
                exclude_ids = undefined;
            } else if (l227 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk201) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk201);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk202) {
                        return root.deep_clone(call_expression, kk202);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk203) {
                    return call_expression2.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk203);
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
                    if (node.argument && node.argument.type === 'CallExpression') {
                        node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                            return create_cps_expression(node.argument, kk217);
                        }, new CpsContinuation())) : create_cps_expression(node.argument);
                        return true;
                    } else {
                        var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk218) {
                                return walk(node.argument, kk218);
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
                    return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk219) {
                        return walk(node.consequent, tail, kk219);
                    }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk220) {
                        return walk(node.alternate, tail, kk220);
                    }, new CpsContinuation())) : walk(node.alternate, tail));
                } else if (tail && node && node.type === 'BlockStatement') {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk221) {
                        return walk(node.body, tail, kk221);
                    }, new CpsContinuation())) : walk(node.body, tail);
                } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk222) {
                        return Array.isArray(node, kk222);
                    }, new CpsContinuation())) : Array.isArray(node))) {
                    for (var i = 0; i < node.length - 1; i++) {
                        var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk223) {
                                return walk(node[i], kk223);
                            }, new CpsContinuation())) : walk(node[i]);
                        if (!result) {
                            return false;
                        }
                    }
                    var lastone = node[node.length - 1];
                    if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                        node[node.length - 1] = {
                            type: 'ReturnStatement',
                            argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk224) {
                                return create_cps_expression(lastone.expression, kk224);
                            }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                        };
                        return true;
                    } else {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk225) {
                            return walk(lastone, tail, kk225);
                        }, new CpsContinuation())) : walk(lastone, tail);
                    }
                } else if (node instanceof Object) {
                    return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk226) {
                        return _.every(node, function CpsEnableWrapper() {
                            var ff211 = function (x) {
                                var l204 = arguments.length - 1;
                                var k205 = arguments[l204];
                                if (k205 instanceof CpsContinuation) {
                                    if (l204 >= 1) {
                                    } else if (l204 >= 0) {
                                        x = undefined;
                                    }
                                    return new CpsFunction(function (kk210) {
                                        return walk.CpsEnabled ? walk(x, kk210) : walk(x);
                                    }, k205);
                                    return;
                                }
                                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                                    return walk(x, kk209);
                                }, new CpsContinuation())) : walk(x);
                            };
                            ff211.CpsEnabled = true;
                            return ff211;
                        }(), kk226);
                    }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                        var ff211 = function (x) {
                            var l204 = arguments.length - 1;
                            var k205 = arguments[l204];
                            if (k205 instanceof CpsContinuation) {
                                if (l204 >= 1) {
                                } else if (l204 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk210) {
                                    return walk.CpsEnabled ? walk(x, kk210) : walk(x);
                                }, k205);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                                return walk(x, kk209);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff211.CpsEnabled = true;
                        return ff211;
                    }());
                } else {
                    return true;
                }
            };
            return new CpsFunction(function (kk233) {
                return walk.CpsEnabled ? walk(body, true, kk233) : walk(body, true);
            }, k228);
            return;
        }
        var create_cps_expression = function (call_expression) {
            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk201) {
                    return root.generate_new_variable_name('kk', exclude_ids, kk201);
                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
            var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk202) {
                    return root.deep_clone(call_expression, kk202);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk203) {
                return call_expression2.arguments.push({
                    type: 'Identifier',
                    name: kk_varname
                }, kk203);
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
                if (node.argument && node.argument.type === 'CallExpression') {
                    node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                        return create_cps_expression(node.argument, kk217);
                    }, new CpsContinuation())) : create_cps_expression(node.argument);
                    return true;
                } else {
                    var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk218) {
                            return walk(node.argument, kk218);
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
                return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk219) {
                    return walk(node.consequent, tail, kk219);
                }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk220) {
                    return walk(node.alternate, tail, kk220);
                }, new CpsContinuation())) : walk(node.alternate, tail));
            } else if (tail && node && node.type === 'BlockStatement') {
                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk221) {
                    return walk(node.body, tail, kk221);
                }, new CpsContinuation())) : walk(node.body, tail);
            } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk222) {
                    return Array.isArray(node, kk222);
                }, new CpsContinuation())) : Array.isArray(node))) {
                for (var i = 0; i < node.length - 1; i++) {
                    var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk223) {
                            return walk(node[i], kk223);
                        }, new CpsContinuation())) : walk(node[i]);
                    if (!result) {
                        return false;
                    }
                }
                var lastone = node[node.length - 1];
                if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                    node[node.length - 1] = {
                        type: 'ReturnStatement',
                        argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk224) {
                            return create_cps_expression(lastone.expression, kk224);
                        }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                    };
                    return true;
                } else {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk225) {
                        return walk(lastone, tail, kk225);
                    }, new CpsContinuation())) : walk(lastone, tail);
                }
            } else if (node instanceof Object) {
                return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk226) {
                    return _.every(node, function CpsEnableWrapper() {
                        var ff211 = function (x) {
                            var l204 = arguments.length - 1;
                            var k205 = arguments[l204];
                            if (k205 instanceof CpsContinuation) {
                                if (l204 >= 1) {
                                } else if (l204 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk210) {
                                    return walk.CpsEnabled ? walk(x, kk210) : walk(x);
                                }, k205);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                                return walk(x, kk209);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff211.CpsEnabled = true;
                        return ff211;
                    }(), kk226);
                }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                    var ff211 = function (x) {
                        var l204 = arguments.length - 1;
                        var k205 = arguments[l204];
                        if (k205 instanceof CpsContinuation) {
                            if (l204 >= 1) {
                            } else if (l204 >= 0) {
                                x = undefined;
                            }
                            return new CpsFunction(function (kk210) {
                                return walk.CpsEnabled ? walk(x, kk210) : walk(x);
                            }, k205);
                            return;
                        }
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                            return walk(x, kk209);
                        }, new CpsContinuation())) : walk(x);
                    };
                    ff211.CpsEnabled = true;
                    return ff211;
                }());
            } else {
                return true;
            }
        };
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk232) {
            return walk(body, true, kk232);
        }, new CpsContinuation())) : walk(body, true);
    };
    ff234.CpsEnabled = true;
    return ff234;
}();
root.create_cpsenabled_statement = function CpsEnableWrapper() {
    var ff240 = function (cps_func_id) {
        var l235 = arguments.length - 1;
        var k236 = arguments[l235];
        if (k236 instanceof CpsContinuation) {
            if (l235 >= 1) {
            } else if (l235 >= 0) {
                cps_func_id = undefined;
            }
            return new CpsResult(k236.k({
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
    ff240.CpsEnabled = true;
    return ff240;
}();
root.walk_ast = function (node) {
    var exclude_ids;
    if (node && node.type === 'FunctionDeclaration') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk252) {
            return root.collect_all_identifiers(node.body, kk252);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk253) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk253);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk254) {
                return assert.equal(node.id.type, 'Identifier', kk254);
            }, new CpsContinuation())) : assert.equal(node.id.type, 'Identifier');
            return node.id.name;
        } else {
            return [];
        }
    } else if (node && node.type === 'FunctionExpression') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk255) {
            return root.collect_all_identifiers(node.body, kk255);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk256);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            var ff_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk257) {
                    return root.generate_new_variable_name('ff', exclude_ids, kk257);
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
                                root.create_cpsenabled_statement.CpsEnabled ? CpsRun(new CpsFunction(function (kk258) {
                                    return root.create_cpsenabled_statement(ff_varname, kk258);
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
            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk259) {
                return _.each(node, function CpsEnableWrapper() {
                    var ff246 = function (value, key) {
                        var l241 = arguments.length - 1;
                        var k242 = arguments[l241];
                        if (k242 instanceof CpsContinuation) {
                            if (l241 >= 2) {
                            } else if (l241 >= 1) {
                                key = undefined;
                            } else if (l241 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff246.CpsEnabled = true;
                    return ff246;
                }(), kk259);
            }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                var ff246 = function (value, key) {
                    var l241 = arguments.length - 1;
                    var k242 = arguments[l241];
                    if (k242 instanceof CpsContinuation) {
                        if (l241 >= 2) {
                        } else if (l241 >= 1) {
                            key = undefined;
                        } else if (l241 >= 0) {
                            value = undefined;
                        }
                        delete node[key];
                        return;
                    }
                    delete node[key];
                };
                ff246.CpsEnabled = true;
                return ff246;
            }());
            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk260) {
                return _.extend(node, newnode, kk260);
            }, new CpsContinuation())) : _.extend(node, newnode);
        }
        return [];
    } else if (node instanceof Object) {
        return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk261) {
            return _.map(node, root.walk_ast, kk261);
        }, new CpsContinuation())) : _.map(node, root.walk_ast);
    } else {
        return [];
    }
};
root.transform = function (ast) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk275) {
        return assert.equal(ast.type, 'Program', kk275);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk276) {
            return root.walk_ast(ast.body, kk276);
        }, new CpsContinuation())) : root.walk_ast(ast.body);
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk277) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff269 = function (cps_func_id) {
                var l262 = arguments.length - 1;
                var k263 = arguments[l262];
                if (k263 instanceof CpsContinuation) {
                    if (l262 >= 1) {
                    } else if (l262 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk268) {
                        return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk268) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k263);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk267) {
                    return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk267);
                }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff269.CpsEnabled = true;
            return ff269;
        }(), kk277);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff269 = function (cps_func_id) {
            var l262 = arguments.length - 1;
            var k263 = arguments[l262];
            if (k263 instanceof CpsContinuation) {
                if (l262 >= 1) {
                } else if (l262 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk268) {
                    return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk268) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                }, k263);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk267) {
                return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk267);
            }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff269.CpsEnabled = true;
        return ff269;
    }());
    root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk278) {
        return root.unshift(ast.body, root.ast_prog_header(), true, kk278);
    }, new CpsContinuation())) : root.unshift(ast.body, root.ast_prog_header(), true);
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff286 = function (ast) {
        var l279 = arguments.length - 1;
        var k280 = arguments[l279];
        if (k280 instanceof CpsContinuation) {
            if (l279 >= 1) {
            } else if (l279 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk285) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk285) : escodegen.generate(ast);
            }, k280);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk284) {
            return escodegen.generate(ast, kk284);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff286.CpsEnabled = true;
    return ff286;
}();
root.compile = function CpsEnableWrapper() {
    var ff294 = function (data) {
        var l287 = arguments.length - 1;
        var k288 = arguments[l287];
        if (k288 instanceof CpsContinuation) {
            if (l287 >= 1) {
            } else if (l287 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk293) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk293) : root.generate(root.transform(root.parse(data)));
            }, k288);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk292) {
            return root.generate(root.transform(root.parse(data)), kk292);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff294.CpsEnabled = true;
    return ff294;
}();
root.enable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk307) {
            return require('fs', kk307);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk300) {
                return fs.readFileSync(filename, 'utf8', kk300);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk301) {
            return module._compile(root.compile(data), filename, kk301);
        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
    };
};
root.disable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk320) {
            return require('fs', kk320);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk313) {
                return fs.readFileSync(filename, 'utf8', kk313);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk314) {
            return module._compile(data, filename, kk314);
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