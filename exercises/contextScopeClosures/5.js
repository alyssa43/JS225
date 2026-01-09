function myBind(func, obj, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);
    return func.apply(obj, fullArgs);
  };
}