function isEven(x) {
  if (x === 0) {
    return true;
  } else {
    return isOdd(x - 1);
  }
}

function isOdd(x) {
  if (x === 0) {
    return false;
  } else {
    return isEven(x - 1);
  }
}

exports.isEven = isEven;
exports.isOdd = isOdd;
