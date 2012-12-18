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
    var ff7 = function (data) {
        var l1 = arguments.length - 1;
        var k2 = arguments[l1];
        if (k2 instanceof CpsContinuation) {
            if (l1 >= 1) {
            } else if (l1 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk6) {
                return esprima.parse.CpsEnabled ? esprima.parse(data, kk6) : esprima.parse(data);
            }, k2);
            return;
        }
        return esprima.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk5) {
            return esprima.parse(data, kk5);
        }, new CpsContinuation())) : esprima.parse(data);
    };
    ff7.CpsEnabled = true;
    return ff7;
}();
root.push = function (lst, itm) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk12) {
            return Array.isArray(itm, kk12);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        for (var i = 0; i < itm.length; i++) {
            lst.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk13) {
                return lst.push(itm[i], kk13);
            }, new CpsContinuation())) : lst.push(itm[i]);
        }
    } else {
        lst.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk14) {
            return lst.push(itm, kk14);
        }, new CpsContinuation())) : lst.push(itm);
    }
};
root.unshift = function (lst, itm) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk19) {
            return Array.isArray(itm, kk19);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        for (var i = itm.length - 1; i >= 0; i--) {
            lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk20) {
                return lst.unshift(itm[i], kk20);
            }, new CpsContinuation())) : lst.unshift(itm[i]);
        }
    } else {
        lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk21) {
            return lst.unshift(itm, kk21);
        }, new CpsContinuation())) : lst.unshift(itm);
    }
};
root.ast_prog_header = function () {
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk26) {
            return root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }', kk26);
        }, new CpsContinuation())) : root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk27) {
        return assert.equal(code.type, 'Program', kk27);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    return code.body;
};
root.new_variable_counter = 1;
root.generate_new_variable_name = function CpsEnableWrapper() {
    var ff35 = function (prefix, exclude_ids) {
        var l28 = arguments.length - 1;
        var k29 = arguments[l28];
        if (k29 instanceof CpsContinuation) {
            if (l28 >= 2) {
            } else if (l28 >= 1) {
                exclude_ids = undefined;
            } else if (l28 >= 0) {
                prefix = undefined;
            }
            var varname = prefix + root.new_variable_counter++;
            if (exclude_ids.indexOf(varname) >= 0) {
                return new CpsFunction(function (kk34) {
                    return root.generate_new_variable_name.CpsEnabled ? root.generate_new_variable_name(prefix, exclude_ids, kk34) : root.generate_new_variable_name(prefix, exclude_ids);
                }, k29);
            } else {
                return new CpsResult(k29.k(varname));
            }
            return;
        }
        var varname = prefix + root.new_variable_counter++;
        if ((exclude_ids.indexOf.CpsEnabled ? CpsRun(new CpsFunction(function (kk32) {
                return exclude_ids.indexOf(varname, kk32);
            }, new CpsContinuation())) : exclude_ids.indexOf(varname)) >= 0) {
            return root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk33) {
                return root.generate_new_variable_name(prefix, exclude_ids, kk33);
            }, new CpsContinuation())) : root.generate_new_variable_name(prefix, exclude_ids);
        } else {
            return varname;
        }
    };
    ff35.CpsEnabled = true;
    return ff35;
}();
root.ast_func_header = function (l_varname, a_varname, exclude_ids) {
    var i_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk40) {
            return root.generate_new_variable_name('i', exclude_ids, kk40);
        }, new CpsContinuation())) : root.generate_new_variable_name('i', exclude_ids);
    var argsCopy = '';
    if (a_varname) {
        argsCopy = 'var ' + a_varname + ' = {}; for(var ' + i_varname + ' = 0; ' + i_varname + ' <= ' + l_varname + '; ' + i_varname + '++) { ' + a_varname + '[' + i_varname + '] = arguments[' + i_varname + ']; }' + a_varname + '.length = 1 + ' + l_varname + ';' + a_varname + '.callee = arguments.callee;';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk41) {
            return root.parse('function ignore() { var ' + l_varname + ' = arguments.length - 1;' + argsCopy + '}', kk41);
        }, new CpsContinuation())) : root.parse('function ignore() { var ' + l_varname + ' = arguments.length - 1;' + argsCopy + '}');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk42) {
        return assert.equal(code.type, 'Program', kk42);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk43) {
        return assert.equal(code.body.length, 1, kk43);
    }, new CpsContinuation())) : assert.equal(code.body.length, 1);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk44) {
        return assert.equal(code.body[0].type, 'FunctionDeclaration', kk44);
    }, new CpsContinuation())) : assert.equal(code.body[0].type, 'FunctionDeclaration');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk45) {
        return assert.equal(code.body[0].body.type, 'BlockStatement', kk45);
    }, new CpsContinuation())) : assert.equal(code.body[0].body.type, 'BlockStatement');
    return code.body[0].body.body;
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
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk50) {
                return assert.equal(params[i].type, 'Identifier', kk50);
            }, new CpsContinuation())) : assert.equal(params[i].type, 'Identifier');
            fixParams += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
        }
        fixParams += '}';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk51) {
            return root.parse('function ignore() { var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}}', kk51);
        }, new CpsContinuation())) : root.parse('function ignore() { var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}}');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk52) {
        return assert.equal(code.type, 'Program', kk52);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk53) {
        return assert.equal(code.body.length, 1, kk53);
    }, new CpsContinuation())) : assert.equal(code.body.length, 1);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk54) {
        return assert.equal(code.body[0].type, 'FunctionDeclaration', kk54);
    }, new CpsContinuation())) : assert.equal(code.body[0].type, 'FunctionDeclaration');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk55) {
        return assert.equal(code.body[0].body.type, 'BlockStatement', kk55);
    }, new CpsContinuation())) : assert.equal(code.body[0].body.type, 'BlockStatement');
    return code.body[0].body.body;
};
root.collect_all_identifiers = function (node) {
    var ids = [];
    var walk = function CpsEnableWrapper() {
            var ff64 = function (node) {
                var l56 = arguments.length - 1;
                var k57 = arguments[l56];
                if (k57 instanceof CpsContinuation) {
                    if (l56 >= 1) {
                    } else if (l56 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k57.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk62) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk62) : ids.push(node.name);
                        }, k57);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk63) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk63) : _.each(node, walk);
                        }, k57);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk60) {
                        return ids.push(node.name, kk60);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk61) {
                        return _.each(node, walk, kk61);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff64.CpsEnabled = true;
            return ff64;
        }.CpsEnabled ? CpsRun(new CpsFunction(function (kk69) {
            return function CpsEnableWrapper() {
                var ff64 = function (node) {
                    var l56 = arguments.length - 1;
                    var k57 = arguments[l56];
                    if (k57 instanceof CpsContinuation) {
                        if (l56 >= 1) {
                        } else if (l56 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k57.k(null));
                        } else if (node && node.type === 'Identifier') {
                            return new CpsFunction(function (kk62) {
                                return ids.push.CpsEnabled ? ids.push(node.name, kk62) : ids.push(node.name);
                            }, k57);
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk63) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk63) : _.each(node, walk);
                            }, k57);
                        }
                        return;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return;
                    } else if (node && node.type === 'Identifier') {
                        ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk60) {
                            return ids.push(node.name, kk60);
                        }, new CpsContinuation())) : ids.push(node.name);
                    } else if (node instanceof Object) {
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk61) {
                            return _.each(node, walk, kk61);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff64.CpsEnabled = true;
                return ff64;
            }(kk69);
        }, new CpsContinuation())) : function CpsEnableWrapper() {
            var ff64 = function (node) {
                var l56 = arguments.length - 1;
                var k57 = arguments[l56];
                if (k57 instanceof CpsContinuation) {
                    if (l56 >= 1) {
                    } else if (l56 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k57.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk62) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk62) : ids.push(node.name);
                        }, k57);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk63) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk63) : _.each(node, walk);
                        }, k57);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk60) {
                        return ids.push(node.name, kk60);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk61) {
                        return _.each(node, walk, kk61);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff64.CpsEnabled = true;
            return ff64;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk70) {
        return walk(node, kk70);
    }, new CpsContinuation())) : walk(node);
    return ids;
};
root.replace_arguments_with = function (body, a_varname) {
    var using_arguments = false;
    var walk = function CpsEnableWrapper() {
            var ff79 = function (node) {
                var l71 = arguments.length - 1;
                var k72 = arguments[l71];
                if (k72 instanceof CpsContinuation) {
                    if (l71 >= 1) {
                    } else if (l71 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k72.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k72.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk77) {
                            return walk.CpsEnabled ? walk(node.object, kk77) : walk(node.object);
                        }, k72);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk78) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk78) : _.each(node, walk);
                        }, k72);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk75) {
                        return walk(node.object, kk75);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk76) {
                        return _.each(node, walk, kk76);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff79.CpsEnabled = true;
            return ff79;
        }.CpsEnabled ? CpsRun(new CpsFunction(function (kk84) {
            return function CpsEnableWrapper() {
                var ff79 = function (node) {
                    var l71 = arguments.length - 1;
                    var k72 = arguments[l71];
                    if (k72 instanceof CpsContinuation) {
                        if (l71 >= 1) {
                        } else if (l71 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k72.k(null));
                        } else if (node && node.type === 'Property') {
                            return new CpsResult(k72.k(null));
                        } else if (node && node.type === 'MemberExpression') {
                            return new CpsFunction(function (kk77) {
                                return walk.CpsEnabled ? walk(node.object, kk77) : walk(node.object);
                            }, k72);
                        } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                            node.name = a_varname;
                            using_arguments = true;
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk78) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk78) : _.each(node, walk);
                            }, k72);
                        }
                        return;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return;
                    } else if (node && node.type === 'Property') {
                        return;
                    } else if (node && node.type === 'MemberExpression') {
                        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk75) {
                            return walk(node.object, kk75);
                        }, new CpsContinuation())) : walk(node.object);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk76) {
                            return _.each(node, walk, kk76);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff79.CpsEnabled = true;
                return ff79;
            }(kk84);
        }, new CpsContinuation())) : function CpsEnableWrapper() {
            var ff79 = function (node) {
                var l71 = arguments.length - 1;
                var k72 = arguments[l71];
                if (k72 instanceof CpsContinuation) {
                    if (l71 >= 1) {
                    } else if (l71 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k72.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k72.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk77) {
                            return walk.CpsEnabled ? walk(node.object, kk77) : walk(node.object);
                        }, k72);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk78) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk78) : _.each(node, walk);
                        }, k72);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk75) {
                        return walk(node.object, kk75);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk76) {
                        return _.each(node, walk, kk76);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff79.CpsEnabled = true;
            return ff79;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk85) {
        return walk(body, kk85);
    }, new CpsContinuation())) : walk(body);
    return using_arguments;
};
root.deep_clone = function CpsEnableWrapper() {
    var ff92 = function (node) {
        var l86 = arguments.length - 1;
        var k87 = arguments[l86];
        if (k87 instanceof CpsContinuation) {
            if (l86 >= 1) {
            } else if (l86 >= 0) {
                node = undefined;
            }
            return new CpsFunction(function (kk91) {
                return JSON.parse.CpsEnabled ? JSON.parse(JSON.stringify(node), kk91) : JSON.parse(JSON.stringify(node));
            }, k87);
            return;
        }
        return JSON.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk90) {
            return JSON.parse(JSON.stringify(node), kk90);
        }, new CpsContinuation())) : JSON.parse(JSON.stringify(node));
    };
    ff92.CpsEnabled = true;
    return ff92;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk104) {
        return assert.equal(body.type, 'BlockStatement', kk104);
    }, new CpsContinuation())) : assert.equal(body.type, 'BlockStatement');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk105) {
            return root.walk_ast(body.body, kk105);
        }, new CpsContinuation())) : root.walk_ast(body.body);
    var l_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk106) {
            return root.generate_new_variable_name('l', exclude_ids, kk106);
        }, new CpsContinuation())) : root.generate_new_variable_name('l', exclude_ids);
    var k_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk107) {
            return root.generate_new_variable_name('k', exclude_ids, kk107);
        }, new CpsContinuation())) : root.generate_new_variable_name('k', exclude_ids);
    var a_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk108) {
            return root.generate_new_variable_name('a', exclude_ids, kk108);
        }, new CpsContinuation())) : root.generate_new_variable_name('a', exclude_ids);
    var using_arguments = root.replace_arguments_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk109) {
            return root.replace_arguments_with(body.body, a_varname, kk109);
        }, new CpsContinuation())) : root.replace_arguments_with(body.body, a_varname);
    var header = root.ast_func_header.CpsEnabled ? CpsRun(new CpsFunction(function (kk110) {
            return root.ast_func_header(l_varname, using_arguments && a_varname, exclude_ids, kk110);
        }, new CpsContinuation())) : root.ast_func_header(l_varname, using_arguments && a_varname, exclude_ids);
    var newbody = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk111) {
            return root.deep_clone(body.body, kk111);
        }, new CpsContinuation())) : root.deep_clone(body.body);
    root.convert_function_call_to_new_cps_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk112) {
        return root.convert_function_call_to_new_cps_call(exclude_ids, body.body, kk112);
    }, new CpsContinuation())) : root.convert_function_call_to_new_cps_call(exclude_ids, body.body);
    var success = root.convert_normal_body_to_cps_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk113) {
            return root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody, kk113);
        }, new CpsContinuation())) : root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    if (success) {
        var wrapper = root.ast_func_wrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk114) {
                return root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params, kk114);
            }, new CpsContinuation())) : root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk115) {
            return assert.ok(wrapper[1].consequent.body.length >= 0, kk115);
        }, new CpsContinuation())) : assert.ok(wrapper[1].consequent.body.length >= 0);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk116) {
            return root.push(wrapper[1].consequent.body, newbody, kk116);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, newbody);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
            return root.push(wrapper[1].consequent.body, {
                type: 'ReturnStatement',
                argument: null
            }, kk117);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, {
            type: 'ReturnStatement',
            argument: null
        });
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk118) {
            return root.unshift(body.body, wrapper, kk118);
        }, new CpsContinuation())) : root.unshift(body.body, wrapper);
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk119) {
            return root.unshift(body.body, header, kk119);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    } else if (using_arguments) {
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk120) {
            return root.unshift(body.body, header, kk120);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    }
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk121) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff99 = function (cps_func_id) {
                var l93 = arguments.length - 1;
                var k94 = arguments[l93];
                if (k94 instanceof CpsContinuation) {
                    if (l93 >= 1) {
                    } else if (l93 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk98) {
                        return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk98) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k94);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk97) {
                    return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk97);
                }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff99.CpsEnabled = true;
            return ff99;
        }(), kk121);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff99 = function (cps_func_id) {
            var l93 = arguments.length - 1;
            var k94 = arguments[l93];
            if (k94 instanceof CpsContinuation) {
                if (l93 >= 1) {
                } else if (l93 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk98) {
                    return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk98) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                }, k94);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk97) {
                return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk97);
            }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff99.CpsEnabled = true;
        return ff99;
    }());
    return success;
};
root.convert_function_call_to_new_cps_call = function CpsEnableWrapper() {
    var ff143 = function (exclude_ids, body) {
        var l137 = arguments.length - 1;
        var k138 = arguments[l137];
        if (k138 instanceof CpsContinuation) {
            if (l137 >= 2) {
            } else if (l137 >= 1) {
                body = undefined;
            } else if (l137 >= 0) {
                exclude_ids = undefined;
            }
            var walk = function (node) {
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'CallExpression' && node.callee && !(node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper')) {
                    var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk131) {
                            return root.generate_new_variable_name('kk', exclude_ids, kk131);
                        }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                    var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk132) {
                            return root.deep_clone(node, kk132);
                        }, new CpsContinuation())) : root.deep_clone(node);
                    cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk133) {
                        return cpsnode.arguments.push({
                            type: 'Identifier',
                            name: kk_varname
                        }, kk133);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
                        return _.each(node, function CpsEnableWrapper() {
                            var ff126 = function (value, key) {
                                var l122 = arguments.length - 1;
                                var k123 = arguments[l122];
                                if (k123 instanceof CpsContinuation) {
                                    if (l122 >= 2) {
                                    } else if (l122 >= 1) {
                                        key = undefined;
                                    } else if (l122 >= 0) {
                                        value = undefined;
                                    }
                                    delete node[key];
                                    return;
                                }
                                delete node[key];
                            };
                            ff126.CpsEnabled = true;
                            return ff126;
                        }(), kk134);
                    }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                        var ff126 = function (value, key) {
                            var l122 = arguments.length - 1;
                            var k123 = arguments[l122];
                            if (k123 instanceof CpsContinuation) {
                                if (l122 >= 2) {
                                } else if (l122 >= 1) {
                                    key = undefined;
                                } else if (l122 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff126.CpsEnabled = true;
                        return ff126;
                    }());
                    _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk135) {
                        return _.extend(node, newnode, kk135);
                    }, new CpsContinuation())) : _.extend(node, newnode);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk136) {
                        return _.each(node, walk, kk136);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            return new CpsFunction(function (kk142) {
                return walk.CpsEnabled ? walk(body, kk142) : walk(body);
            }, k138);
            return;
        }
        var walk = function (node) {
            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                return;
            } else if (node && node.type === 'CallExpression' && node.callee && !(node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper')) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk131) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk131);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk132) {
                        return root.deep_clone(node, kk132);
                    }, new CpsContinuation())) : root.deep_clone(node);
                cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk133) {
                    return cpsnode.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk133);
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
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
                    return _.each(node, function CpsEnableWrapper() {
                        var ff126 = function (value, key) {
                            var l122 = arguments.length - 1;
                            var k123 = arguments[l122];
                            if (k123 instanceof CpsContinuation) {
                                if (l122 >= 2) {
                                } else if (l122 >= 1) {
                                    key = undefined;
                                } else if (l122 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff126.CpsEnabled = true;
                        return ff126;
                    }(), kk134);
                }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                    var ff126 = function (value, key) {
                        var l122 = arguments.length - 1;
                        var k123 = arguments[l122];
                        if (k123 instanceof CpsContinuation) {
                            if (l122 >= 2) {
                            } else if (l122 >= 1) {
                                key = undefined;
                            } else if (l122 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff126.CpsEnabled = true;
                    return ff126;
                }());
                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk135) {
                    return _.extend(node, newnode, kk135);
                }, new CpsContinuation())) : _.extend(node, newnode);
            } else if (node instanceof Object) {
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk136) {
                    return _.each(node, walk, kk136);
                }, new CpsContinuation())) : _.each(node, walk);
            }
        };
        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk141) {
            return walk(body, kk141);
        }, new CpsContinuation())) : walk(body);
    };
    ff143.CpsEnabled = true;
    return ff143;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff178 = function (k_varname, exclude_ids, body) {
        var l172 = arguments.length - 1;
        var k173 = arguments[l172];
        if (k173 instanceof CpsContinuation) {
            if (l172 >= 3) {
            } else if (l172 >= 2) {
                body = undefined;
            } else if (l172 >= 1) {
                exclude_ids = undefined;
            } else if (l172 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk148) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk148);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk149) {
                        return root.deep_clone(call_expression, kk149);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk150) {
                    return call_expression2.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk150);
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
                        node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                            return create_cps_expression(node.argument, kk162);
                        }, new CpsContinuation())) : create_cps_expression(node.argument);
                        return true;
                    } else {
                        var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                                return walk(node.argument, kk163);
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
                    return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                        return walk(node.consequent, tail, kk164);
                    }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                        return walk(node.alternate, tail, kk165);
                    }, new CpsContinuation())) : walk(node.alternate, tail));
                } else if (tail && node && node.type === 'BlockStatement') {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                        return walk(node.body, tail, kk166);
                    }, new CpsContinuation())) : walk(node.body, tail);
                } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                        return Array.isArray(node, kk167);
                    }, new CpsContinuation())) : Array.isArray(node))) {
                    for (var i = 0; i < node.length - 1; i++) {
                        var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                                return walk(node[i], kk168);
                            }, new CpsContinuation())) : walk(node[i]);
                        if (!result) {
                            return false;
                        }
                    }
                    var lastone = node[node.length - 1];
                    if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                        node[node.length - 1] = {
                            type: 'ReturnStatement',
                            argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk169) {
                                return create_cps_expression(lastone.expression, kk169);
                            }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                        };
                        return true;
                    } else {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk170) {
                            return walk(lastone, tail, kk170);
                        }, new CpsContinuation())) : walk(lastone, tail);
                    }
                } else if (node instanceof Object) {
                    return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk171) {
                        return _.every(node, function CpsEnableWrapper() {
                            var ff157 = function (x) {
                                var l151 = arguments.length - 1;
                                var k152 = arguments[l151];
                                if (k152 instanceof CpsContinuation) {
                                    if (l151 >= 1) {
                                    } else if (l151 >= 0) {
                                        x = undefined;
                                    }
                                    return new CpsFunction(function (kk156) {
                                        return walk.CpsEnabled ? walk(x, kk156) : walk(x);
                                    }, k152);
                                    return;
                                }
                                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk155) {
                                    return walk(x, kk155);
                                }, new CpsContinuation())) : walk(x);
                            };
                            ff157.CpsEnabled = true;
                            return ff157;
                        }(), kk171);
                    }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                        var ff157 = function (x) {
                            var l151 = arguments.length - 1;
                            var k152 = arguments[l151];
                            if (k152 instanceof CpsContinuation) {
                                if (l151 >= 1) {
                                } else if (l151 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk156) {
                                    return walk.CpsEnabled ? walk(x, kk156) : walk(x);
                                }, k152);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk155) {
                                return walk(x, kk155);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff157.CpsEnabled = true;
                        return ff157;
                    }());
                } else {
                    return true;
                }
            };
            return new CpsFunction(function (kk177) {
                return walk.CpsEnabled ? walk(body, true, kk177) : walk(body, true);
            }, k173);
            return;
        }
        var create_cps_expression = function (call_expression) {
            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk148) {
                    return root.generate_new_variable_name('kk', exclude_ids, kk148);
                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
            var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk149) {
                    return root.deep_clone(call_expression, kk149);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk150) {
                return call_expression2.arguments.push({
                    type: 'Identifier',
                    name: kk_varname
                }, kk150);
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
                    node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk162) {
                        return create_cps_expression(node.argument, kk162);
                    }, new CpsContinuation())) : create_cps_expression(node.argument);
                    return true;
                } else {
                    var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk163) {
                            return walk(node.argument, kk163);
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
                return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk164) {
                    return walk(node.consequent, tail, kk164);
                }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk165) {
                    return walk(node.alternate, tail, kk165);
                }, new CpsContinuation())) : walk(node.alternate, tail));
            } else if (tail && node && node.type === 'BlockStatement') {
                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk166) {
                    return walk(node.body, tail, kk166);
                }, new CpsContinuation())) : walk(node.body, tail);
            } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk167) {
                    return Array.isArray(node, kk167);
                }, new CpsContinuation())) : Array.isArray(node))) {
                for (var i = 0; i < node.length - 1; i++) {
                    var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk168) {
                            return walk(node[i], kk168);
                        }, new CpsContinuation())) : walk(node[i]);
                    if (!result) {
                        return false;
                    }
                }
                var lastone = node[node.length - 1];
                if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                    node[node.length - 1] = {
                        type: 'ReturnStatement',
                        argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk169) {
                            return create_cps_expression(lastone.expression, kk169);
                        }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                    };
                    return true;
                } else {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk170) {
                        return walk(lastone, tail, kk170);
                    }, new CpsContinuation())) : walk(lastone, tail);
                }
            } else if (node instanceof Object) {
                return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk171) {
                    return _.every(node, function CpsEnableWrapper() {
                        var ff157 = function (x) {
                            var l151 = arguments.length - 1;
                            var k152 = arguments[l151];
                            if (k152 instanceof CpsContinuation) {
                                if (l151 >= 1) {
                                } else if (l151 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk156) {
                                    return walk.CpsEnabled ? walk(x, kk156) : walk(x);
                                }, k152);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk155) {
                                return walk(x, kk155);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff157.CpsEnabled = true;
                        return ff157;
                    }(), kk171);
                }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                    var ff157 = function (x) {
                        var l151 = arguments.length - 1;
                        var k152 = arguments[l151];
                        if (k152 instanceof CpsContinuation) {
                            if (l151 >= 1) {
                            } else if (l151 >= 0) {
                                x = undefined;
                            }
                            return new CpsFunction(function (kk156) {
                                return walk.CpsEnabled ? walk(x, kk156) : walk(x);
                            }, k152);
                            return;
                        }
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk155) {
                            return walk(x, kk155);
                        }, new CpsContinuation())) : walk(x);
                    };
                    ff157.CpsEnabled = true;
                    return ff157;
                }());
            } else {
                return true;
            }
        };
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk176) {
            return walk(body, true, kk176);
        }, new CpsContinuation())) : walk(body, true);
    };
    ff178.CpsEnabled = true;
    return ff178;
}();
root.create_cpsenabled_statement = function CpsEnableWrapper() {
    var ff183 = function (cps_func_id) {
        var l179 = arguments.length - 1;
        var k180 = arguments[l179];
        if (k180 instanceof CpsContinuation) {
            if (l179 >= 1) {
            } else if (l179 >= 0) {
                cps_func_id = undefined;
            }
            return new CpsResult(k180.k({
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
    ff183.CpsEnabled = true;
    return ff183;
}();
root.walk_ast = function (node) {
    var exclude_ids;
    if (node && node.type === 'FunctionDeclaration') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk193) {
            return root.collect_all_identifiers(node.body, kk193);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk194) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk194);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk195) {
                return assert.equal(node.id.type, 'Identifier', kk195);
            }, new CpsContinuation())) : assert.equal(node.id.type, 'Identifier');
            return node.id.name;
        } else {
            return [];
        }
    } else if (node && node.type === 'FunctionExpression') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk196) {
            return root.collect_all_identifiers(node.body, kk196);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk197) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk197);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            var ff_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk198) {
                    return root.generate_new_variable_name('ff', exclude_ids, kk198);
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
                                root.create_cpsenabled_statement.CpsEnabled ? CpsRun(new CpsFunction(function (kk199) {
                                    return root.create_cpsenabled_statement(ff_varname, kk199);
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
            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk200) {
                return _.each(node, function CpsEnableWrapper() {
                    var ff188 = function (value, key) {
                        var l184 = arguments.length - 1;
                        var k185 = arguments[l184];
                        if (k185 instanceof CpsContinuation) {
                            if (l184 >= 2) {
                            } else if (l184 >= 1) {
                                key = undefined;
                            } else if (l184 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff188.CpsEnabled = true;
                    return ff188;
                }(), kk200);
            }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                var ff188 = function (value, key) {
                    var l184 = arguments.length - 1;
                    var k185 = arguments[l184];
                    if (k185 instanceof CpsContinuation) {
                        if (l184 >= 2) {
                        } else if (l184 >= 1) {
                            key = undefined;
                        } else if (l184 >= 0) {
                            value = undefined;
                        }
                        delete node[key];
                        return;
                    }
                    delete node[key];
                };
                ff188.CpsEnabled = true;
                return ff188;
            }());
            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk201) {
                return _.extend(node, newnode, kk201);
            }, new CpsContinuation())) : _.extend(node, newnode);
        }
        return [];
    } else if (node instanceof Object) {
        return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk202) {
            return _.map(node, root.walk_ast, kk202);
        }, new CpsContinuation())) : _.map(node, root.walk_ast);
    } else {
        return [];
    }
};
root.transform = function (ast) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk214) {
        return assert.equal(ast.type, 'Program', kk214);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk215) {
            return root.walk_ast(ast.body, kk215);
        }, new CpsContinuation())) : root.walk_ast(ast.body);
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk216) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff209 = function (cps_func_id) {
                var l203 = arguments.length - 1;
                var k204 = arguments[l203];
                if (k204 instanceof CpsContinuation) {
                    if (l203 >= 1) {
                    } else if (l203 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk208) {
                        return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk208) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k204);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                    return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk207);
                }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff209.CpsEnabled = true;
            return ff209;
        }(), kk216);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff209 = function (cps_func_id) {
            var l203 = arguments.length - 1;
            var k204 = arguments[l203];
            if (k204 instanceof CpsContinuation) {
                if (l203 >= 1) {
                } else if (l203 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk208) {
                    return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk208) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                }, k204);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk207) {
                return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk207);
            }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff209.CpsEnabled = true;
        return ff209;
    }());
    root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
        return root.unshift(ast.body, root.ast_prog_header(), kk217);
    }, new CpsContinuation())) : root.unshift(ast.body, root.ast_prog_header());
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff224 = function (ast) {
        var l218 = arguments.length - 1;
        var k219 = arguments[l218];
        if (k219 instanceof CpsContinuation) {
            if (l218 >= 1) {
            } else if (l218 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk223) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk223) : escodegen.generate(ast);
            }, k219);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk222) {
            return escodegen.generate(ast, kk222);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff224.CpsEnabled = true;
    return ff224;
}();
root.compile = function CpsEnableWrapper() {
    var ff231 = function (data) {
        var l225 = arguments.length - 1;
        var k226 = arguments[l225];
        if (k226 instanceof CpsContinuation) {
            if (l225 >= 1) {
            } else if (l225 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk230) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk230) : root.generate(root.transform(root.parse(data)));
            }, k226);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk229) {
            return root.generate(root.transform(root.parse(data)), kk229);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff231.CpsEnabled = true;
    return ff231;
}();
root.enable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk250) {
            return require('fs', kk250);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function CpsEnableWrapper() {
        var ff245 = function (module, filename) {
            var l239 = arguments.length - 1;
            var k240 = arguments[l239];
            if (k240 instanceof CpsContinuation) {
                if (l239 >= 2) {
                } else if (l239 >= 1) {
                    filename = undefined;
                } else if (l239 >= 0) {
                    module = undefined;
                }
                return new CpsFunction(function (kk244) {
                    return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff238 = function (err, data) {
                            var l232 = arguments.length - 1;
                            var k233 = arguments[l232];
                            if (k233 instanceof CpsContinuation) {
                                if (l232 >= 2) {
                                } else if (l232 >= 1) {
                                    data = undefined;
                                } else if (l232 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk237) {
                                    return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                }, k233);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return module._compile(root.compile(data), filename, kk236);
                            }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                        };
                        ff238.CpsEnabled = true;
                        return ff238;
                    }(), kk244) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff238 = function (err, data) {
                            var l232 = arguments.length - 1;
                            var k233 = arguments[l232];
                            if (k233 instanceof CpsContinuation) {
                                if (l232 >= 2) {
                                } else if (l232 >= 1) {
                                    data = undefined;
                                } else if (l232 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk237) {
                                    return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                }, k233);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return module._compile(root.compile(data), filename, kk236);
                            }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                        };
                        ff238.CpsEnabled = true;
                        return ff238;
                    }());
                }, k240);
                return;
            }
            fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk243) {
                return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff238 = function (err, data) {
                        var l232 = arguments.length - 1;
                        var k233 = arguments[l232];
                        if (k233 instanceof CpsContinuation) {
                            if (l232 >= 2) {
                            } else if (l232 >= 1) {
                                data = undefined;
                            } else if (l232 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk237) {
                                return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                            }, k233);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                            return module._compile(root.compile(data), filename, kk236);
                        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                    };
                    ff238.CpsEnabled = true;
                    return ff238;
                }(), kk243);
            }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                var ff238 = function (err, data) {
                    var l232 = arguments.length - 1;
                    var k233 = arguments[l232];
                    if (k233 instanceof CpsContinuation) {
                        if (l232 >= 2) {
                        } else if (l232 >= 1) {
                            data = undefined;
                        } else if (l232 >= 0) {
                            err = undefined;
                        }
                        if (err)
                            throw err;
                        return new CpsFunction(function (kk237) {
                            return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                        }, k233);
                        return;
                    }
                    if (err)
                        throw err;
                    module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                        return module._compile(root.compile(data), filename, kk236);
                    }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                };
                ff238.CpsEnabled = true;
                return ff238;
            }());
        };
        ff245.CpsEnabled = true;
        return ff245;
    }.CpsEnabled ? CpsRun(new CpsFunction(function (kk251) {
        return function CpsEnableWrapper() {
            var ff245 = function (module, filename) {
                var l239 = arguments.length - 1;
                var k240 = arguments[l239];
                if (k240 instanceof CpsContinuation) {
                    if (l239 >= 2) {
                    } else if (l239 >= 1) {
                        filename = undefined;
                    } else if (l239 >= 0) {
                        module = undefined;
                    }
                    return new CpsFunction(function (kk244) {
                        return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                            var ff238 = function (err, data) {
                                var l232 = arguments.length - 1;
                                var k233 = arguments[l232];
                                if (k233 instanceof CpsContinuation) {
                                    if (l232 >= 2) {
                                    } else if (l232 >= 1) {
                                        data = undefined;
                                    } else if (l232 >= 0) {
                                        err = undefined;
                                    }
                                    if (err)
                                        throw err;
                                    return new CpsFunction(function (kk237) {
                                        return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                    }, k233);
                                    return;
                                }
                                if (err)
                                    throw err;
                                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                    return module._compile(root.compile(data), filename, kk236);
                                }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                            };
                            ff238.CpsEnabled = true;
                            return ff238;
                        }(), kk244) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                            var ff238 = function (err, data) {
                                var l232 = arguments.length - 1;
                                var k233 = arguments[l232];
                                if (k233 instanceof CpsContinuation) {
                                    if (l232 >= 2) {
                                    } else if (l232 >= 1) {
                                        data = undefined;
                                    } else if (l232 >= 0) {
                                        err = undefined;
                                    }
                                    if (err)
                                        throw err;
                                    return new CpsFunction(function (kk237) {
                                        return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                    }, k233);
                                    return;
                                }
                                if (err)
                                    throw err;
                                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                    return module._compile(root.compile(data), filename, kk236);
                                }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                            };
                            ff238.CpsEnabled = true;
                            return ff238;
                        }());
                    }, k240);
                    return;
                }
                fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk243) {
                    return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff238 = function (err, data) {
                            var l232 = arguments.length - 1;
                            var k233 = arguments[l232];
                            if (k233 instanceof CpsContinuation) {
                                if (l232 >= 2) {
                                } else if (l232 >= 1) {
                                    data = undefined;
                                } else if (l232 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk237) {
                                    return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                }, k233);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return module._compile(root.compile(data), filename, kk236);
                            }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                        };
                        ff238.CpsEnabled = true;
                        return ff238;
                    }(), kk243);
                }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff238 = function (err, data) {
                        var l232 = arguments.length - 1;
                        var k233 = arguments[l232];
                        if (k233 instanceof CpsContinuation) {
                            if (l232 >= 2) {
                            } else if (l232 >= 1) {
                                data = undefined;
                            } else if (l232 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk237) {
                                return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                            }, k233);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                            return module._compile(root.compile(data), filename, kk236);
                        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                    };
                    ff238.CpsEnabled = true;
                    return ff238;
                }());
            };
            ff245.CpsEnabled = true;
            return ff245;
        }(kk251);
    }, new CpsContinuation())) : function CpsEnableWrapper() {
        var ff245 = function (module, filename) {
            var l239 = arguments.length - 1;
            var k240 = arguments[l239];
            if (k240 instanceof CpsContinuation) {
                if (l239 >= 2) {
                } else if (l239 >= 1) {
                    filename = undefined;
                } else if (l239 >= 0) {
                    module = undefined;
                }
                return new CpsFunction(function (kk244) {
                    return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff238 = function (err, data) {
                            var l232 = arguments.length - 1;
                            var k233 = arguments[l232];
                            if (k233 instanceof CpsContinuation) {
                                if (l232 >= 2) {
                                } else if (l232 >= 1) {
                                    data = undefined;
                                } else if (l232 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk237) {
                                    return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                }, k233);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return module._compile(root.compile(data), filename, kk236);
                            }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                        };
                        ff238.CpsEnabled = true;
                        return ff238;
                    }(), kk244) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff238 = function (err, data) {
                            var l232 = arguments.length - 1;
                            var k233 = arguments[l232];
                            if (k233 instanceof CpsContinuation) {
                                if (l232 >= 2) {
                                } else if (l232 >= 1) {
                                    data = undefined;
                                } else if (l232 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk237) {
                                    return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                                }, k233);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                                return module._compile(root.compile(data), filename, kk236);
                            }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                        };
                        ff238.CpsEnabled = true;
                        return ff238;
                    }());
                }, k240);
                return;
            }
            fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk243) {
                return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff238 = function (err, data) {
                        var l232 = arguments.length - 1;
                        var k233 = arguments[l232];
                        if (k233 instanceof CpsContinuation) {
                            if (l232 >= 2) {
                            } else if (l232 >= 1) {
                                data = undefined;
                            } else if (l232 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk237) {
                                return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                            }, k233);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                            return module._compile(root.compile(data), filename, kk236);
                        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                    };
                    ff238.CpsEnabled = true;
                    return ff238;
                }(), kk243);
            }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                var ff238 = function (err, data) {
                    var l232 = arguments.length - 1;
                    var k233 = arguments[l232];
                    if (k233 instanceof CpsContinuation) {
                        if (l232 >= 2) {
                        } else if (l232 >= 1) {
                            data = undefined;
                        } else if (l232 >= 0) {
                            err = undefined;
                        }
                        if (err)
                            throw err;
                        return new CpsFunction(function (kk237) {
                            return module._compile.CpsEnabled ? module._compile(root.compile(data), filename, kk237) : module._compile(root.compile(data), filename);
                        }, k233);
                        return;
                    }
                    if (err)
                        throw err;
                    module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk236) {
                        return module._compile(root.compile(data), filename, kk236);
                    }, new CpsContinuation())) : module._compile(root.compile(data), filename);
                };
                ff238.CpsEnabled = true;
                return ff238;
            }());
        };
        ff245.CpsEnabled = true;
        return ff245;
    }();
};
root.disable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk270) {
            return require('fs', kk270);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function CpsEnableWrapper() {
        var ff265 = function (module, filename) {
            var l259 = arguments.length - 1;
            var k260 = arguments[l259];
            if (k260 instanceof CpsContinuation) {
                if (l259 >= 2) {
                } else if (l259 >= 1) {
                    filename = undefined;
                } else if (l259 >= 0) {
                    module = undefined;
                }
                return new CpsFunction(function (kk264) {
                    return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff258 = function (err, data) {
                            var l252 = arguments.length - 1;
                            var k253 = arguments[l252];
                            if (k253 instanceof CpsContinuation) {
                                if (l252 >= 2) {
                                } else if (l252 >= 1) {
                                    data = undefined;
                                } else if (l252 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk257) {
                                    return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                }, k253);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                return module._compile(data, filename, kk256);
                            }, new CpsContinuation())) : module._compile(data, filename);
                        };
                        ff258.CpsEnabled = true;
                        return ff258;
                    }(), kk264) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff258 = function (err, data) {
                            var l252 = arguments.length - 1;
                            var k253 = arguments[l252];
                            if (k253 instanceof CpsContinuation) {
                                if (l252 >= 2) {
                                } else if (l252 >= 1) {
                                    data = undefined;
                                } else if (l252 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk257) {
                                    return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                }, k253);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                return module._compile(data, filename, kk256);
                            }, new CpsContinuation())) : module._compile(data, filename);
                        };
                        ff258.CpsEnabled = true;
                        return ff258;
                    }());
                }, k260);
                return;
            }
            fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk263) {
                return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff258 = function (err, data) {
                        var l252 = arguments.length - 1;
                        var k253 = arguments[l252];
                        if (k253 instanceof CpsContinuation) {
                            if (l252 >= 2) {
                            } else if (l252 >= 1) {
                                data = undefined;
                            } else if (l252 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk257) {
                                return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                            }, k253);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                            return module._compile(data, filename, kk256);
                        }, new CpsContinuation())) : module._compile(data, filename);
                    };
                    ff258.CpsEnabled = true;
                    return ff258;
                }(), kk263);
            }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                var ff258 = function (err, data) {
                    var l252 = arguments.length - 1;
                    var k253 = arguments[l252];
                    if (k253 instanceof CpsContinuation) {
                        if (l252 >= 2) {
                        } else if (l252 >= 1) {
                            data = undefined;
                        } else if (l252 >= 0) {
                            err = undefined;
                        }
                        if (err)
                            throw err;
                        return new CpsFunction(function (kk257) {
                            return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                        }, k253);
                        return;
                    }
                    if (err)
                        throw err;
                    module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                        return module._compile(data, filename, kk256);
                    }, new CpsContinuation())) : module._compile(data, filename);
                };
                ff258.CpsEnabled = true;
                return ff258;
            }());
        };
        ff265.CpsEnabled = true;
        return ff265;
    }.CpsEnabled ? CpsRun(new CpsFunction(function (kk271) {
        return function CpsEnableWrapper() {
            var ff265 = function (module, filename) {
                var l259 = arguments.length - 1;
                var k260 = arguments[l259];
                if (k260 instanceof CpsContinuation) {
                    if (l259 >= 2) {
                    } else if (l259 >= 1) {
                        filename = undefined;
                    } else if (l259 >= 0) {
                        module = undefined;
                    }
                    return new CpsFunction(function (kk264) {
                        return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                            var ff258 = function (err, data) {
                                var l252 = arguments.length - 1;
                                var k253 = arguments[l252];
                                if (k253 instanceof CpsContinuation) {
                                    if (l252 >= 2) {
                                    } else if (l252 >= 1) {
                                        data = undefined;
                                    } else if (l252 >= 0) {
                                        err = undefined;
                                    }
                                    if (err)
                                        throw err;
                                    return new CpsFunction(function (kk257) {
                                        return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                    }, k253);
                                    return;
                                }
                                if (err)
                                    throw err;
                                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                    return module._compile(data, filename, kk256);
                                }, new CpsContinuation())) : module._compile(data, filename);
                            };
                            ff258.CpsEnabled = true;
                            return ff258;
                        }(), kk264) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                            var ff258 = function (err, data) {
                                var l252 = arguments.length - 1;
                                var k253 = arguments[l252];
                                if (k253 instanceof CpsContinuation) {
                                    if (l252 >= 2) {
                                    } else if (l252 >= 1) {
                                        data = undefined;
                                    } else if (l252 >= 0) {
                                        err = undefined;
                                    }
                                    if (err)
                                        throw err;
                                    return new CpsFunction(function (kk257) {
                                        return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                    }, k253);
                                    return;
                                }
                                if (err)
                                    throw err;
                                module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                    return module._compile(data, filename, kk256);
                                }, new CpsContinuation())) : module._compile(data, filename);
                            };
                            ff258.CpsEnabled = true;
                            return ff258;
                        }());
                    }, k260);
                    return;
                }
                fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk263) {
                    return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff258 = function (err, data) {
                            var l252 = arguments.length - 1;
                            var k253 = arguments[l252];
                            if (k253 instanceof CpsContinuation) {
                                if (l252 >= 2) {
                                } else if (l252 >= 1) {
                                    data = undefined;
                                } else if (l252 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk257) {
                                    return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                }, k253);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                return module._compile(data, filename, kk256);
                            }, new CpsContinuation())) : module._compile(data, filename);
                        };
                        ff258.CpsEnabled = true;
                        return ff258;
                    }(), kk263);
                }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff258 = function (err, data) {
                        var l252 = arguments.length - 1;
                        var k253 = arguments[l252];
                        if (k253 instanceof CpsContinuation) {
                            if (l252 >= 2) {
                            } else if (l252 >= 1) {
                                data = undefined;
                            } else if (l252 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk257) {
                                return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                            }, k253);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                            return module._compile(data, filename, kk256);
                        }, new CpsContinuation())) : module._compile(data, filename);
                    };
                    ff258.CpsEnabled = true;
                    return ff258;
                }());
            };
            ff265.CpsEnabled = true;
            return ff265;
        }(kk271);
    }, new CpsContinuation())) : function CpsEnableWrapper() {
        var ff265 = function (module, filename) {
            var l259 = arguments.length - 1;
            var k260 = arguments[l259];
            if (k260 instanceof CpsContinuation) {
                if (l259 >= 2) {
                } else if (l259 >= 1) {
                    filename = undefined;
                } else if (l259 >= 0) {
                    module = undefined;
                }
                return new CpsFunction(function (kk264) {
                    return fs.readFile.CpsEnabled ? fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff258 = function (err, data) {
                            var l252 = arguments.length - 1;
                            var k253 = arguments[l252];
                            if (k253 instanceof CpsContinuation) {
                                if (l252 >= 2) {
                                } else if (l252 >= 1) {
                                    data = undefined;
                                } else if (l252 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk257) {
                                    return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                }, k253);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                return module._compile(data, filename, kk256);
                            }, new CpsContinuation())) : module._compile(data, filename);
                        };
                        ff258.CpsEnabled = true;
                        return ff258;
                    }(), kk264) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                        var ff258 = function (err, data) {
                            var l252 = arguments.length - 1;
                            var k253 = arguments[l252];
                            if (k253 instanceof CpsContinuation) {
                                if (l252 >= 2) {
                                } else if (l252 >= 1) {
                                    data = undefined;
                                } else if (l252 >= 0) {
                                    err = undefined;
                                }
                                if (err)
                                    throw err;
                                return new CpsFunction(function (kk257) {
                                    return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                                }, k253);
                                return;
                            }
                            if (err)
                                throw err;
                            module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                                return module._compile(data, filename, kk256);
                            }, new CpsContinuation())) : module._compile(data, filename);
                        };
                        ff258.CpsEnabled = true;
                        return ff258;
                    }());
                }, k260);
                return;
            }
            fs.readFile.CpsEnabled ? CpsRun(new CpsFunction(function (kk263) {
                return fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                    var ff258 = function (err, data) {
                        var l252 = arguments.length - 1;
                        var k253 = arguments[l252];
                        if (k253 instanceof CpsContinuation) {
                            if (l252 >= 2) {
                            } else if (l252 >= 1) {
                                data = undefined;
                            } else if (l252 >= 0) {
                                err = undefined;
                            }
                            if (err)
                                throw err;
                            return new CpsFunction(function (kk257) {
                                return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                            }, k253);
                            return;
                        }
                        if (err)
                            throw err;
                        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                            return module._compile(data, filename, kk256);
                        }, new CpsContinuation())) : module._compile(data, filename);
                    };
                    ff258.CpsEnabled = true;
                    return ff258;
                }(), kk263);
            }, new CpsContinuation())) : fs.readFile(filename, 'utf8', function CpsEnableWrapper() {
                var ff258 = function (err, data) {
                    var l252 = arguments.length - 1;
                    var k253 = arguments[l252];
                    if (k253 instanceof CpsContinuation) {
                        if (l252 >= 2) {
                        } else if (l252 >= 1) {
                            data = undefined;
                        } else if (l252 >= 0) {
                            err = undefined;
                        }
                        if (err)
                            throw err;
                        return new CpsFunction(function (kk257) {
                            return module._compile.CpsEnabled ? module._compile(data, filename, kk257) : module._compile(data, filename);
                        }, k253);
                        return;
                    }
                    if (err)
                        throw err;
                    module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk256) {
                        return module._compile(data, filename, kk256);
                    }, new CpsContinuation())) : module._compile(data, filename);
                };
                ff258.CpsEnabled = true;
                return ff258;
            }());
        };
        ff265.CpsEnabled = true;
        return ff265;
    }();
};
exports.compile = root.compile;
exports.enable_on_require = root.enable_on_require;
exports.disable_on_require = root.disable_on_require;
if (process.env.NODE_ENV === 'test') {
    exports.parse = root.parse;
    exports.transform = root.transform;
    exports.generate = root.generate;
}