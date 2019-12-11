import { createInterface } from "readline";
import { createReadStream } from "fs";
import { resolve } from "path";
import { addListEntry, getSolution, createMap, getSolutionTwo } from "./day6";

const rl = createInterface({
  input: createReadStream(resolve(__dirname, "../inputs/day6.txt"))
});

const list = [];

rl.on("line", line => {
  addListEntry(line, list);
});

rl.on("close", () => {
  const map = createMap(list);
  console.log(`part 1 result is ${getSolution(map)}`);
  console.log(`part 2 result is ${getSolutionTwo(map)}`);
});
