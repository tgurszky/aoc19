import { curry, slice, concat } from "ramda";

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

const Black = 0;
const White = 1;
const Transparent = 2;

export const createEmptyImage = (width, height) => {
  const image = [];
  for (let h = 0; h < height; h++) {
    image.push(createEmptyRow(width));
  }
  return image;
};

const createEmptyRow = width => Array.from({ length: width }, (_, i) => Transparent);

export const getImage = (width, height, layers) => {
  const initialImage = createEmptyImage(width, height);
  return layers.reduce((image, layer) => {
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        if (image[h][w] === Transparent) {
          image[h][w] = layer[h][w];
        }
      }
    }
    return image;
  }, initialImage);
};

export const printImage = image =>
  image.map(row => {
    let rowString = "";
    row.map(pixel => {
      if (pixel === White) rowString += "#";
      else rowString += " ";
    });
    console.log(rowString);
  });
