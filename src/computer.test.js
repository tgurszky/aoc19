import { calculateProgram } from "./computer";

describe("intcode computer", () => {
  it("should work for input [1,0,0,0,99]", () => {
    const input = [1, 0, 0, 0, 99];
    const expected = [2, 0, 0, 0, 99];

    const result = calculateProgram(input);

    expect(result).toEqual(expected);
  });

  it("should work for input [2,3,0,3,99]", () => {
    const input = [2, 3, 0, 3, 99];
    const expected = [2, 3, 0, 6, 99];

    const result = calculateProgram(input);

    expect(result).toEqual(expected);
  });

  it("should work for input [2,4,4,5,99,0]", () => {
    const input = [2, 4, 4, 5, 99, 0];
    const expected = [2, 4, 4, 5, 99, 9801];

    const result = calculateProgram(input);

    expect(result).toEqual(expected);
  });

  it("should work for input [1,1,1,4,99,5,6,0,99]", () => {
    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const expected = [30, 1, 1, 4, 2, 5, 6, 0, 99];

    const result = calculateProgram(input);

    expect(result).toEqual(expected);
  });

  it("should save input with opcode 3", () => {
    const program = [3, 0, 99];
    const input = 5;
    const expected = [5, 0, 99];

    const result = calculateProgram(program, input);

    expect(result).toEqual(expected);
  });

  it("should output value for opcode 4", () => {
    const program = [4, 2, 99];
    const output = [];
    const expected = 99;

    const result = calculateProgram(program, null, output);

    expect(output).toContain(expected);
  });
});
