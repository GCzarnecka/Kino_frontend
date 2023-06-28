// Assume you have a function called 'add' that adds two numbers
function add(a: number, b: number): number {
  return a + b;
}

// Karma test suite
describe('add function', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it('should handle negative numbers', () => {
    const result = add(-2, 3);
    expect(result).toBe(1);
  });

  // it('should return NaN for invalid inputs', () => {
  //   const result = add('a', 3); // TypeScript will show a compilation error
  //   expect(result).toBeNaN();
  // });
});
