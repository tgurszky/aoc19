import {
  parseInput,
  findStation,
  isBetween,
  isOnPolarLine,
  getAbsRadialDistance,
  findVaporizedAsteroid,
  getNthVaporizedAsteroid
} from "./day10";

it("parseInput should parse inputs correctly", () => {
  const input = `.#..#
  .....
  #####
  ....#
  ...##`;
  const result = parseInput(input);
  expect(result).toHaveLength(10);
  expect(result).toContainEqual({ x: 1, y: 0 });
  expect(result).toContainEqual({ x: 3, y: 4 });
});

describe("findStation", () => {
  it("should find the solution for test case 1", () => {
    const input = `.#..#
    .....
    #####
    ....#
    ...##`;
    const asteroids = parseInput(input);
    const result = findStation(asteroids);
    expect(result).toEqual({ x: 3, y: 4, sees: 8 });
  });

  it("should find the solution for test case 2", () => {
    const input = `......#.#.
      #..#.#....
      ..#######.
      .#.#.###..
      .#..#.....
      ..#....#.#
      #..#....#.
      .##.#..###
      ##...#..#.
      .#....####`;
    const asteroids = parseInput(input);
    const result = findStation(asteroids);
    expect(result).toEqual({ x: 5, y: 8, sees: 33 });
  });

  it("should find the solution for the big test case", () => {
    const input = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##`;
    const asteroids = parseInput(input);
    const result = findStation(asteroids);
    expect(result).toEqual({ x: 11, y: 13, sees: 210 });
  });
});

describe("isBetween", () => {
  it("should return true if the third point is between the first two", () => {
    const p1 = { x: 1, y: 1 };
    const p2 = { x: 3, y: 3 };
    const p3 = { x: 2, y: 2 };
    const result = isBetween(p1, p2, p3);
    expect(result).toBe(true);
  });

  it("should return false if the third point is not between the first two", () => {
    const p1 = { x: 1, y: 1 };
    const p2 = { x: 2, y: 2 };
    const p3 = { x: 3, y: 3 };
    const result = isBetween(p1, p2, p3);
    expect(result).toBe(false);
  });

  it("should work for horizontal lines", () => {
    const p1 = { x: 1, y: 1 };
    const p2 = { x: 1, y: 3 };
    const p3 = { x: 1, y: 2 };
    const result = isBetween(p1, p2, p3);
    expect(result).toBe(true);
  });

  it("should work for vertical lines", () => {
    const p1 = { x: 1, y: 1 };
    const p2 = { x: 3, y: 1 };
    const p3 = { x: 2, y: 1 };
    const result = isBetween(p1, p2, p3);
    expect(result).toBe(true);
  });
});

describe("isOnPolarLine", () => {
  it("should work for angles below 180", () => {
    const check = { x: 2, y: 3 };
    const base = { x: 2, y: 2 };
    const result = isOnPolarLine(90, base, check);
    expect(result).toBe(true);
  });

  it("should work for angles above 180", () => {
    const check = { x: 2, y: 2 };
    const base = { x: 2, y: 3 };
    const result = isOnPolarLine(270, base, check);
    expect(result).toBe(true);
  });
});

describe("getAbsRadialDistance", () => {
  it("should return the radial distance", () => {
    const check = { x: 2, y: 3 };
    const base = { x: 2, y: 2 };
    const result = getAbsRadialDistance(base, check);
    expect(result).toBe(1);
  });

  it("should return only positive distance value", () => {
    const check = { x: 2, y: 2 };
    const base = { x: 2, y: 3 };
    const result = getAbsRadialDistance(base, check);
    expect(result).toBe(1);
  });
});

it("findVaporizedAsteroid should return the closest asteroid on the given angle", () => {
  const base = { x: 1, y: 1 };
  const cannonDeg = 45;
  const expected = { x: 2, y: 2 };
  const asteroids = [
    { x: 3, y: 3 },
    { x: 5, y: 2 },
    { x: 2, y: 2 }
  ];
  const result = findVaporizedAsteroid(base, cannonDeg, asteroids);
  expect(result).toEqual(expected);
});

it("getNthVaporizedAsteroid should vaporize asteroids in the rigth order for small test case", () => {
  const input = `.#....#####...#..
  ##...##.#####..##
  ##...#...#.#####.
  ..#.....#...###..
  ..#.#.....#....##`;
  const asteroids = parseInput(input);
  console.log("-----------------------------------");
  const result = getNthVaporizedAsteroid(9, { x: 8, y: 3 }, 270, asteroids);
  console.log("-----------------------------------");
  expect(result).toEqual({ x: 15, y: 1 });
});

describe("getNthVaporizedAsteroid", () => {
  let asteroids;
  const base = { x: 11, y: 13 };
  const cannonDeg = 270;

  beforeAll(() => {
    const input = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##`;
    asteroids = parseInput(input);
  });

  it("should return the first vaporized asteroid for the test input", () => {
    const result = getNthVaporizedAsteroid(1, base, cannonDeg, asteroids);
    expect(result).toEqual({ x: 11, y: 12 });
  });

  it("should return the third vaporized asteroid for the test input", () => {
    const result = getNthVaporizedAsteroid(3, base, cannonDeg, asteroids);
    expect(result).toEqual({ x: 12, y: 2 });
  });

  // it("should return the 200th vaporized asteroid for the test input", () => {
  //   const result = getNthVaporizedAsteroid(200, base, cannonDeg, asteroids);
  //   expect(result).toEqual({ x: 8, y: 2 });
  // });
});
