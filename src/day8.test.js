import {
  findFewestDigitsLayer,
  createLayers,
  getNumberOfDigits,
  getImage,
  createEmptyImage
} from "./day8";

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

it("createEmptyImage should create a given size image with transparent values", () => {
  const result = createEmptyImage(2, 2);
  expect(result).toEqual([
    [2, 2],
    [2, 2]
  ]);
});

it("getImage should calculate the final image from the layers", () => {
  const layers = [
    [
      [0, 2],
      [2, 2]
    ],
    [
      [1, 1],
      [2, 2]
    ],
    [
      [2, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [0, 0]
    ]
  ];
  const result = getImage(2, 2, layers);
  expect(result).toEqual([
    [0, 1],
    [1, 0]
  ]);
});
