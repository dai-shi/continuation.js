function fact(x) {
  if (x === 0) {
    return 1;
  } else {
    return x * fact(x - 1);
  }
}

function fact_tail(x) {
  function fact_tail0(x, r) {
    if (x === 0) {
      return r;
    } else {
      return fact_tail0(x - 1, x * r);
    }
  }
  return fact_tail0(x, 1);
}

function dummy() {
  console.log(arguments.length);
}
dummy(1, 2, 3, 4);

console.time('fact');
console.log(fact(10));
console.log(fact(100));
console.log(fact(1000));
console.log(fact(10000));
console.timeEnd('fact');

console.time('fact_tail');
console.log(fact_tail(10));
console.log(fact_tail(100));
console.log(fact_tail(1000));
console.log(fact_tail(10000));
console.log(fact_tail(100000));
console.log(fact_tail(1000000));
console.timeEnd('fact_tail');
