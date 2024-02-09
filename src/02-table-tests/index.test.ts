import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },

  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },

  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },

  { a: 1, b: 2, action: '~', expected: null },
  { a: 2, b: 2, action: NaN, expected: null },
  { a: 3, b: 2, action: true, expected: null },

  { a: false, b: 2, action: Action.Subtract, expected: null },
  { a: 2, b: '2', action: Action.Multiply, expected: null },
  { a: 3, b: undefined, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should return $expected',
    ({ expected, ...input }) => {
      expected === null
        ? expect(simpleCalculator(input)).toBeNull()
        : expect(simpleCalculator(input)).toBe(expected);
    },
  );
});
