function fact(x) {
  function fact_tail(x, r) {
    if (x === 0) {
      return r;
    } else {
      return fact_tail(x - 1, x * r);
    }
  }
  return fact_tail(x, 1);
}

exports.fact = fact;
