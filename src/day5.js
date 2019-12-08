import { calculateProgram } from "./computer";
import { day5Input } from "./day5.input";

let output = [];
calculateProgram(day5Input.slice(0), 1, output);
console.log(`output of day5 part 1: ${JSON.stringify(output)}`);

output = [];
calculateProgram(day5Input.slice(0), 5, output);
console.log(`output of day5 part 2: ${JSON.stringify(output)}`);
