import program from "./day7.program";
import { generatePermutations, createAmplifierChain as _createAmplifierChain } from "./day7";
import { curry, reduce, maxBy, map, compose, pipe, max } from "ramda";

const createAmplifierChain = curry(_createAmplifierChain);

const programmedAmplifierChain = createAmplifierChain(program);
const maxByProgrammedChainValue = maxBy(programmedAmplifierChain);

// const highestPermutationValue = reduce(
//   maxByProgrammedChainValue,
//   [],
//   generatePermutations([0, 1, 2, 3, 4])
// );

const highestValue = reduce(
  max,
  0,
  map(programmedAmplifierChain, generatePermutations([0, 1, 2, 3, 4]))
);

console.log(highestValue);
