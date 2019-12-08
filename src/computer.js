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

export const calculateProgram = (program, input, output) => {
  let ip = 0;
  let running = true;
  let operandAIndex, operandBIndex, resultIndex;

  while (running) {
    const opCode = program[ip];
    switch (opCode) {
      case OpCodeAdd:
        operandAIndex = program[ip + 1];
        operandBIndex = program[ip + 2];
        resultIndex = program[ip + 3];
        program[resultIndex] = program[operandAIndex] + program[operandBIndex];
        break;
      case OpCodeMultiply:
        operandAIndex = program[ip + 1];
        operandBIndex = program[ip + 2];
        resultIndex = program[ip + 3];
        program[resultIndex] = program[operandAIndex] * program[operandBIndex];
        break;
      case OpCodeSaveInput:
        resultIndex = program[ip + 1];
        program[resultIndex] = input;
        break;
      case OpCodeOutputValue:
        resultIndex = program[ip + 1];
        output.push(program[resultIndex]);
        break;
      case OpCodeExit:
        running = false;
        break;
      default:
        throw new Error(`Opcode '${opCode}' is not valid`);
    }
    ip += stepCounts.get(opCode);
  }
  return program;
};
