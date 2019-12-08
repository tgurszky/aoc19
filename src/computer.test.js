import { calculateProgram, getOpCode, getParamMode } from "./computer";

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

  it("should work for input [1101,100,-1,4,0]", () => {
    const program = [1101, 100, -1, 4, 0];
    const expected = [1101, 100, -1, 4, 99];

    const result = calculateProgram(program);

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

describe("getOpCode", () => {
  it("should return 1 digit opcode", () => {
    const instruction = 1;
    const result = getOpCode(instruction);
    expect(result).toBe(1);
  });

  it("should return 2 digit opcode", () => {
    const instruction = 99;
    const result = getOpCode(instruction);
    expect(result).toBe(99);
  });

  it("should return 2 digit opcode from longer instruction", () => {
    const instruction = 199;
    const result = getOpCode(instruction);
    expect(result).toBe(99);
  });
});

describe("getParamMode", () => {
  it("should return param mode when it's given", () => {
    const instruction = 199;
    const result = getParamMode(instruction, 1);
    expect(result).toBe(1);
  });

  it("should return param mode when it's given - second", () => {
    const instruction = 1099;
    const result = getParamMode(instruction, 2);
    expect(result).toBe(1);
  });

  it("should return 0 when it's missing", () => {
    const instruction = 199;
    const result = getParamMode(instruction, 3);
    expect(result).toBe(0);
  });
});

describe("jump-if-true", () => {
  it("should set the ip to second param when first param is non zero", () => {
    const program = [1105, 42, 5, 4, 1, 99];
    const output = [];
    calculateProgram(program, null, output);
    expect(output).toHaveLength(0);
  });

  it("should do nothing when first param is 0", () => {
    const program = [1105, 0, 5, 104, 1, 99];
    const output = [];
    calculateProgram(program, null, output);
    expect(output).toHaveLength(1);
    expect(output).toContain(1);
  });
});

describe("jump-if-false", () => {
  it("should set the ip to second param when first param is zero", () => {
    const program = [1106, 0, 5, 4, 1, 99];
    const output = [];
    calculateProgram(program, null, output);
    expect(output).toHaveLength(0);
  });

  it("should do nothing when first param is non zero", () => {
    const program = [1106, 42, 5, 104, 1, 99];
    const output = [];
    calculateProgram(program, null, output);
    expect(output).toHaveLength(1);
    expect(output).toContain(1);
  });
});

describe("less-than", () => {
  it("should store 1 in third param position if first param is less than 2nd", () => {
    const program = [11107, 4, 5, 0, 99];
    const result = calculateProgram(program);
    expect(result).toEqual([1, 4, 5, 0, 99]);
  });

  it("should store 0 in third param position if first param is not less than 2nd", () => {
    const program = [11107, 5, 5, 0, 99];
    const result = calculateProgram(program);
    expect(result).toEqual([0, 5, 5, 0, 99]);
  });
});

describe("equals", () => {
  it("should store 1 in third param position if first param is equal to the 2nd", () => {
    const program = [11108, 5, 5, 0, 99];
    const result = calculateProgram(program);
    expect(result).toEqual([1, 5, 5, 0, 99]);
  });

  it("should store 0 in third param position if first param is not equal to the 2nd", () => {
    const program = [11108, 6, 5, 0, 99];
    const result = calculateProgram(program);
    expect(result).toEqual([0, 6, 5, 0, 99]);
  });
});
