const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("../inputs/day1.txt")
});

let part1Result = 0,
  part2Result = 0;

rl.on("line", line => {
  const moduleMass = parseInt(line);
  const fuelRequirementForModule = Math.floor(moduleMass / 3) - 2;
  part1Result += fuelRequirementForModule;
  part2Result += fuelRequirementForModule + calculateFuel(fuelRequirementForModule);
});

rl.on("close", () => {
  console.log(`part 1 result is ${part1Result}`);
  console.log(`part 2 result is ${part2Result}`);
});

const calculateFuel = mass => {
  const fuelRequirement = Math.floor(mass / 3) - 2;
  if (fuelRequirement <= 0) {
    return 0;
  }
  return fuelRequirement + calculateFuel(fuelRequirement);
};
