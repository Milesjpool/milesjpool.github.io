// Helper function to get the real, mathematical modulus of a number
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
