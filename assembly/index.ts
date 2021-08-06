// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function factorial(value: f64): f64 {
  if (value === 0 || value === 1) return 1;
  return value * factorial(value - 1);
}
