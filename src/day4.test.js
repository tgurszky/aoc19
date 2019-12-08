import {
  hasSixDigits,
  passesAllCriterias,
  hasTwoAdjacentDoubleDigits,
  digitsDontDecrease,
  hasOnlyTwoAdjacentDoubleDigits
} from "./day4";

describe("hasSixDigits", () => {
  it("should return true for a six digit number", () => {
    const number = 123456;
    const result = hasSixDigits(number);
    expect(result).toBe(true);
  });
  it("should return false for a five digit number", () => {
    const number = 12345;
    const result = hasSixDigits(number);
    expect(result).toBe(false);
  });
  it("should return false for a seven digit number", () => {
    const number = 1234567;
    const result = hasSixDigits(number);
    expect(result).toBe(false);
  });
  it("should return false for a negative number", () => {
    const number = -123456;
    const result = hasSixDigits(number);
    expect(result).toBe(false);
  });
});

describe("passesAllCriterias", () => {
  it("should return true for empty criterias array", () => {
    const candidate = 1;
    const criterias = [];
    const result = passesAllCriterias(candidate, criterias);
    expect(result).toBe(true);
  });

  it("should return true when candidate passes criterias", () => {
    const candidate = 123456;
    const criterias = [hasSixDigits];
    const result = passesAllCriterias(candidate, criterias);
    expect(result).toBe(true);
  });

  it("should return false when candidate does not pass all criterias", () => {
    const candidate = 1234567;
    const criterias = [hasSixDigits];
    const result = passesAllCriterias(candidate, criterias);
    expect(result).toBe(false);
  });
});

describe("hasTwoAdjacentDoubleDigits", () => {
  it("should return true when input has two adjacent double digits", () => {
    const input = 122345;
    const result = hasTwoAdjacentDoubleDigits(input);
    expect(result).toBe(true);
  });
  it("should return false when input doesn't have two adjacent double digits", () => {
    const input = 12345;
    const result = hasTwoAdjacentDoubleDigits(input);
    expect(result).toBe(false);
  });
});

describe("digitsDontDecrease", () => {
  it("should return true when digits don't decrease", () => {
    const input = 122345;
    const result = digitsDontDecrease(input);
    expect(result).toBe(true);
  });

  it("should return false when digits decrease", () => {
    const input = 123451;
    const result = digitsDontDecrease(input);
    expect(result).toBe(false);
  });
});

describe("hasOnlyTwoAdjacentDoubleDigits", () => {
  it("should return false when double digits have adjacent same values", () => {
    const input = 1222345;
    const result = hasOnlyTwoAdjacentDoubleDigits(input);
    expect(result).toBe(false);
  });

  it("should return true when double digits don't have adjacent same value", () => {
    const input = 122345;
    const result = hasOnlyTwoAdjacentDoubleDigits(input);
    expect(result).toBe(true);
  });

  it("should return true when double digits don't have adjacent same value but number has multiple same digits else", () => {
    const input = 12234445;
    const result = hasOnlyTwoAdjacentDoubleDigits(input);
    expect(result).toBe(true);
  });

  it("should work for 112233", () => {
    const result = hasOnlyTwoAdjacentDoubleDigits(112233);
    expect(result).toBe(true);
  });

  it("should work for 123444", () => {
    const result = hasOnlyTwoAdjacentDoubleDigits(123444);
    expect(result).toBe(false);
  });

  it("should work for 111122", () => {
    const result = hasOnlyTwoAdjacentDoubleDigits(111122);
    expect(result).toBe(true);
  });
});
