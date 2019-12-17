import { amplifier, createAmplifierChain, generatePermutations } from "./day7";

describe("amplifier", () => {
  let program, phase, input, output;

  it("should not alter the program", () => {
    input = 1;
    program = [3, 7, 3, 8, 4, 8, 99, 0, 0];
    phase = 4;
    const result = amplifier(program, phase, input);
    expect(program).toEqual([3, 7, 3, 8, 4, 8, 99, 0, 0]);
    expect(result).toBe(1);
  });
});

it("should work for test case 1", () => {
  const program = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
  const phases = [4, 3, 2, 1, 0];
  const result = createAmplifierChain(program, phases);
  expect(result).toBe(43210);
});

describe("generatePermutations", () => {
  it("should generate every permutation for 0", () => {
    const result = generatePermutations([0]);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual([0]);
  });

  it("should generate every permutation between 0 and 1", () => {
    const result = generatePermutations([0, 1]);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([0, 1]);
    expect(result).toContainEqual([1, 0]);
  });

  it("should generate every permutation between 0 and 2", () => {
    const result = generatePermutations([0, 1, 2]);
    expect(result).toHaveLength(6);
    expect(result).toContainEqual([0, 1, 2]);
    expect(result).toContainEqual([0, 2, 1]);
    expect(result).toContainEqual([1, 0, 2]);
    expect(result).toContainEqual([1, 2, 0]);
    expect(result).toContainEqual([2, 0, 1]);
    expect(result).toContainEqual([2, 1, 0]);
  });
});
