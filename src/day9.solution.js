import { calculateProgram } from "./computer";
import { day9Program } from "../inputs/day9.input";

const output = [];
calculateProgram(day9Program, 1, output);

console.log(`part 1 result is ${JSON.stringify(output)}`);
