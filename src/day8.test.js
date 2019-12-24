import { findFewestDigitsLayer, createLayers, getNumberOfDigits } from "./day8";

it("getNumberOfDigits should return the number of given digits in a layer", () => {
  const layer = [
    [1, 2, 3],
    [4, 3, 6]
  ];
  const result = getNumberOfDigits(3, layer);
  expect(result).toBe(2);
});

it("findFewestDigitsLayer should return the layer with the lowest number of given digits", () => {
  const layers = [
    [
      [1, 2, 3],
      [4, 3, 6]
    ],
    [
      [1, 2, 2],
      [4, 3, 6]
    ]
  ];
  const result = findFewestDigitsLayer(3, layers);
  expect(result).toEqual([
    [1, 2, 2],
    [4, 3, 6]
  ]);
});

it("createLayers should create the layers from the input array", () => {
  const input = [1, 2, 2, 4, 3, 6];
  const result = createLayers(3, 2, input);
  expect(result).toEqual([
    [
      [1, 2, 2],
      [4, 3, 6]
    ]
  ]);
});

it("createLayers should create multiple layers when the input is large", () => {
  const input = [1, 2, 3, 4, 3, 6, 1, 2, 2, 4, 3, 6];
  const result = createLayers(3, 2, input);
  expect(result).toEqual([
    [
      [1, 2, 3],
      [4, 3, 6]
    ],
    [
      [1, 2, 2],
      [4, 3, 6]
    ]
  ]);
});
