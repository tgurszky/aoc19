import { day10Input } from "../inputs/day10.input";
import { parseInput, findStation } from "./day10";

const asteroids = parseInput(day10Input);
const station = findStation(asteroids);

console.log(`part 1 result is ${JSON.stringify(station)}`);
