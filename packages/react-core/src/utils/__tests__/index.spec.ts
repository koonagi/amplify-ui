import { areEmptyArrays, areEmptyObjects, templateJoin } from '..';

const validArrays = [[], [], [], []];
const invalidArrays = [[7]];

const validObjects = [{}, {}];
const invalidObjects = [{ id: 7 }, {}, {}];

describe('areEmptyArrays', () => {
  it.each([
    [true, validArrays],
    [false, invalidArrays],
  ])('returns %s as expected', (expected, input) => {
    const output = areEmptyArrays(...input);

    expect(output).toBe(expected);
  });
});

describe('areEmptyObjects', () => {
  it.each([
    [true, validObjects],
    [false, invalidObjects],
  ])('returns %s as expected', (expected, input) => {
    const output = areEmptyObjects(...input);

    expect(output).toBe(expected);
  });
});

describe('templateJoin', () => {
  it('returns the expected value', () => {
    const output = templateJoin(['one', 'two'], (value) => `^${value}^`);
    expect(output).toBe('^one^^two^');
  });
});
