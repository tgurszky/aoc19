import { createInterface } from "readline";
import { createReadStream } from "fs";
import { resolve } from "path";
import { addMapEntry, applyToNodes, getDepth } from "./day6";

const rl = createInterface({
  input: createReadStream(resolve(__dirname, "../inputs/day6.txt"))
});

const map = {};

rl.on("line", line => {
  addMapEntry(map, line);
});

rl.on("close", () => {
  let depthCount = 0;
  applyToNodes(map, node => {
    console.log(node.name);
    depthCount += getDepth(map, node.name);
  });
  console.log(`part 1 result is ${depthCount}`);
});
