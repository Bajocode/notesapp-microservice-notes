describe('add', () => {
  test('returns a correct result', () => {
    expect(add(4, 8)).toBe(12);
  });
});

function add(a: number, b: number): number {
  return a + b;
}
