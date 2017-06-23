function add(a, b) {
  return a + b;
}

function del(a, b) {
  return a - b;
}

if (typeof module !== 'undefined' && module.exports != null) {
  exports.add = add;
  exports.del = del;
}
