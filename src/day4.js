export const countPossiblePasswordsInRange = (start, end, criterias) => {
  let count = 0;
  for (let candidate = start; candidate <= end; candidate++) {
    if (passesAllCriterias(candidate, criterias)) {
      count++;
    }
  }
  return count;
};

export const passesAllCriterias = (candidate, criterias) => {
  return criterias.reduce((passesUntilNow, criteria) => {
    return passesUntilNow && criteria(candidate);
  }, true);
};

export const hasSixDigits = number => {
  return number > 99999 && number <= 999999;
};

export const hasTwoAdjacentDoubleDigits = number => {
  const numberText = number.toString();
  for (let i = 1; i < numberText.length; i++) {
    const previousDigit = numberText.charAt(i - 1);
    const currentDigit = numberText.charAt(i);
    if (previousDigit === currentDigit) {
      return true;
    }
  }
  return false;
};

export const hasOnlyTwoAdjacentDoubleDigits = number => {
  const numberText = number.toString();
  let digitCounter = 1;
  for (let i = 1; i < numberText.length; i++) {
    const previousDigit = numberText.charAt(i - 1);
    const currentDigit = numberText.charAt(i);
    if (previousDigit === currentDigit) {
      digitCounter++;
      if (i === numberText.length - 1 && digitCounter === 2) {
        return true;
      }
    } else {
      if (digitCounter === 2) {
        return true;
      }
      digitCounter = 1;
    }
  }
  return false;
};

export const digitsDontDecrease = number => {
  const numberText = number.toString();
  for (let i = 1; i < numberText.length; i++) {
    const previousDigit = parseInt(numberText.charAt(i - 1));
    const currentDigit = parseInt(numberText.charAt(i));
    if (currentDigit < previousDigit) {
      return false;
    }
  }
  return true;
};

const start = 124075;
const end = 580769;
const criteriasPartOne = [hasSixDigits, hasTwoAdjacentDoubleDigits, digitsDontDecrease];
console.log(
  `day 4 part 1 result is ${countPossiblePasswordsInRange(start, end, criteriasPartOne)}`
);

const criteriasPartTwo = [hasSixDigits, hasOnlyTwoAdjacentDoubleDigits, digitsDontDecrease];
console.log(
  `day 4 part 2 result is ${countPossiblePasswordsInRange(start, end, criteriasPartTwo)}`
);
