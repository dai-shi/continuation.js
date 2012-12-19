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
root.unshift = function (lst, itm) {
    if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk22) {
            return Array.isArray(itm, kk22);
        }, new CpsContinuation())) : Array.isArray(itm)) {
        for (var i = itm.length - 1; i >= 0; i--) {
            lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk23) {
                return lst.unshift(itm[i], kk23);
            }, new CpsContinuation())) : lst.unshift(itm[i]);
        }
    } else {
        lst.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk24) {
            return lst.unshift(itm, kk24);
        }, new CpsContinuation())) : lst.unshift(itm);
    }
};
root.ast_prog_header = function () {
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk30) {
            return root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }', kk30);
        }, new CpsContinuation())) : root.parse('if (typeof CpsFunction === \'undefined\') { CpsFunction = function(f, k) { this.f = f; this.k = k; }; } if (typeof CpsContinuation === \'undefined\') { CpsContinuation = function(k) { if (k) { this.k = k; } else { this.k = function(r) { return r; }; }}; } if (typeof CpsResult === \'undefined\') { CpsResult = function(r) { this.r = r; }; } if (typeof CpsRun === \'undefined\') { CpsRun = function(x) { var last_k; while (x instanceof CpsFunction) { last_k = x.k; x = x.f(x.k); } if (x instanceof CpsResult) { return x.r; } else { return last_k.k(x); }}; }');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk31) {
        return assert.equal(code.type, 'Program', kk31);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    return code.body;
};
root.new_variable_counter = 1;
root.generate_new_variable_name = function CpsEnableWrapper() {
    var ff40 = function (prefix, exclude_ids) {
        var l32 = arguments.length - 1;
        var k33 = arguments[l32];
        if (k33 instanceof CpsContinuation) {
            if (l32 >= 2) {
            } else if (l32 >= 1) {
                exclude_ids = undefined;
            } else if (l32 >= 0) {
                prefix = undefined;
            }
            var varname = prefix + root.new_variable_counter++;
            if (exclude_ids.indexOf(varname) >= 0) {
                return new CpsFunction(function (kk39) {
                    return root.generate_new_variable_name.CpsEnabled ? root.generate_new_variable_name(prefix, exclude_ids, kk39) : root.generate_new_variable_name(prefix, exclude_ids);
                }, k33);
            } else {
                return new CpsResult(k33.k(varname));
            }
            return;
        }
        var varname = prefix + root.new_variable_counter++;
        if ((exclude_ids.indexOf.CpsEnabled ? CpsRun(new CpsFunction(function (kk37) {
                return exclude_ids.indexOf(varname, kk37);
            }, new CpsContinuation())) : exclude_ids.indexOf(varname)) >= 0) {
            return root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk38) {
                return root.generate_new_variable_name(prefix, exclude_ids, kk38);
            }, new CpsContinuation())) : root.generate_new_variable_name(prefix, exclude_ids);
        } else {
            return varname;
        }
    };
    ff40.CpsEnabled = true;
    return ff40;
}();
root.ast_func_header = function (l_varname, t_varname, a_varname, exclude_ids) {
    var i_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk46) {
            return root.generate_new_variable_name('i', exclude_ids, kk46);
        }, new CpsContinuation())) : root.generate_new_variable_name('i', exclude_ids);
    var thisCopy = '';
    if (t_varname) {
        thisCopy = 'var ' + t_varname + ' = this;';
    }
    var argsCopy = '';
    if (a_varname) {
        argsCopy = 'var ' + a_varname + ' = {}; for(var ' + i_varname + ' = 0; ' + i_varname + ' <= ' + l_varname + '; ' + i_varname + '++) { ' + a_varname + '[' + i_varname + '] = arguments[' + i_varname + ']; }' + a_varname + '.length = 1 + ' + l_varname + ';' + a_varname + '.callee = arguments.callee;';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk47) {
            return root.parse('function ignore() { var ' + l_varname + ' = arguments.length - 1;' + thisCopy + argsCopy + '}', kk47);
        }, new CpsContinuation())) : root.parse('function ignore() { var ' + l_varname + ' = arguments.length - 1;' + thisCopy + argsCopy + '}');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk48) {
        return assert.equal(code.type, 'Program', kk48);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk49) {
        return assert.equal(code.body.length, 1, kk49);
    }, new CpsContinuation())) : assert.equal(code.body.length, 1);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk50) {
        return assert.equal(code.body[0].type, 'FunctionDeclaration', kk50);
    }, new CpsContinuation())) : assert.equal(code.body[0].type, 'FunctionDeclaration');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk51) {
        return assert.equal(code.body[0].body.type, 'BlockStatement', kk51);
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
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk57) {
                return assert.equal(params[i].type, 'Identifier', kk57);
            }, new CpsContinuation())) : assert.equal(params[i].type, 'Identifier');
            fixParams += '} else if (' + l_varname + ' >= ' + i + ') {' + params[i].name + ' = undefined;';
        }
        fixParams += '}';
    }
    var code = root.parse.CpsEnabled ? CpsRun(new CpsFunction(function (kk58) {
            return root.parse('function ignore() { var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}}', kk58);
        }, new CpsContinuation())) : root.parse('function ignore() { var ' + k_varname + ' = arguments[' + l_varname + ']; if (' + k_varname + ' instanceof CpsContinuation) { ' + argsPop + fixParams + '}}');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk59) {
        return assert.equal(code.type, 'Program', kk59);
    }, new CpsContinuation())) : assert.equal(code.type, 'Program');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk60) {
        return assert.equal(code.body.length, 1, kk60);
    }, new CpsContinuation())) : assert.equal(code.body.length, 1);
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk61) {
        return assert.equal(code.body[0].type, 'FunctionDeclaration', kk61);
    }, new CpsContinuation())) : assert.equal(code.body[0].type, 'FunctionDeclaration');
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk62) {
        return assert.equal(code.body[0].body.type, 'BlockStatement', kk62);
    }, new CpsContinuation())) : assert.equal(code.body[0].body.type, 'BlockStatement');
    return code.body[0].body.body;
};
root.collect_all_identifiers = function (node) {
    var ids = [];
    var walk = function CpsEnableWrapper() {
            var ff72 = function (node) {
                var l63 = arguments.length - 1;
                var k64 = arguments[l63];
                if (k64 instanceof CpsContinuation) {
                    if (l63 >= 1) {
                    } else if (l63 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k64.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk70) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk70) : ids.push(node.name);
                        }, k64);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk71) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk71) : _.each(node, walk);
                        }, k64);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk68) {
                        return ids.push(node.name, kk68);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk69) {
                        return _.each(node, walk, kk69);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff72.CpsEnabled = true;
            return ff72;
        }.CpsEnabled ? CpsRun(new CpsFunction(function (kk78) {
            return function CpsEnableWrapper() {
                var ff72 = function (node) {
                    var l63 = arguments.length - 1;
                    var k64 = arguments[l63];
                    if (k64 instanceof CpsContinuation) {
                        if (l63 >= 1) {
                        } else if (l63 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k64.k(null));
                        } else if (node && node.type === 'Identifier') {
                            return new CpsFunction(function (kk70) {
                                return ids.push.CpsEnabled ? ids.push(node.name, kk70) : ids.push(node.name);
                            }, k64);
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk71) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk71) : _.each(node, walk);
                            }, k64);
                        }
                        return;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return;
                    } else if (node && node.type === 'Identifier') {
                        ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk68) {
                            return ids.push(node.name, kk68);
                        }, new CpsContinuation())) : ids.push(node.name);
                    } else if (node instanceof Object) {
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk69) {
                            return _.each(node, walk, kk69);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff72.CpsEnabled = true;
                return ff72;
            }(kk78);
        }, new CpsContinuation())) : function CpsEnableWrapper() {
            var ff72 = function (node) {
                var l63 = arguments.length - 1;
                var k64 = arguments[l63];
                if (k64 instanceof CpsContinuation) {
                    if (l63 >= 1) {
                    } else if (l63 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k64.k(null));
                    } else if (node && node.type === 'Identifier') {
                        return new CpsFunction(function (kk70) {
                            return ids.push.CpsEnabled ? ids.push(node.name, kk70) : ids.push(node.name);
                        }, k64);
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk71) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk71) : _.each(node, walk);
                        }, k64);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Identifier') {
                    ids.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk68) {
                        return ids.push(node.name, kk68);
                    }, new CpsContinuation())) : ids.push(node.name);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk69) {
                        return _.each(node, walk, kk69);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff72.CpsEnabled = true;
            return ff72;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk79) {
        return walk(node, kk79);
    }, new CpsContinuation())) : walk(node);
    return ids;
};
root.replace_this_var_with = function (body, t_varname) {
    var using_this_var = false;
    var walk = function CpsEnableWrapper() {
            var ff87 = function (node) {
                var l80 = arguments.length - 1;
                var k81 = arguments[l80];
                if (k81 instanceof CpsContinuation) {
                    if (l80 >= 1) {
                    } else if (l80 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k81.k(null));
                    } else if (node && node.type === 'ThisExpression') {
                        node.type = 'Identifier';
                        node.name = t_varname;
                        using_this_var = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk86) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk86) : _.each(node, walk);
                        }, k81);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk85) {
                        return _.each(node, walk, kk85);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff87.CpsEnabled = true;
            return ff87;
        }.CpsEnabled ? CpsRun(new CpsFunction(function (kk93) {
            return function CpsEnableWrapper() {
                var ff87 = function (node) {
                    var l80 = arguments.length - 1;
                    var k81 = arguments[l80];
                    if (k81 instanceof CpsContinuation) {
                        if (l80 >= 1) {
                        } else if (l80 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k81.k(null));
                        } else if (node && node.type === 'ThisExpression') {
                            node.type = 'Identifier';
                            node.name = t_varname;
                            using_this_var = true;
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk86) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk86) : _.each(node, walk);
                            }, k81);
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
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk85) {
                            return _.each(node, walk, kk85);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff87.CpsEnabled = true;
                return ff87;
            }(kk93);
        }, new CpsContinuation())) : function CpsEnableWrapper() {
            var ff87 = function (node) {
                var l80 = arguments.length - 1;
                var k81 = arguments[l80];
                if (k81 instanceof CpsContinuation) {
                    if (l80 >= 1) {
                    } else if (l80 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k81.k(null));
                    } else if (node && node.type === 'ThisExpression') {
                        node.type = 'Identifier';
                        node.name = t_varname;
                        using_this_var = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk86) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk86) : _.each(node, walk);
                        }, k81);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk85) {
                        return _.each(node, walk, kk85);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff87.CpsEnabled = true;
            return ff87;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk94) {
        return walk(body, kk94);
    }, new CpsContinuation())) : walk(body);
    return using_this_var;
};
root.replace_arguments_with = function (body, a_varname) {
    var using_arguments = false;
    var walk = function CpsEnableWrapper() {
            var ff104 = function (node) {
                var l95 = arguments.length - 1;
                var k96 = arguments[l95];
                if (k96 instanceof CpsContinuation) {
                    if (l95 >= 1) {
                    } else if (l95 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k96.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k96.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk102) {
                            return walk.CpsEnabled ? walk(node.object, kk102) : walk(node.object);
                        }, k96);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk103) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk103) : _.each(node, walk);
                        }, k96);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk100) {
                        return walk(node.object, kk100);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk101) {
                        return _.each(node, walk, kk101);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff104.CpsEnabled = true;
            return ff104;
        }.CpsEnabled ? CpsRun(new CpsFunction(function (kk110) {
            return function CpsEnableWrapper() {
                var ff104 = function (node) {
                    var l95 = arguments.length - 1;
                    var k96 = arguments[l95];
                    if (k96 instanceof CpsContinuation) {
                        if (l95 >= 1) {
                        } else if (l95 >= 0) {
                            node = undefined;
                        }
                        if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                            return new CpsResult(k96.k(null));
                        } else if (node && node.type === 'Property') {
                            return new CpsResult(k96.k(null));
                        } else if (node && node.type === 'MemberExpression') {
                            return new CpsFunction(function (kk102) {
                                return walk.CpsEnabled ? walk(node.object, kk102) : walk(node.object);
                            }, k96);
                        } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                            node.name = a_varname;
                            using_arguments = true;
                        } else if (node instanceof Object) {
                            return new CpsFunction(function (kk103) {
                                return _.each.CpsEnabled ? _.each(node, walk, kk103) : _.each(node, walk);
                            }, k96);
                        }
                        return;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return;
                    } else if (node && node.type === 'Property') {
                        return;
                    } else if (node && node.type === 'MemberExpression') {
                        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk100) {
                            return walk(node.object, kk100);
                        }, new CpsContinuation())) : walk(node.object);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk101) {
                            return _.each(node, walk, kk101);
                        }, new CpsContinuation())) : _.each(node, walk);
                    }
                };
                ff104.CpsEnabled = true;
                return ff104;
            }(kk110);
        }, new CpsContinuation())) : function CpsEnableWrapper() {
            var ff104 = function (node) {
                var l95 = arguments.length - 1;
                var k96 = arguments[l95];
                if (k96 instanceof CpsContinuation) {
                    if (l95 >= 1) {
                    } else if (l95 >= 0) {
                        node = undefined;
                    }
                    if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                        return new CpsResult(k96.k(null));
                    } else if (node && node.type === 'Property') {
                        return new CpsResult(k96.k(null));
                    } else if (node && node.type === 'MemberExpression') {
                        return new CpsFunction(function (kk102) {
                            return walk.CpsEnabled ? walk(node.object, kk102) : walk(node.object);
                        }, k96);
                    } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                        node.name = a_varname;
                        using_arguments = true;
                    } else if (node instanceof Object) {
                        return new CpsFunction(function (kk103) {
                            return _.each.CpsEnabled ? _.each(node, walk, kk103) : _.each(node, walk);
                        }, k96);
                    }
                    return;
                }
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'Property') {
                    return;
                } else if (node && node.type === 'MemberExpression') {
                    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk100) {
                        return walk(node.object, kk100);
                    }, new CpsContinuation())) : walk(node.object);
                } else if (node && node.type === 'Identifier' && node.name === 'arguments') {
                    node.name = a_varname;
                    using_arguments = true;
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk101) {
                        return _.each(node, walk, kk101);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            ff104.CpsEnabled = true;
            return ff104;
        }();
    walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk111) {
        return walk(body, kk111);
    }, new CpsContinuation())) : walk(body);
    return using_arguments;
};
root.deep_clone = function CpsEnableWrapper() {
    var ff128 = function (node) {
        var l118 = arguments.length - 1;
        var k119 = arguments[l118];
        if (k119 instanceof CpsContinuation) {
            if (l118 >= 1) {
            } else if (l118 >= 0) {
                node = undefined;
            }
            if (node instanceof Date) {
                return new CpsResult(k119.k(node));
            } else if (node instanceof RegExp) {
                return new CpsResult(k119.k(node));
            } else if (Array.isArray(node)) {
                return new CpsFunction(function (kk126) {
                    return _.map.CpsEnabled ? _.map(node, root.deep_clone, kk126) : _.map(node, root.deep_clone);
                }, k119);
            } else if (node instanceof Object) {
                return new CpsFunction(function (kk127) {
                    return _.object.CpsEnabled ? _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
                                return root.deep_clone(x[1], kk117);
                            }, new CpsContinuation())) : root.deep_clone(x[1])
                        ];
                    }), kk127) : _.object(_.map(_.pairs(node), function (x) {
                        return [
                            x[0],
                            root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
                                return root.deep_clone(x[1], kk117);
                            }, new CpsContinuation())) : root.deep_clone(x[1])
                        ];
                    }));
                }, k119);
            } else {
                return new CpsResult(k119.k(node));
            }
            return;
        }
        if (node instanceof Date) {
            return node;
        } else if (node instanceof RegExp) {
            return node;
        } else if (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk123) {
                return Array.isArray(node, kk123);
            }, new CpsContinuation())) : Array.isArray(node)) {
            return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk124) {
                return _.map(node, root.deep_clone, kk124);
            }, new CpsContinuation())) : _.map(node, root.deep_clone);
        } else if (node instanceof Object) {
            return _.object.CpsEnabled ? CpsRun(new CpsFunction(function (kk125) {
                return _.object(_.map(_.pairs(node), function (x) {
                    return [
                        x[0],
                        root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
                            return root.deep_clone(x[1], kk117);
                        }, new CpsContinuation())) : root.deep_clone(x[1])
                    ];
                }), kk125);
            }, new CpsContinuation())) : _.object(_.map(_.pairs(node), function (x) {
                return [
                    x[0],
                    root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk117) {
                        return root.deep_clone(x[1], kk117);
                    }, new CpsContinuation())) : root.deep_clone(x[1])
                ];
            }));
        } else {
            return node;
        }
    };
    ff128.CpsEnabled = true;
    return ff128;
}();
root.transform_function_body = function (params, defaults, body, exclude_ids) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk142) {
        return assert.equal(body.type, 'BlockStatement', kk142);
    }, new CpsContinuation())) : assert.equal(body.type, 'BlockStatement');
    if (body.body.length === 0) {
        return false;
    }
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk143) {
            return root.walk_ast(body.body, kk143);
        }, new CpsContinuation())) : root.walk_ast(body.body);
    var l_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk144) {
            return root.generate_new_variable_name('l', exclude_ids, kk144);
        }, new CpsContinuation())) : root.generate_new_variable_name('l', exclude_ids);
    var k_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk145) {
            return root.generate_new_variable_name('k', exclude_ids, kk145);
        }, new CpsContinuation())) : root.generate_new_variable_name('k', exclude_ids);
    var t_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk146) {
            return root.generate_new_variable_name('t', exclude_ids, kk146);
        }, new CpsContinuation())) : root.generate_new_variable_name('t', exclude_ids);
    var a_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk147) {
            return root.generate_new_variable_name('a', exclude_ids, kk147);
        }, new CpsContinuation())) : root.generate_new_variable_name('a', exclude_ids);
    var using_this_var = root.replace_this_var_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk148) {
            return root.replace_this_var_with(body.body, t_varname, kk148);
        }, new CpsContinuation())) : root.replace_this_var_with(body.body, t_varname);
    var using_arguments = root.replace_arguments_with.CpsEnabled ? CpsRun(new CpsFunction(function (kk149) {
            return root.replace_arguments_with(body.body, a_varname, kk149);
        }, new CpsContinuation())) : root.replace_arguments_with(body.body, a_varname);
    var header = root.ast_func_header.CpsEnabled ? CpsRun(new CpsFunction(function (kk150) {
            return root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids, kk150);
        }, new CpsContinuation())) : root.ast_func_header(l_varname, using_this_var && t_varname, using_arguments && a_varname, exclude_ids);
    var newbody = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk151) {
            return root.deep_clone(body.body, kk151);
        }, new CpsContinuation())) : root.deep_clone(body.body);
    root.convert_function_call_to_new_cps_call.CpsEnabled ? CpsRun(new CpsFunction(function (kk152) {
        return root.convert_function_call_to_new_cps_call(exclude_ids, body.body, kk152);
    }, new CpsContinuation())) : root.convert_function_call_to_new_cps_call(exclude_ids, body.body);
    var success = root.convert_normal_body_to_cps_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk153) {
            return root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody, kk153);
        }, new CpsContinuation())) : root.convert_normal_body_to_cps_body(k_varname, exclude_ids, newbody);
    if (success) {
        var wrapper = root.ast_func_wrapper.CpsEnabled ? CpsRun(new CpsFunction(function (kk154) {
                return root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params, kk154);
            }, new CpsContinuation())) : root.ast_func_wrapper(k_varname, l_varname, using_arguments && a_varname, params);
        assert.ok.CpsEnabled ? CpsRun(new CpsFunction(function (kk155) {
            return assert.ok(wrapper[1].consequent.body.length >= 0, kk155);
        }, new CpsContinuation())) : assert.ok(wrapper[1].consequent.body.length >= 0);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk156) {
            return root.push(wrapper[1].consequent.body, newbody, kk156);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, newbody);
        root.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk157) {
            return root.push(wrapper[1].consequent.body, {
                type: 'ReturnStatement',
                argument: null
            }, kk157);
        }, new CpsContinuation())) : root.push(wrapper[1].consequent.body, {
            type: 'ReturnStatement',
            argument: null
        });
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk158) {
            return root.unshift(body.body, wrapper, kk158);
        }, new CpsContinuation())) : root.unshift(body.body, wrapper);
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk159) {
            return root.unshift(body.body, header, kk159);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    } else if (using_this_var || using_arguments) {
        root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk160) {
            return root.unshift(body.body, header, kk160);
        }, new CpsContinuation())) : root.unshift(body.body, header);
    }
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk161) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff136 = function (cps_func_id) {
                var l129 = arguments.length - 1;
                var k130 = arguments[l129];
                if (k130 instanceof CpsContinuation) {
                    if (l129 >= 1) {
                    } else if (l129 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk135) {
                        return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk135) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k130);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
                    return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk134);
                }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff136.CpsEnabled = true;
            return ff136;
        }(), kk161);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff136 = function (cps_func_id) {
            var l129 = arguments.length - 1;
            var k130 = arguments[l129];
            if (k130 instanceof CpsContinuation) {
                if (l129 >= 1) {
                } else if (l129 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk135) {
                    return root.unshift.CpsEnabled ? root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk135) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
                }, k130);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk134) {
                return root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id), kk134);
            }, new CpsContinuation())) : root.unshift(body.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff136.CpsEnabled = true;
        return ff136;
    }());
    return success;
};
root.convert_function_call_to_new_cps_call = function CpsEnableWrapper() {
    var ff186 = function (exclude_ids, body) {
        var l179 = arguments.length - 1;
        var k180 = arguments[l179];
        if (k180 instanceof CpsContinuation) {
            if (l179 >= 2) {
            } else if (l179 >= 1) {
                body = undefined;
            } else if (l179 >= 0) {
                exclude_ids = undefined;
            }
            var walk = function (node) {
                if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    return;
                } else if (node && node.type === 'CallExpression' && node.callee && !(node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper')) {
                    var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk173) {
                            return root.generate_new_variable_name('kk', exclude_ids, kk173);
                        }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                    var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk174) {
                            return root.deep_clone(node, kk174);
                        }, new CpsContinuation())) : root.deep_clone(node);
                    cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk175) {
                        return cpsnode.arguments.push({
                            type: 'Identifier',
                            name: kk_varname
                        }, kk175);
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
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk176) {
                        return _.each(node, function CpsEnableWrapper() {
                            var ff167 = function (value, key) {
                                var l162 = arguments.length - 1;
                                var k163 = arguments[l162];
                                if (k163 instanceof CpsContinuation) {
                                    if (l162 >= 2) {
                                    } else if (l162 >= 1) {
                                        key = undefined;
                                    } else if (l162 >= 0) {
                                        value = undefined;
                                    }
                                    delete node[key];
                                    return;
                                }
                                delete node[key];
                            };
                            ff167.CpsEnabled = true;
                            return ff167;
                        }(), kk176);
                    }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                        var ff167 = function (value, key) {
                            var l162 = arguments.length - 1;
                            var k163 = arguments[l162];
                            if (k163 instanceof CpsContinuation) {
                                if (l162 >= 2) {
                                } else if (l162 >= 1) {
                                    key = undefined;
                                } else if (l162 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff167.CpsEnabled = true;
                        return ff167;
                    }());
                    _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk177) {
                        return _.extend(node, newnode, kk177);
                    }, new CpsContinuation())) : _.extend(node, newnode);
                } else if (node instanceof Object) {
                    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk178) {
                        return _.each(node, walk, kk178);
                    }, new CpsContinuation())) : _.each(node, walk);
                }
            };
            return new CpsFunction(function (kk185) {
                return walk.CpsEnabled ? walk(body, kk185) : walk(body);
            }, k180);
            return;
        }
        var walk = function (node) {
            if (node && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                return;
            } else if (node && node.type === 'CallExpression' && node.callee && !(node.callee.type === 'Identifier' && node.callee.name === 'CpsEnableWrapper')) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk173) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk173);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var cpsnode = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk174) {
                        return root.deep_clone(node, kk174);
                    }, new CpsContinuation())) : root.deep_clone(node);
                cpsnode.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk175) {
                    return cpsnode.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk175);
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
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk176) {
                    return _.each(node, function CpsEnableWrapper() {
                        var ff167 = function (value, key) {
                            var l162 = arguments.length - 1;
                            var k163 = arguments[l162];
                            if (k163 instanceof CpsContinuation) {
                                if (l162 >= 2) {
                                } else if (l162 >= 1) {
                                    key = undefined;
                                } else if (l162 >= 0) {
                                    value = undefined;
                                }
                                delete node[key];
                                return;
                            }
                            delete node[key];
                        };
                        ff167.CpsEnabled = true;
                        return ff167;
                    }(), kk176);
                }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                    var ff167 = function (value, key) {
                        var l162 = arguments.length - 1;
                        var k163 = arguments[l162];
                        if (k163 instanceof CpsContinuation) {
                            if (l162 >= 2) {
                            } else if (l162 >= 1) {
                                key = undefined;
                            } else if (l162 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff167.CpsEnabled = true;
                    return ff167;
                }());
                _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk177) {
                    return _.extend(node, newnode, kk177);
                }, new CpsContinuation())) : _.extend(node, newnode);
            } else if (node instanceof Object) {
                _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk178) {
                    return _.each(node, walk, kk178);
                }, new CpsContinuation())) : _.each(node, walk);
            }
        };
        walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk184) {
            return walk(body, kk184);
        }, new CpsContinuation())) : walk(body);
    };
    ff186.CpsEnabled = true;
    return ff186;
}();
root.convert_normal_body_to_cps_body = function CpsEnableWrapper() {
    var ff225 = function (k_varname, exclude_ids, body) {
        var l218 = arguments.length - 1;
        var k219 = arguments[l218];
        if (k219 instanceof CpsContinuation) {
            if (l218 >= 3) {
            } else if (l218 >= 2) {
                body = undefined;
            } else if (l218 >= 1) {
                exclude_ids = undefined;
            } else if (l218 >= 0) {
                k_varname = undefined;
            }
            var create_cps_expression = function (call_expression) {
                var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk192) {
                        return root.generate_new_variable_name('kk', exclude_ids, kk192);
                    }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
                var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk193) {
                        return root.deep_clone(call_expression, kk193);
                    }, new CpsContinuation())) : root.deep_clone(call_expression);
                call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk194) {
                    return call_expression2.arguments.push({
                        type: 'Identifier',
                        name: kk_varname
                    }, kk194);
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
                        node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                            return create_cps_expression(node.argument, kk208);
                        }, new CpsContinuation())) : create_cps_expression(node.argument);
                        return true;
                    } else {
                        var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                                return walk(node.argument, kk209);
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
                    return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                        return walk(node.consequent, tail, kk210);
                    }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                        return walk(node.alternate, tail, kk211);
                    }, new CpsContinuation())) : walk(node.alternate, tail));
                } else if (tail && node && node.type === 'BlockStatement') {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                        return walk(node.body, tail, kk212);
                    }, new CpsContinuation())) : walk(node.body, tail);
                } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                        return Array.isArray(node, kk213);
                    }, new CpsContinuation())) : Array.isArray(node))) {
                    for (var i = 0; i < node.length - 1; i++) {
                        var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk214) {
                                return walk(node[i], kk214);
                            }, new CpsContinuation())) : walk(node[i]);
                        if (!result) {
                            return false;
                        }
                    }
                    var lastone = node[node.length - 1];
                    if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                        node[node.length - 1] = {
                            type: 'ReturnStatement',
                            argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk215) {
                                return create_cps_expression(lastone.expression, kk215);
                            }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                        };
                        return true;
                    } else {
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk216) {
                            return walk(lastone, tail, kk216);
                        }, new CpsContinuation())) : walk(lastone, tail);
                    }
                } else if (node instanceof Object) {
                    return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                        return _.every(node, function CpsEnableWrapper() {
                            var ff202 = function (x) {
                                var l195 = arguments.length - 1;
                                var k196 = arguments[l195];
                                if (k196 instanceof CpsContinuation) {
                                    if (l195 >= 1) {
                                    } else if (l195 >= 0) {
                                        x = undefined;
                                    }
                                    return new CpsFunction(function (kk201) {
                                        return walk.CpsEnabled ? walk(x, kk201) : walk(x);
                                    }, k196);
                                    return;
                                }
                                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk200) {
                                    return walk(x, kk200);
                                }, new CpsContinuation())) : walk(x);
                            };
                            ff202.CpsEnabled = true;
                            return ff202;
                        }(), kk217);
                    }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                        var ff202 = function (x) {
                            var l195 = arguments.length - 1;
                            var k196 = arguments[l195];
                            if (k196 instanceof CpsContinuation) {
                                if (l195 >= 1) {
                                } else if (l195 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk201) {
                                    return walk.CpsEnabled ? walk(x, kk201) : walk(x);
                                }, k196);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk200) {
                                return walk(x, kk200);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff202.CpsEnabled = true;
                        return ff202;
                    }());
                } else {
                    return true;
                }
            };
            return new CpsFunction(function (kk224) {
                return walk.CpsEnabled ? walk(body, true, kk224) : walk(body, true);
            }, k219);
            return;
        }
        var create_cps_expression = function (call_expression) {
            var kk_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk192) {
                    return root.generate_new_variable_name('kk', exclude_ids, kk192);
                }, new CpsContinuation())) : root.generate_new_variable_name('kk', exclude_ids);
            var call_expression2 = root.deep_clone.CpsEnabled ? CpsRun(new CpsFunction(function (kk193) {
                    return root.deep_clone(call_expression, kk193);
                }, new CpsContinuation())) : root.deep_clone(call_expression);
            call_expression2.arguments.push.CpsEnabled ? CpsRun(new CpsFunction(function (kk194) {
                return call_expression2.arguments.push({
                    type: 'Identifier',
                    name: kk_varname
                }, kk194);
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
                    node.argument = create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk208) {
                        return create_cps_expression(node.argument, kk208);
                    }, new CpsContinuation())) : create_cps_expression(node.argument);
                    return true;
                } else {
                    var success = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk209) {
                            return walk(node.argument, kk209);
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
                return (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk210) {
                    return walk(node.consequent, tail, kk210);
                }, new CpsContinuation())) : walk(node.consequent, tail)) && (walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk211) {
                    return walk(node.alternate, tail, kk211);
                }, new CpsContinuation())) : walk(node.alternate, tail));
            } else if (tail && node && node.type === 'BlockStatement') {
                return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk212) {
                    return walk(node.body, tail, kk212);
                }, new CpsContinuation())) : walk(node.body, tail);
            } else if (tail && (Array.isArray.CpsEnabled ? CpsRun(new CpsFunction(function (kk213) {
                    return Array.isArray(node, kk213);
                }, new CpsContinuation())) : Array.isArray(node))) {
                for (var i = 0; i < node.length - 1; i++) {
                    var result = walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk214) {
                            return walk(node[i], kk214);
                        }, new CpsContinuation())) : walk(node[i]);
                    if (!result) {
                        return false;
                    }
                }
                var lastone = node[node.length - 1];
                if (lastone && lastone.type === 'ExpressionStatement' && lastone.expression.type === 'CallExpression') {
                    node[node.length - 1] = {
                        type: 'ReturnStatement',
                        argument: create_cps_expression.CpsEnabled ? CpsRun(new CpsFunction(function (kk215) {
                            return create_cps_expression(lastone.expression, kk215);
                        }, new CpsContinuation())) : create_cps_expression(lastone.expression)
                    };
                    return true;
                } else {
                    return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk216) {
                        return walk(lastone, tail, kk216);
                    }, new CpsContinuation())) : walk(lastone, tail);
                }
            } else if (node instanceof Object) {
                return _.every.CpsEnabled ? CpsRun(new CpsFunction(function (kk217) {
                    return _.every(node, function CpsEnableWrapper() {
                        var ff202 = function (x) {
                            var l195 = arguments.length - 1;
                            var k196 = arguments[l195];
                            if (k196 instanceof CpsContinuation) {
                                if (l195 >= 1) {
                                } else if (l195 >= 0) {
                                    x = undefined;
                                }
                                return new CpsFunction(function (kk201) {
                                    return walk.CpsEnabled ? walk(x, kk201) : walk(x);
                                }, k196);
                                return;
                            }
                            return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk200) {
                                return walk(x, kk200);
                            }, new CpsContinuation())) : walk(x);
                        };
                        ff202.CpsEnabled = true;
                        return ff202;
                    }(), kk217);
                }, new CpsContinuation())) : _.every(node, function CpsEnableWrapper() {
                    var ff202 = function (x) {
                        var l195 = arguments.length - 1;
                        var k196 = arguments[l195];
                        if (k196 instanceof CpsContinuation) {
                            if (l195 >= 1) {
                            } else if (l195 >= 0) {
                                x = undefined;
                            }
                            return new CpsFunction(function (kk201) {
                                return walk.CpsEnabled ? walk(x, kk201) : walk(x);
                            }, k196);
                            return;
                        }
                        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk200) {
                            return walk(x, kk200);
                        }, new CpsContinuation())) : walk(x);
                    };
                    ff202.CpsEnabled = true;
                    return ff202;
                }());
            } else {
                return true;
            }
        };
        return walk.CpsEnabled ? CpsRun(new CpsFunction(function (kk223) {
            return walk(body, true, kk223);
        }, new CpsContinuation())) : walk(body, true);
    };
    ff225.CpsEnabled = true;
    return ff225;
}();
root.create_cpsenabled_statement = function CpsEnableWrapper() {
    var ff231 = function (cps_func_id) {
        var l226 = arguments.length - 1;
        var k227 = arguments[l226];
        if (k227 instanceof CpsContinuation) {
            if (l226 >= 1) {
            } else if (l226 >= 0) {
                cps_func_id = undefined;
            }
            return new CpsResult(k227.k({
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
    ff231.CpsEnabled = true;
    return ff231;
}();
root.walk_ast = function (node) {
    var exclude_ids;
    if (node && node.type === 'FunctionDeclaration') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk243) {
            return root.collect_all_identifiers(node.body, kk243);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk244) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk244);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk245) {
                return assert.equal(node.id.type, 'Identifier', kk245);
            }, new CpsContinuation())) : assert.equal(node.id.type, 'Identifier');
            return node.id.name;
        } else {
            return [];
        }
    } else if (node && node.type === 'FunctionExpression') {
        exclude_ids = root.collect_all_identifiers.CpsEnabled ? CpsRun(new CpsFunction(function (kk246) {
            return root.collect_all_identifiers(node.body, kk246);
        }, new CpsContinuation())) : root.collect_all_identifiers(node.body);
        if (root.transform_function_body.CpsEnabled ? CpsRun(new CpsFunction(function (kk247) {
                return root.transform_function_body(node.params, node.defaults, node.body, exclude_ids, kk247);
            }, new CpsContinuation())) : root.transform_function_body(node.params, node.defaults, node.body, exclude_ids)) {
            var ff_varname = root.generate_new_variable_name.CpsEnabled ? CpsRun(new CpsFunction(function (kk248) {
                    return root.generate_new_variable_name('ff', exclude_ids, kk248);
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
                                root.create_cpsenabled_statement.CpsEnabled ? CpsRun(new CpsFunction(function (kk249) {
                                    return root.create_cpsenabled_statement(ff_varname, kk249);
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
            _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk250) {
                return _.each(node, function CpsEnableWrapper() {
                    var ff237 = function (value, key) {
                        var l232 = arguments.length - 1;
                        var k233 = arguments[l232];
                        if (k233 instanceof CpsContinuation) {
                            if (l232 >= 2) {
                            } else if (l232 >= 1) {
                                key = undefined;
                            } else if (l232 >= 0) {
                                value = undefined;
                            }
                            delete node[key];
                            return;
                        }
                        delete node[key];
                    };
                    ff237.CpsEnabled = true;
                    return ff237;
                }(), kk250);
            }, new CpsContinuation())) : _.each(node, function CpsEnableWrapper() {
                var ff237 = function (value, key) {
                    var l232 = arguments.length - 1;
                    var k233 = arguments[l232];
                    if (k233 instanceof CpsContinuation) {
                        if (l232 >= 2) {
                        } else if (l232 >= 1) {
                            key = undefined;
                        } else if (l232 >= 0) {
                            value = undefined;
                        }
                        delete node[key];
                        return;
                    }
                    delete node[key];
                };
                ff237.CpsEnabled = true;
                return ff237;
            }());
            _.extend.CpsEnabled ? CpsRun(new CpsFunction(function (kk251) {
                return _.extend(node, newnode, kk251);
            }, new CpsContinuation())) : _.extend(node, newnode);
        }
        return [];
    } else if (node instanceof Object) {
        return _.map.CpsEnabled ? CpsRun(new CpsFunction(function (kk252) {
            return _.map(node, root.walk_ast, kk252);
        }, new CpsContinuation())) : _.map(node, root.walk_ast);
    } else {
        return [];
    }
};
root.transform = function (ast) {
    assert.equal.CpsEnabled ? CpsRun(new CpsFunction(function (kk266) {
        return assert.equal(ast.type, 'Program', kk266);
    }, new CpsContinuation())) : assert.equal(ast.type, 'Program');
    var cps_func_ids = root.walk_ast.CpsEnabled ? CpsRun(new CpsFunction(function (kk267) {
            return root.walk_ast(ast.body, kk267);
        }, new CpsContinuation())) : root.walk_ast(ast.body);
    _.each.CpsEnabled ? CpsRun(new CpsFunction(function (kk268) {
        return _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
            var ff260 = function (cps_func_id) {
                var l253 = arguments.length - 1;
                var k254 = arguments[l253];
                if (k254 instanceof CpsContinuation) {
                    if (l253 >= 1) {
                    } else if (l253 >= 0) {
                        cps_func_id = undefined;
                    }
                    return new CpsFunction(function (kk259) {
                        return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk259) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                    }, k254);
                    return;
                }
                root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk258) {
                    return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk258);
                }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
            };
            ff260.CpsEnabled = true;
            return ff260;
        }(), kk268);
    }, new CpsContinuation())) : _.each(_.flatten(cps_func_ids), function CpsEnableWrapper() {
        var ff260 = function (cps_func_id) {
            var l253 = arguments.length - 1;
            var k254 = arguments[l253];
            if (k254 instanceof CpsContinuation) {
                if (l253 >= 1) {
                } else if (l253 >= 0) {
                    cps_func_id = undefined;
                }
                return new CpsFunction(function (kk259) {
                    return root.unshift.CpsEnabled ? root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk259) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
                }, k254);
                return;
            }
            root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk258) {
                return root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id), kk258);
            }, new CpsContinuation())) : root.unshift(ast.body, root.create_cpsenabled_statement(cps_func_id));
        };
        ff260.CpsEnabled = true;
        return ff260;
    }());
    root.unshift.CpsEnabled ? CpsRun(new CpsFunction(function (kk269) {
        return root.unshift(ast.body, root.ast_prog_header(), kk269);
    }, new CpsContinuation())) : root.unshift(ast.body, root.ast_prog_header());
    return ast;
};
root.generate = function CpsEnableWrapper() {
    var ff277 = function (ast) {
        var l270 = arguments.length - 1;
        var k271 = arguments[l270];
        if (k271 instanceof CpsContinuation) {
            if (l270 >= 1) {
            } else if (l270 >= 0) {
                ast = undefined;
            }
            return new CpsFunction(function (kk276) {
                return escodegen.generate.CpsEnabled ? escodegen.generate(ast, kk276) : escodegen.generate(ast);
            }, k271);
            return;
        }
        return escodegen.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk275) {
            return escodegen.generate(ast, kk275);
        }, new CpsContinuation())) : escodegen.generate(ast);
    };
    ff277.CpsEnabled = true;
    return ff277;
}();
root.compile = function CpsEnableWrapper() {
    var ff285 = function (data) {
        var l278 = arguments.length - 1;
        var k279 = arguments[l278];
        if (k279 instanceof CpsContinuation) {
            if (l278 >= 1) {
            } else if (l278 >= 0) {
                data = undefined;
            }
            return new CpsFunction(function (kk284) {
                return root.generate.CpsEnabled ? root.generate(root.transform(root.parse(data)), kk284) : root.generate(root.transform(root.parse(data)));
            }, k279);
            return;
        }
        return root.generate.CpsEnabled ? CpsRun(new CpsFunction(function (kk283) {
            return root.generate(root.transform(root.parse(data)), kk283);
        }, new CpsContinuation())) : root.generate(root.transform(root.parse(data)));
    };
    ff285.CpsEnabled = true;
    return ff285;
}();
root.enable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk298) {
            return require('fs', kk298);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk291) {
                return fs.readFileSync(filename, 'utf8', kk291);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk292) {
            return module._compile(root.compile(data), filename, kk292);
        }, new CpsContinuation())) : module._compile(root.compile(data), filename);
    };
};
root.disable_on_require = function () {
    var fs = require.CpsEnabled ? CpsRun(new CpsFunction(function (kk311) {
            return require('fs', kk311);
        }, new CpsContinuation())) : require('fs');
    require.extensions['.js'] = function (module, filename) {
        var data = fs.readFileSync.CpsEnabled ? CpsRun(new CpsFunction(function (kk304) {
                return fs.readFileSync(filename, 'utf8', kk304);
            }, new CpsContinuation())) : fs.readFileSync(filename, 'utf8');
        module._compile.CpsEnabled ? CpsRun(new CpsFunction(function (kk305) {
            return module._compile(data, filename, kk305);
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