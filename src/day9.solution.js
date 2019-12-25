import { calculateProgram } from "./computer";
import { day9Program } from "../inputs/day9.input";

const output = [];
calculateProgram(day9Program.slice(), 1, output);
calculateProgram(day9Program.slice(), 2, output);

console.log(`part 1 result is ${output[0]}`);
console.log(`part 2 result is ${output[1]}`);
