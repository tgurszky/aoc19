import { calculateProgram } from "./computer";
import { day5Input } from "./day5.input";

const output = [];
calculateProgram(day5Input, 1, output);
console.log(`output of day5 TEST run part 1: ${JSON.stringify(output)}`);
