describe('Plugin Tests', () => {
  it('should run a simple test', () => {
    expect(true).toBe(true);
  });

  it('should handle async operations', async () => {
    const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('done'), 100));
    const result = await asyncOperation();
    expect(result).toBe('done');
  });

  it('should throw an error for invalid input', () => {
    expect(() => {
      throw new Error('Invalid input');
    }).toThrow('Invalid input');
  });
});