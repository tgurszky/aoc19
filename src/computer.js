import { concat, unfold } from "ramda";

const stepCounts = new Map();

const OpCodeAdd = 1;
stepCounts.set(OpCodeAdd, 4);

const OpCodeMultiply = 2;
stepCounts.set(OpCodeMultiply, 4);

const OpCodeExit = 99;

const OpCodeSaveInput = 3;
stepCounts.set(OpCodeSaveInput, 2);

const OpCodeOutputValue = 4;
stepCounts.set(OpCodeOutputValue, 2);

const OpCodeJumpIfTrue = 5;
stepCounts.set(OpCodeJumpIfTrue, 3);

const OpCodeJumpIfFalse = 6;
stepCounts.set(OpCodeJumpIfFalse, 3);

const OpCodeLessThan = 7;
stepCounts.set(OpCodeLessThan, 4);

const OpCodeEquals = 8;
stepCounts.set(OpCodeEquals, 4);

const OpCodeSetRelativeBase = 9;
stepCounts.set(OpCodeSetRelativeBase, 2);

const ParamModePosition = 0;
const ParamModeImmediate = 1;
const ParamModeRelative = 2;

export const calculateProgram = (program, input, output) => {
  let ip = 0;
  let relativeBase = 0;
  let running = true;
  let operandA, operandB, resultIndex;

  while (running) {
    let skipStep = false;
    const instruction = program[ip];
    switch (getOpCode(instruction)) {
      case OpCodeAdd:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        resultIndex = getResultIndex(program, ip, instruction, 3, relativeBase);
        program = verifyProgramLength(program, resultIndex);
        program[resultIndex] = operandA + operandB;
        break;
      case OpCodeMultiply:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        resultIndex = getResultIndex(program, ip, instruction, 3, relativeBase);
        program = verifyProgramLength(program, resultIndex);
        program[resultIndex] = operandA * operandB;
        break;
      case OpCodeSaveInput:
        resultIndex = getResultIndex(program, ip, instruction, 1, relativeBase);
        program = verifyProgramLength(program, resultIndex);
        program[resultIndex] = Array.isArray(input) ? input.shift() : input;
        break;
      case OpCodeOutputValue:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        output.push(operandA);
        break;
      case OpCodeJumpIfTrue:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        if (operandA !== 0) {
          ip = operandB;
          skipStep = true;
        }
        break;
      case OpCodeJumpIfFalse:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        if (operandA === 0) {
          ip = operandB;
          skipStep = true;
        }
        break;
      case OpCodeLessThan:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        resultIndex = getResultIndex(program, ip, instruction, 3, relativeBase);
        program = verifyProgramLength(program, resultIndex);
        program[resultIndex] = operandA < operandB ? 1 : 0;
        break;
      case OpCodeEquals:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        operandB = getOperand(program, ip, instruction, 2, relativeBase);
        resultIndex = getResultIndex(program, ip, instruction, 3, relativeBase);
        program = verifyProgramLength(program, resultIndex);
        program[resultIndex] = operandA === operandB ? 1 : 0;
        break;
      case OpCodeSetRelativeBase:
        operandA = getOperand(program, ip, instruction, 1, relativeBase);
        relativeBase += operandA;
        break;
      case OpCodeExit:
        running = false;
        break;
      default:
        throw new Error(`Opcode '${instruction}' is not valid`);
    }
    if (!skipStep) {
      ip += stepCounts.get(getOpCode(instruction));
    }
  }
  return program;
};

export const getOpCode = instruction => {
  if (instruction < 100) {
    return instruction;
  }
  const stringValue = instruction.toString();
  const l = stringValue.length;
  return parseInt(stringValue[l - 2] + stringValue[l - 1]);
};

export const getParamMode = (instruction, index, defImmediate) => {
  const stringValue = instruction.toString();
  const l = stringValue.length;
  const offsetIndex = index + 2;
  if (offsetIndex > l) {
    return ParamModePosition;
  }
  return parseInt(stringValue[l - offsetIndex]);
};

const getOperand = (program, ip, instruction, index, relativeBase) => {
  switch (getParamMode(instruction, index)) {
    case ParamModePosition:
      const operandAIndex = program[ip + index];
      return program[operandAIndex];
    case ParamModeImmediate:
      return program[ip + index];
    case ParamModeRelative:
      const relativeOffset = program[ip + index];
      return program[relativeBase + relativeOffset];
  }
};

const getResultIndex = (program, ip, instruction, index, relativeBase) => {
  switch (getParamMode(instruction, index)) {
    case ParamModePosition:
    case ParamModeImmediate:
      return program[ip + index];
    case ParamModeRelative:
      const relativeOffset = program[ip + index];
      return relativeBase + relativeOffset;
  }
};

const verifyProgramLength = (program, resultIndex) => {
  if (resultIndex > program.length - 1) {
    return extendProgram(program, resultIndex - program.length + 1);
  }
  return program;
};

const extendProgram = (program, missingLength) => {
  const seedFn = n => (n === missingLength ? false : [0, n + 1]);
  const zeroPaddedExtraArray = unfold(seedFn, 0);
  return concat(program, zeroPaddedExtraArray);
};
