import { day8Input } from "../inputs/day8.input";
import { findFewestDigitsLayer, createLayers, getNumberOfDigits } from "./day8";

const input = day8Input.split("").map(parseInt);
const layers = createLayers(25, 6, input);
const fewestZeroLayer = findFewestDigitsLayer(0, layers);
const numOne = getNumberOfDigits(1, fewestZeroLayer);
const numTwo = getNumberOfDigits(2, fewestZeroLayer);

const result = numOne * numTwo;
console.log(`the result of part 1 is ${result}`);
