function f(n) {
  if (n <= 0) {
    return "foo";
  }
  return f(n - 1);
}
console.log(f(1e6) === "foo");
