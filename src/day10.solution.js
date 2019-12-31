import { day10Input } from "../inputs/day10.input";
import { parseInput, findStation, getNthVaporizedAsteroid } from "./day10";

const asteroids = parseInput(day10Input);
const station = findStation(asteroids);

const vaporized200th = getNthVaporizedAsteroid(200, station, 269, asteroids);
const calculateResult = a => a.x * 100 + a.y;

console.log(
  `part 1 result is ${JSON.stringify(station)} :: part 2 result is ${calculateResult(
    vaporized200th
  )}`
);
