import { curry } from "ramda";

export const createLayers = curry((width, height, input) => {
  return [[]];
});

export const getNumberOfDigits = curry((digit, layer) => 0);

export const findFewestDigitsLayer = curry((digit, layers) => []);
