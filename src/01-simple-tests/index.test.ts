import { simpleCalculator, Action } from './index';

const input = { a: 2, b: 5 };

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Subtract })).toBe(-3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Multiply })).toBe(10);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Divide })).toBe(0.4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ ...input, action: Action.Exponentiate })).toBe(
      32,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ ...input, action: '√' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ ...input, b: '0', action: Action.Add }),
    ).toBeNull();
  });
});
