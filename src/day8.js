import { curry, slice } from "ramda";

export const createLayers = curry((width, height, input) => {
  const result = [];
  const layerCount = input.length / (width * height);
  for (let i = 0; i < layerCount; i++) {
    const layer = [];
    for (let h = 0; h < height; h++) {
      const offset = i * width * height + h * width;
      const row = slice(offset, offset + width, input);
      layer.push(row);
    }
    result.push(layer);
  }
  return result;
});

export const getNumberOfDigits = curry((digit, layer) =>
  layer.reduce((count, row) => {
    const rowCount = row.filter(el => el === digit).length;
    return count + rowCount;
  }, 0)
);

export const findFewestDigitsLayer = curry(
  (digit, layers) =>
    layers.reduce(
      (fewestDigitsLayer, currentLayer) => {
        const currentCount = getNumberOfDigits(digit, currentLayer);
        return currentCount < fewestDigitsLayer.count
          ? { count: currentCount, value: currentLayer }
          : fewestDigitsLayer;
      },
      { count: Infinity, value: [] }
    ).value
);
