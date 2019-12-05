import {
  getMinDistance,
  calculateEndPoint,
  parseInstructions,
  parseLine,
  getIntersections,
  getClosestIntersection,
  isBetween,
  getIntersectionDistance,
  tryGetIntersectionPoint,
  getMinimalSignalDelay,
  getStepsToPoint
} from "./day3";

describe("day3", () => {
  it("should work for test input 1", () => {
    const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
    const wire2 = "U62,R66,U55,R34,D71,R55,D58,R83";

    const result = getMinDistance(wire1, wire2);

    expect(result).toBe(159);
  });

  it("should work for test input 2", () => {
    const wire1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
    const wire2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

    const result = getMinDistance(wire1, wire2);

    expect(result).toBe(135);
  });

  describe("calculateEndPoint", () => {
    it("should return the right point when going right", () => {
      const startingPoint = {
        x: 0,
        y: 0
      };
      const result = calculateEndPoint(startingPoint, "R8");
      expect(result).toEqual({
        x: 8,
        y: 0
      });
    });

    it("should return the right point when going up", () => {
      const startingPoint = {
        x: 10,
        y: 4
      };
      const result = calculateEndPoint(startingPoint, "U4");
      expect(result).toEqual({
        x: 10,
        y: 8
      });
    });

    it("should return the right point when going left", () => {
      const startingPoint = {
        x: 0,
        y: 0
      };
      const result = calculateEndPoint(startingPoint, "L18");
      expect(result).toEqual({
        x: -18,
        y: 0
      });
    });

    it("should return the right point when going down", () => {
      const startingPoint = {
        x: 3,
        y: 2
      };
      const result = calculateEndPoint(startingPoint, "D2");
      expect(result).toEqual({
        x: 3,
        y: 0
      });
    });
  });

  describe("parseInstructions", () => {
    it("should parse the string into an array", () => {
      const input = "U7,R6,D4,L4";
      const result = parseInstructions(input);
      expect(result).toEqual(["U7", "R6", "D4", "L4"]);
    });
  });

  describe("parseLine", () => {
    it("should parse a line correctly", () => {
      const input = "U7,R6,D4,L4";
      const result = parseLine(input);
      expect(result).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 7 },
        { x: 6, y: 7 },
        { x: 6, y: 3 },
        { x: 2, y: 3 }
      ]);
    });
  });

  describe("getIntersections", () => {
    it("should return all intersection points", () => {
      const line1 = [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: 1, y: 2 }
      ];
      const line2 = [
        { x: 0, y: 0 },
        { x: 0, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: 1 }
      ];
      const result = getIntersections(line1, line2);
      expect(result).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 2 }
      ]);
    });

    it("should return all intersection when points are mixed positive and negative", () => {
      const line1 = [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: -3, y: 2 },
        { x: -3, y: -3 }
      ];
      const line2 = [
        { x: 0, y: 0 },
        { x: 0, y: 3 },
        { x: 2, y: 3 },
        { x: 2, y: -2 },
        { x: -5, y: -2 }
      ];
      const result = getIntersections(line1, line2);
      expect(result).toContainEqual({ x: 0, y: 0 });
      expect(result).toContainEqual({ x: 0, y: 2 });
      expect(result).toContainEqual({ x: 2, y: 2 });
      expect(result).toContainEqual({ x: 2, y: 0 });
      expect(result).toContainEqual({ x: -3, y: -2 });
    });
  });

  describe("getClosestIntersection", () => {
    it("should return the closest one", () => {
      const intersections = [
        { x: 0, y: 0 },
        { x: 3, y: 2 },
        { x: 2, y: 2 }
      ];
      const result = getClosestIntersection(intersections);
      expect(result).toEqual({ x: 2, y: 2 });
    });

    it("should work for negative points", () => {
      const intersections = [
        { x: 0, y: 0 },
        { x: 13, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: -1 }
      ];
      const result = getClosestIntersection(intersections);
      expect(result).toEqual({ x: 4, y: -1 });
    });
  });

  describe("isBetween", () => {
    it("should work for positive numbers", () => {
      const target = 2;
      const p1 = 1;
      const p2 = 3;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for positive numbersin reverse order", () => {
      const target = 2;
      const p1 = 3;
      const p2 = 1;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should return false when not between", () => {
      const target = 2;
      const p1 = 3;
      const p2 = 7;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(false);
    });

    it("should return false when not between in reverse order", () => {
      const target = 2;
      const p1 = 7;
      const p2 = 3;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(false);
    });

    it("should work for negative numbers", () => {
      const target = -2;
      const p1 = -1;
      const p2 = -3;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for negative numbers in reverse order", () => {
      const target = -2;
      const p1 = -3;
      const p2 = -1;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for mixed numbers", () => {
      const target = 2;
      const p1 = 6;
      const p2 = -3;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for mixed numbersin reverse order", () => {
      const target = 2;
      const p1 = -3;
      const p2 = 6;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work inclusively", () => {
      const target = 2;
      const p1 = 2;
      const p2 = 6;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for negative target", () => {
      const target = -3;
      const p1 = 2;
      const p2 = -5;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });

    it("should work for negative target 2", () => {
      const target = -2;
      const p1 = 2;
      const p2 = -3;
      const result = isBetween(target, p1, p2);
      expect(result).toBe(true);
    });
  });

  describe("getIntersectionDistance", () => {
    it("should return the manhattan sum when the input is positive", () => {
      const input = { x: 2, y: 4 };
      const result = getIntersectionDistance(input);
      expect(result).toBe(6);
    });

    it("should return the manhattan sum when the input is negative", () => {
      const input = { x: -2, y: -4 };
      const result = getIntersectionDistance(input);
      expect(result).toBe(6);
    });

    it("should return the manhattan sum when the input is mixed", () => {
      const input = { x: -2, y: 4 };
      const result = getIntersectionDistance(input);
      expect(result).toBe(6);
    });
  });

  describe("tryGetIntersectionPoint", () => {
    it("should return true when there is an intersection point in all positive setup", () => {
      const p1 = { x: 1, y: 3 };
      const p2 = { x: 3, y: 3 };
      const p3 = { x: 2, y: 2 };
      const p4 = { x: 2, y: 4 };
      let resultPoint = { x: 0, y: 0 };
      const result = tryGetIntersectionPoint(p1, p2, p3, p4, resultPoint);
      expect(result).toBe(true);
    });

    it("should set the result when there is an intersection point in all positive setup", () => {
      const p1 = { x: 1, y: 3 };
      const p2 = { x: 3, y: 3 };
      const p3 = { x: 2, y: 2 };
      const p4 = { x: 2, y: 4 };
      let resultPoint = { x: 0, y: 0 };
      const result = tryGetIntersectionPoint(p1, p2, p3, p4, resultPoint);
      expect(resultPoint).toEqual({ x: 2, y: 3 });
    });

    it("should return true when there is an intersection point", () => {
      const p1 = { x: 2, y: -2 };
      const p2 = { x: -5, y: -2 };
      const p3 = { x: -3, y: 2 };
      const p4 = { x: -3, y: -3 };
      let resultPoint = { x: 0, y: 0 };
      const result = tryGetIntersectionPoint(p1, p2, p3, p4, resultPoint);
      expect(result).toBe(true);
    });

    it("should set the result point when there is an intersection point", () => {
      const p1 = { x: 2, y: -2 };
      const p2 = { x: -5, y: -2 };
      const p3 = { x: -3, y: 2 };
      const p4 = { x: -3, y: -3 };
      let resultPoint = { x: 0, y: 0 };
      const result = tryGetIntersectionPoint(p1, p2, p3, p4, resultPoint);
      expect(resultPoint).toEqual({ x: -3, y: -2 });
    });
  });

  describe("getMinimalSignalDelay", () => {
    it("should work for test input 1", () => {
      const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
      const wire2 = "U62,R66,U55,R34,D71,R55,D58,R83";

      const result = getMinimalSignalDelay(wire1, wire2);

      expect(result).toBe(610);
    });

    it("should work for test input 2", () => {
      const wire1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
      const wire2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

      const result = getMinimalSignalDelay(wire1, wire2);

      expect(result).toBe(410);
    });
  });

  describe("getStepsToPoint", () => {
    it("should work", () => {
      const line = [
        { x: 0, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 2 },
        { x: -3, y: 2 },
        { x: -3, y: -3 }
      ];
      const point = { x: 0, y: 2 };
      const result = getStepsToPoint(line, point);
      expect(result).toBe(8);
    });
  });
});
