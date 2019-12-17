import { calculateProgram } from "./computer";
import { prepend, concat, filter, head } from "ramda";

export const amplifier = (program, phase, input) => {
  const output = [];
  calculateProgram(program.slice(), [phase, input], output);
  return output[0];
};

export const createAmplifierChain = (program, phases) => {
  return phases.reduce(
    (previousOutput, currentPhase) => amplifier(program, currentPhase, previousOutput),
    0
  );
};

export const generatePermutations = from => {
  if (from.length === 0) return [];
  if (from.length === 1) return [from];
  return from.reduce((acc, current) => {
    const notCurrent = el => el !== current;
    return concat(acc, generatePermutations(filter(notCurrent, from)).map(prepend(current)));
  }, []);
};
