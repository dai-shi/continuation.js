function fact_rec(x) {
  if (x === 0) {
    return 1;
  } else {
    return x * fact_rec(x - 1);
  }
}

function fact_tail(x) {
  var fact_tail_sub = function(x, r) {
    if (x === 0) {
      return r;
    } else {
      return fact_tail_sub(x - 1, x * r);
    }
  };
  return fact_tail_sub(x, 1);
}

function dummy() {
  console.log(arguments.length);
}
dummy(1, 2, 3, 4);

console.time('fact_rec');
console.log(fact_rec(10));
console.log(fact_rec(100));
console.log(fact_rec(1000));
console.log(fact_rec(10000));
console.timeEnd('fact_rec');

console.time('fact_tail');
console.log(fact_tail(10));
console.log(fact_tail(100));
console.log(fact_tail(1000));
console.log(fact_tail(10000));
console.log(fact_tail(100000));
console.log(fact_tail(1000000));
console.timeEnd('fact_tail');
