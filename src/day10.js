import { split, trim, curry, any, min, max, filter, reduce, minBy } from "ramda";

export const parseInput = input => {
  const lines = split("\n", input);
  const result = [];
  for (let y = 0; y < lines.length; y++) {
    const line = trim(lines[y]);
    for (let x = 0; x < line.length; x++) {
      const element = line.charAt(x);
      if (element === "#") {
        result.push({ x, y });
      }
    }
  }
  return result;
};

export const findStation = asteroids =>
  asteroids.reduce(
    (station, currentAsteroid) => {
      const otherAsteroids = asteroids.filter(a => a !== currentAsteroid);
      let currentAsteroidSees = 0;
      for (let i = 0; i < otherAsteroids.length; i++) {
        const visibilityCheckAsteroid = otherAsteroids[i];
        const possibleBlockers = otherAsteroids.filter(a => a !== visibilityCheckAsteroid);
        const isBetweenCurrentAndCheck = isBetween(currentAsteroid, visibilityCheckAsteroid);
        const anyRemainingIsBlocking = any(isBetweenCurrentAndCheck, possibleBlockers);
        if (!anyRemainingIsBlocking) {
          currentAsteroidSees++;
        }
      }
      if (currentAsteroidSees > station.sees) {
        station = {
          x: currentAsteroid.x,
          y: currentAsteroid.y,
          sees: currentAsteroidSees
        };
      }
      return station;
    },
    { x: 0, y: 0, sees: 0 }
  );

export const isBetween = curry((a1, a2, checking) => {
  const isXBetween = checking.x > min(a1.x, a2.x) && checking.x < max(a1.x, a2.x);
  const isYBetween = checking.y > min(a1.y, a2.y) && checking.y < max(a1.y, a2.y);
  if (a1.x === a2.x) {
    // horizontal
    return checking.x === a1.x && isYBetween;
  } else {
    const m = (a2.y - a1.y) / (a2.x - a1.x);
    const isOnLine = checking.y - a1.y === m * (checking.x - a1.x);
    if (m === 0) {
      // vertical
      return isOnLine && isXBetween;
    }
    return isOnLine && isXBetween && isYBetween;
  }
});

export const isOnPolarLine = curry((thetaDeg, base, check) => {
  const deltaCheck = {
    x: check.x - base.x,
    y: check.y - base.y
  };
  const checkRad = Math.atan2(deltaCheck.y, deltaCheck.x);
  const checkDeg = (checkRad * 180) / Math.PI;
  const assertDeg = checkDeg < 0 ? thetaDeg - 360 : thetaDeg;
  return assertDeg === checkDeg;
});

export const getAbsRadialDistance = curry((base, check) => {
  const deltaCheck = {
    x: check.x - base.x,
    y: check.y - base.y
  };
  const powerToSecond = num => Math.pow(num, 2);
  const distance = Math.sqrt(powerToSecond(deltaCheck.x) + powerToSecond(deltaCheck.y));
  return Math.abs(distance);
});

export const getNthVaporizedAsteroid = (limit, base, cannonDeg, asteroids) => {
  let filteredAsteroids = filter(a => a.x !== base.x || a.y !== base.y, asteroids);
  let currentCannonDeg = cannonDeg;
  let vaporizedCounter = 0;
  while (filteredAsteroids.length > 0) {
    const vaporizedAsteroid = findVaporizedAsteroid(base, currentCannonDeg, filteredAsteroids);
    if (vaporizedAsteroid.x !== Infinity) {
      vaporizedCounter++;
      console.log(`count: ${vaporizedCounter} - ${JSON.stringify(vaporizedAsteroid)}`);
      if (limit === vaporizedCounter) {
        return vaporizedAsteroid;
      }
      filteredAsteroids = filter(a => a !== vaporizedAsteroid, filteredAsteroids);
    }
    currentCannonDeg = currentCannonDeg === 359 ? 0 : currentCannonDeg + 1;
  }
};

export const findVaporizedAsteroid = (base, cannonDeg, asteroids) => {
  const isOnAngle = isOnPolarLine(cannonDeg, base);
  const asteroidsOnAngle = filter(isOnAngle, asteroids);
  const getDistanceFromBase = getAbsRadialDistance(base);
  return reduce(minBy(getDistanceFromBase), { x: Infinity, y: Infinity }, asteroidsOnAngle);
};
