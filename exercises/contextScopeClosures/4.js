function myBind(func, obj) {
  return function() {
    return func.apply(obj);
  };
}